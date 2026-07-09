/**
 * FeaturedCollectionParallax - Client component for parallax featured collection
 *
 * NOW USES ROBUST CSS PARALLAX via ParallaxSection
 */

'use client'

import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import ParallaxSection from '@/components/ParallaxSection'; // Adapted component
import type { FeaturedCollection } from '@/lib/types';

interface FeaturedCollectionParallaxProps {
    collection: FeaturedCollection;
}

// Fallback image if collection lacks one (Cosmic/Festival vibe)
const FALLBACK_BG = 'https://cdn.sanity.io/images/7iiji3rf/production/c39d89953c8ea4a316c0dd9321e1fe82c5f6ec6d-4928x3264.jpg?w=1920&q=75&fit=clip&auto=format';

export default function FeaturedCollectionParallax({ collection }: FeaturedCollectionParallaxProps) {
    // Use collection image or reliable fallback
    const bgUrl = collection.customHeroImage?.asset?.url || FALLBACK_BG;

    return (
        <ParallaxSection backgroundImage={bgUrl} height="min-h-[70vh] md:min-h-[600px]" overlayOpacity={0.3}>
            {/* Main Content Card - Increased translucency for better glass effect */}
            <div className="glass-dark bg-opacity-40 p-8 md:p-14 rounded-3xl glass-shadow-xl max-w-5xl mx-auto backdrop-blur-xl border border-white/10 relative overflow-hidden group">

                {/* Decorative gradient blob behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    {/* Featured Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm shadow-inner">
                        <span className="text-xl">✨</span>
                        <span className="text-sm font-bold tracking-widest uppercase text-white/90">Featured Collection</span>
                    </div>

                    {/* Collection Name */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-cream to-white/70 drop-shadow-sm mb-2 leading-tight">
                        {collection.name}
                    </h2>

                    {/* Vibe Description */}
                    {collection.vibeDescription && (
                        <p className="text-xl md:text-2xl text-warm-white/90 font-light max-w-3xl mx-auto leading-relaxed border-t border-b border-white/10 py-6">
                            "{collection.vibeDescription}"
                        </p>
                    )}

                    {/* Countdown Timer */}
                    {collection.eventStartDate && (
                        <div className="w-full max-w-2xl bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/5">
                            <p className="text-white/60 text-sm uppercase tracking-widest mb-4 font-semibold">
                                Festival Countdown
                            </p>
                            <div className="scale-90 md:scale-100 origin-center">
                                <CountdownTimer targetDate={collection.eventStartDate} />
                            </div>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-4 w-full justify-center">
                        <Link
                            href={`/collections/${collection.slug.current}`}
                            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Collection <span className="group-hover:rotate-12 transition-transform">🚀</span>
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="/collections"
                            className="px-8 py-4 rounded-full font-semibold text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                        >
                            View All Collections
                        </Link>
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
}
