import React from 'react'

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
    return (
        <button className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-black bg-linear-to-br from-[#7CFF4D] via-[#53db2f] to-[#2ea51b] hover:opacity-90 active:scale-95 transition-all ${className}`} {...props} >
            {children}
        </button>
    );
};

export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {

    return (
        <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-emerald-400/20 backdrop-blur-sm active:scale-95 transition bg-emerald-950/35 text-white hover:bg-emerald-900/45 ${className}`} {...props} >
            {children}
        </button>
    );
};