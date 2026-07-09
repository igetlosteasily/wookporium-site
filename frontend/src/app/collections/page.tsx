/**
 * Collections Index Page
 * Lists all active featured collections
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedCollections } from '@/lib/sanity'
import ParallaxSection from '@/components/ParallaxSection'
import MotionReveal from '@/components/MotionReveal'

export const metadata: Metadata = {
  title: 'Featured Collections',
  description: 'Explore our curated festival and seasonal collections - handpicked pieces for your journey',
}

export default async function CollectionsPage() {
  const collections = await getFeaturedCollections()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="min-h-[40vh]"
        overlayOpacity={0.4}
      >
        <MotionReveal className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-xl">
            Featured Collections
          </h1>
          <p className="text-xl text-white/95 drop-shadow-md">
            Curated collections for festivals, seasons, and special vibes ✨
          </p>
        </MotionReveal>
      </ParallaxSection>

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {collections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <MotionReveal key={collection._id} delay={index * 0.1}>
              <Link
                href={`/collections/${collection.slug.current}`}
                className="group glass-light glass-shadow rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Collection Image */}
                <div className="relative aspect-video overflow-hidden">
                  {collection.customHeroImage?.asset?.url && collection.customHeroImage.asset.url.trim() !== '' ? (
                    <Image
                      src={collection.customHeroImage.asset.url}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-terracotta via-sage to-brown-warm" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Featured Badge */}
                  {collection.isFeatured && (
                    <div className="absolute top-4 right-4 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                      {collection.name}
                    </h2>
                    {collection.vibeDescription && (
                      <p className="text-white/90 text-sm italic">
                        {collection.vibeDescription}
                      </p>
                    )}
                  </div>
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  {collection.eventStartDate && (
                    <p className="text-sm text-secondary font-medium mb-2">
                      📅 {new Date(collection.eventStartDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-terracotta font-bold group-hover:translate-x-1 transition-transform">
                      View Collection →
                    </span>
                    <span className="text-secondary/80 bg-white/40 px-3 py-1 rounded-full border border-white/20">
                      #{collection.festivalTag}
                    </span>
                  </div>
                </div>
              </Link>
              </MotionReveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎪</div>
            <h2 className="text-3xl font-serif font-semibold text-brown-warm mb-4">
              Collections Coming Soon!
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're curating amazing collections for festivals and special occasions. Check back soon or browse all our products!
            </p>
            <Link
              href="/products"
              className="inline-block bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
