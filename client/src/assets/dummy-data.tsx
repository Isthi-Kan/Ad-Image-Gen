import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart Upload',
        desc: 'Easily upload your assets. We auto-optimize formats and sizes.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'Instant Generation',
        desc: 'Generate high-converting ad videos and professional AI images in minutes.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Video Synthesis',
        desc: 'Create engaging video content with our advanced AI-powered synthesis tools.'
    }
];

export const plansData = [

    {
        id: 'basic',
        name: 'Basic',
        price: '$9',
        desc: 'Perfect for creators and freelancers',
        credits: 'Monthly',
        features: [
            '200 AI Image Generations',
            '30 AI Ad Video Generations',
            'Standard Generation Speed',
            'No Watermark',
            'Commercial Usage Rights',
            'HD Downloads',
            'Email Support'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$29',
        desc: 'Ideal for growing businesses',
        credits: 'Monthly',
        features: [
            '800 AI Image Generations',
            '150 AI Ad Video Generations',
            'Faster Generation Speed',
            'No Watermark',
            'Commercial Usage Rights',
            'HD Downloads',
            'Priority Queue',
            'Priority Support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Ultra',
        price: '$79',
        desc: 'Best for agencies and teams',
        credits: 'Monthly',
        features: [
            'Unlimited AI Image Generations*',
            '500 AI Ad Video Generations',
            'Fastest Generation Speed',
            'No Watermark',
            'Commercial Usage Rights',
            '4K Video Export',
            
            'Priority Support'
        ]
    }
];

export const faqData = [
    {
        question: 'What can I create with this platform?',
        answer: 'You can generate professional AI ad videos, marketing creatives, social media content, and high-quality AI images from simple text prompts.'
    },
    {
        question: 'How do AI credits work?',
        answer: 'Each generation consumes credits based on the content type. AI images use fewer credits, while AI ad videos require more credits due to higher processing costs.'
    },
     {
        question: 'Can I use generated content for commercial purposes?',
        answer: 'Yes. Paid plans include commercial usage rights, allowing you to use generated images and videos for marketing, advertising, and business purposes.'
    },
    {
        question: 'How long does it take to generate content?',
        answer: 'Most AI images are generated within seconds, while AI ad videos may take a few minutes depending on complexity, duration, and server load.'
    },
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "#" },
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "FAQ", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
           
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
        ]
    }
];