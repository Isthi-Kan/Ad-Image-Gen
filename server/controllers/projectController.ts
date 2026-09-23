import { Request, Response } from 'express';
import * as Sentry from "@sentry/node";
import { prisma } from '../configs/prisma';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import ai from '../configs/ai.js';
import axios from 'axios';

// Helper to convert local file to base64 for Gemini
const loadImage = (path: string, mimeType: string) => {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString('base64'),
            mimeType
        }
    }
}



// Create a new project (using Gemini 1.5 Flash + Hugging Face FLUX.1-schnell for free image generation)
export const createProject = async (req: Request, res: Response) => {
    let tempProjectId: string;
    const { userId } = req.auth();
    let isCreditDeducted = false;

    const { name = 'New Project', aspectRatio, userPrompt, productName, productDescription, targetLength = 5 } = req.body;

    const images: any = req.files;

    if (images.length < 2 || !productName) {
        return res.status(400).json({ message: "Please upload at least 2 images" });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user || user.credits < 5) {
        return res.status(400).json({ message: "Insufficient credits" });
    } else {
        // deduct credits for image generation
        await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 5 } }
        }).then(() => { isCreditDeducted = true; });
    }

    try {
        // 1. Upload original images to Cloudinary
        let uploadedImages = await Promise.all(
            images.map(async (item: any) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        const project = await prisma.project.create({
            data: {
                name,
                userId,
                productName,
                productDescription,
                userPrompt,
                aspectRatio,
                targetLength: parseInt(targetLength),
                uploadedImages,
                isGenerating: true
            }
        });

        tempProjectId = project.id;

        // 2. Load images for Gemini multimodal analysis
        const img1base64 = loadImage(images[0].path, images[0].mimetype);
        const img2base64 = loadImage(images[1].path, images[1].mimetype);

        // 3. Call free Gemini 1.5 Flash to analyze the images and construct a highly detailed combined prompt
        const analysisPrompt = {
            text: `You are an expert advertising prompt engineer.
Analyze the two uploaded images:
1. Product Image: A picture of ${productName} (${productDescription || 'no description provided'}).
2. Person/Model Image: A picture of a person/model.

Your task is to write a highly detailed, single-paragraph text-to-image prompt (for FLUX/Stable Diffusion) to generate a realistic commercial advertisement photoshoot image.
The prompt must describe:
- The exact person from the Person Image (their facial features, hair style, clothing, gender, expression) naturally holding, wearing, or using the product from the Product Image.
- The product itself, preserving its appearance, shape, branding, and details.
- A natural physical interaction between the person and the product.
- A fitting professional background (e.g., minimalist studio, lifestyle setting).
- High-end commercial studio lighting, natural shadows, depth of field, and high-fidelity textures.

Output ONLY the text prompt for the image model. Do not include any intro, outro, explanations, markdown formatting, or quotes. Keep it under 150 words.`
        };

        const geminiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [img1base64, img2base64, analysisPrompt]
        });

        const detailedPrompt = geminiResponse.text?.trim() || `A professional commercial advertisement photoshoot of a person naturally holding ${productName}, studio lighting, clean background.`;
        console.log(`[HYBRID PIPELINE] Gemini generated prompt: "${detailedPrompt}"`);

        // 4. Generate image using Hugging Face FLUX.1-schnell (completely free API)
        const hfToken = process.env.HF_API_KEY?.trim().replace(/^["']|["']$/g, '');
        if (!hfToken) {
            throw new Error('HF_API_KEY environment variable is not defined. Please add your Hugging Face token to the .env file.');
        }

        let hfResponse;
        let retries = 3;
        while (retries > 0) {
            try {
                hfResponse = await axios.post(
                    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
                    { inputs: detailedPrompt + (userPrompt ? `, ${userPrompt}` : "") },
                    {
                        headers: {
                            'Authorization': `Bearer ${hfToken}`,
                            'Content-Type': 'application/json',
                            'Accept': 'image/png'
                        },
                        responseType: 'arraybuffer'
                    }
                );
                
                const contentType = hfResponse.headers['content-type'] || '';
                if (contentType.includes('application/json')) {
                    const errorJson = JSON.parse(Buffer.from(hfResponse.data).toString());
                    if (errorJson.error && errorJson.error.includes('loading')) {
                        const waitTime = (errorJson.estimated_time || 10) * 1000;
                        console.log(`HF model is loading. Waiting for ${waitTime}ms...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        retries--;
                        continue;
                    }
                    throw new Error(`Hugging Face API Error: ${errorJson.error || JSON.stringify(errorJson)}`);
                }
                break; // success
            } catch (err: any) {
                if (axios.isAxiosError(err) && err.response) {
                    const status = err.response.status;
                    let errorData: any = {};
                    try {
                        errorData = JSON.parse(Buffer.from(err.response.data).toString());
                    } catch {}
                    
                    if (status === 503 || (errorData.error && errorData.error.includes('loading'))) {
                        const waitTime = (errorData.estimated_time || 10) * 1000;
                        console.log(`HF model is loading (503). Waiting for ${waitTime}ms...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        retries--;
                        continue;
                    }
                    throw new Error(`Hugging Face Error: ${status} - ${errorData.error || err.message}`);
                }
                throw err;
            }
        }
        
        if (!hfResponse) {
            throw new Error('Failed to generate image from Hugging Face after retries');
        }

        const base64Image = `data:image/png;base64,${Buffer.from(hfResponse.data).toString('base64')}`;
        const uploadResult = await cloudinary.uploader.upload(base64Image, { resource_type: "image" });

        await prisma.project.update({
            where: { id: project.id },
            data: {
                generatedImage: uploadResult.secure_url,
                isGenerating: false
            }
        });

        res.status(200).json({ projectId: project.id });

    } catch (error: any) {
        if (tempProjectId!) {
            await prisma.project.update({
                where: { id: tempProjectId },
                data: {
                    isGenerating: false,
                    error: error.message
                }
            })
        }

        if (isCreditDeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 5 } }
            });
        }
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
}

// Create Video project (using FAL AI Luma Dream Machine Ray-2)
export const createVideo = async (req: Request, res: Response) => {
    const { userId } = req.auth();
    const { projectId } = req.body;
    let isCreditDeducted = false;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user || user.credits < 10) {
        return res.status(400).json({ message: "Insufficient credits" });
    }

    // deduct credits for video generation
    await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 10 } }
    }).then(() => { isCreditDeducted = true; });

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId },
            include: { user: true }
        });

        if (!project || project.isGenerating) {
            return res.status(400).json({ message: "Generation in progress" });
        }

        if (project.generatedVideo) {
            return res.status(400).json({ message: "Video already generated" });
        }

        await prisma.project.update({
            where: { id: projectId },
            data: { isGenerating: true }
        });

        const prompt = `
Generate a photorealistic commercial advertisement video featuring a presenter professionally showcasing ${project.productName}.

Scene flow:
1. Start with a cinematic close-up shot of the product.
2. The presenter picks up or receives the product naturally.
3. The presenter demonstrates the product's main features and usage.
4. Include multiple camera angles including close-ups, medium shots, and tracking shots.
5. End with a hero shot featuring both the presenter and product.

Requirements:
- The product must remain visible and be the primary focus throughout the video.
- The presenter should interact naturally with the product through realistic hand movements and body language.
- Use smooth cinematic camera motion and transitions.
- Maintain consistent lighting and realistic shadows.
- Use premium commercial advertising quality visuals.
- Ensure realistic human motion and product interaction.
- Create a polished, high-end marketing style suitable for social media and e-commerce advertisements.

${project.productDescription
                ? `Visually demonstrate these product features and benefits: ${project.productDescription}.`
                : ""}

Style:
Photorealistic, cinematic commercial, premium advertising quality, realistic motion, smooth camera movement, high detail, professional lighting, 4K video quality.
`;

        if (!project.generatedImage) {
            throw new Error("Generated image not found");
        }

        const model = "veo-3.1-generate-preview";

        const image = await axios.get(project.generatedImage, { responseType: 'arraybuffer', });

        const imageBytes: any = Buffer.from(image.data)

        let operation: any = await ai.models.generateVideos({
            model,
            prompt,
            image: {
                imageBytes: imageBytes.toString('base64'),
                mimeType: 'image/png',
            },
            config: {
                aspectRatio: project?.aspectRatio || '9:16',
                numberOfVideos: 1,
                resolution: '720p',
            }
        })

        while (!operation.done) {
            console.log("Waiting for video generation to complete...");
            await new Promise(resolve => setTimeout(resolve, 10000)); // wait for 10 seconds
            operation = await ai.operations.getVideosOperation({
                operation: operation,
            })
        }

        const filename = `${userId}-${Date.now()}.mp4`;
        const filePath = path.join('videos', filename);

        // Create the images directory if it doesn't exist
        fs.mkdirSync('videos', { recursive: true });

        if (!operation.response.generatedVideos) {
            throw new Error(operation.response.raiMediaFilteredReasons[0]);
        }

        // Download the generated video
        await ai.files.download({
            file: operation.response.generatedVideos[0].video,
            downloadPath: filePath,
        });

        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "video" });

        await prisma.project.update({
            where: { id: project.id },
            data: {
                generatedVideo: uploadResult.secure_url,
                isGenerating: false
            }
        });

        // remove video file from disk after upload
        fs.unlinkSync(filePath);

        res.status(200).json({ message: "Video generated successfully", videoUrl: uploadResult.secure_url });


    } catch (error: any) {
        await prisma.project.update({
            where: { id: projectId, userId },
            data: {
                isGenerating: false,
                error: error.message
            }
        })

        if (isCreditDeducted) {
            await prisma.user.update({
                where: { id: userId },
                data: { credits: { increment: 10 } }
            });
        }

        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all published projects
export const getAllPublishedProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                isPublished: true
            }
        });

        res.status(200).json({ projects });

    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { userId } = req.auth();
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await prisma.project.delete({
            where: { id: projectId }
        });

        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
}