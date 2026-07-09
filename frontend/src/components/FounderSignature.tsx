import React from 'react'

interface FounderSignatureProps {
    name?: string
    role?: string
    className?: string
}

export default function FounderSignature({
    name = "Marina",
    role = "Founder & Curator",
    className = ""
}: FounderSignatureProps) {
    return (
        <div className={`mt-8 ${className}`}>
            <div className="font-accent text-3xl md:text-4xl text-terracotta transform -rotate-2 origin-bottom-left mb-2">
                {name}
            </div>
            <div className="text-secondary text-sm uppercase tracking-widest font-semibold ml-1">
                {role}
            </div>
        </div>
    )
}
