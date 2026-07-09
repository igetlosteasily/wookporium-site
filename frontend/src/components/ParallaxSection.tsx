import React from 'react'

interface ParallaxSectionProps {
    backgroundImage: string
    children?: React.ReactNode
    overlayOpacity?: number // 0 to 1
    overlayColor?: string
    height?: string
}

export default function ParallaxSection({
    backgroundImage,
    children,
    overlayOpacity = 0.6,
    overlayColor = 'bg-black',
    height = 'h-[60vh]'
}: ParallaxSectionProps) {
    return (
        <div
            className={`relative w-full ${height} parallax-bg flex items-center justify-center overflow-hidden`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div
                className={`absolute inset-0 ${overlayColor}`}
                style={{ opacity: overlayOpacity }}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {children}
            </div>
        </div>
    )
}
