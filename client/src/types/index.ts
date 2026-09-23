import type React from "react";



export interface UploadZoneProps {
    label: string;
    file: File | null;
    onClear: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    theme?: 'dark' | 'light';
}

export interface User {
    id?: string;
    name?: string;
    email?: string;
}


export interface Project {
    isPublished: import("react/jsx-runtime").JSX.Element;
    id: string;
    name?: string;
    userId?: string;
    user?: User;
    productName?: string;
    productDescription?: string;
    userPrompt?: string;
    aspectRatio?: string;
    targetLength?: number;
    generatedImage?: string;
    generatedVideo?: string;
    isGenerating?: boolean;
    error?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    uploadedImages: string[];
}