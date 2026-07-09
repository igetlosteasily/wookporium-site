/**
 * ParallaxBackground - Reusable parallax gradient background component
 * 
 * Creates festival-themed animated gradient blobs that move at different speeds
 * during scroll, adding depth and immersion to sections.
 * 
 * @example
 * ```tsx
 * <section className="relative min-h-screen overflow-hidden">
 *   <ParallaxBackground variant="all" />
 *   {/* Your content *\/}
 * </section>
 * ```
 */

'use client'

import { Parallax } from 'react-scroll-parallax';

interface ParallaxBackgroundProps {
    /** Which gradient blobs to render */
    variant?: 'sunset' | 'ocean' | 'forest' | 'electric' | 'all';
    /** Custom className for container */
    className?: string;
}

export default function ParallaxBackground({
    variant = 'all',
    className = ''
}: ParallaxBackgroundProps) {
    return (
        <div className={`parallax-bg-container ${className}`}>

            {/* Sunset Blob - Top Left */}
            {(variant === 'sunset' || variant === 'all') && (
                <Parallax
                    speed={-20}
                    className="absolute top-[-10%] left-[-10%]"
                >
                    <div className="gradient-blob gradient-sunset" />
                </Parallax>
            )}

            {/* Ocean Blob - Top Right */}
            {(variant === 'ocean' || variant === 'all') && (
                <Parallax
                    speed={-15}
                    className="absolute top-[30%] right-[-15%]"
                >
                    <div className="gradient-blob gradient-ocean" />
                </Parallax>
            )}

            {/* Forest Blob - Bottom Left */}
            {(variant === 'forest' || variant === 'all') && (
                <Parallax
                    speed={-10}
                    className="absolute bottom-[-10%] left-[20%]"
                >
                    <div className="gradient-blob gradient-forest" />
                </Parallax>
            )}

            {/* Electric Blob - Bottom Right (only when 'all') */}
            {variant === 'all' && (
                <Parallax
                    speed={-12}
                    className="absolute bottom-[10%] right-[10%]"
                >
                    <div className="gradient-blob gradient-electric" />
                </Parallax>
            )}

        </div>
    );
}
