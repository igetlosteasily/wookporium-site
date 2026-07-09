/**
 * Featured Collection Page
 * Beautiful, engaging page for festival/seasonal collections
 * Auto-enriched with Open Graph data, product filtering, countdown timer, and more
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFeaturedCollection, getProductsByFestivalTag, getProductReviews, client } from '@/lib/sanity'
import { fetchOpenGraphData } from '@/lib/og-fetcher'
import PortableText from '@/components/PortableText'
import ProductCard from '@/components/ProductCard'
import CountdownTimer from '@/components/CountdownTimer'
import ParallaxSection from '@/components/ParallaxSection'
import MotionReveal from '@/components/MotionReveal'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate SEO metadata
 */
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getFeaturedCollection(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  const title = collection.seoTitle || `${collection.name} | Wookporium`
  const description = collection.seoDescription || `Explore the ${collection.name} collection - ${collection.vibeDescription || 'handcrafted pieces perfect for your journey'}`
  const imageUrl = collection.customHeroImage?.asset?.url && collection.customHeroImage.asset.url.trim() !== ''
    ? collection.customHeroImage.asset.url
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

/**
 * Collection Page Component
 */
export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getFeaturedCollection(slug)

  if (!collection) {
    notFound()
  }

  // Fetch products matching this collection's festival tag
  const products = await getProductsByFestivalTag(collection.festivalTag)

  // Fetch OG data from official URL if provided
  let ogData = null
  if (collection.officialUrl) {
    ogData = await fetchOpenGraphData(collection.officialUrl)
  }

  // Determine hero image: custom > OG > fallback gradient
  const heroImage = collection.customHeroImage?.asset?.url || ogData?.image

  // Gather customer reviews from collection products (for gallery)
  const reviewsPromises = products.slice(0, 5).map(p => getProductReviews(p._id))
  const reviewsArrays = await Promise.all(reviewsPromises)
  const allReviews = reviewsArrays.flat().filter(r => r.customerPhoto?.asset?.url)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {/* Fixed Ambient Background for Content */}
      {heroImage && heroImage.trim() !== '' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover blur-3xl opacity-20 scale-110"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-warm-white/40 mix-blend-overlay" />
        </div>
      )}

      {/* Parallax Hero Section */}
      <ParallaxSection
        backgroundImage={heroImage || ''}
        height="min-h-[50vh] md:min-h-[60vh]"
        overlayOpacity={0.3}
        overlayColor="bg-black/40"
      >
        <MotionReveal className="text-center max-w-4xl mx-auto py-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-2xl mb-4">
            {collection.name}
          </h1>
          {collection.vibeDescription && (
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg font-light italic">
              {collection.vibeDescription}
            </p>
          )}
          {ogData?.siteName && (
            <p className="text-white/80 mt-4 text-sm uppercase tracking-wider">
              Official: {ogData.siteName}
            </p>
          )}
        </MotionReveal>
      </ParallaxSection>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Marina's Note */}
            <MotionReveal>
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">✨</div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-warm">
                  Marina's Note
                </h2>
              </div>
              <div className="glass-light glass-shadow rounded-2xl p-6 md:p-8">
                <PortableText content={collection.curatorsNote} />
              </div>
            </section>
            </MotionReveal>

            {/* Official Festival Description (if available) */}
            {ogData?.description && (
              <MotionReveal>
              <section className="glass-light glass-shadow rounded-2xl p-6 md:p-8 border-l-4 border-sage">
                <h3 className="text-xl font-semibold text-brown-warm mb-3 flex items-center gap-2">
                  <span>🎪</span>
                  <span>About the Festival</span>
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {ogData.description}
                </p>
                {collection.officialUrl && (
                  <a
                    href={collection.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:text-terracotta/80 font-semibold inline-flex items-center gap-2"
                  >
                    Visit Official Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </section>
              </MotionReveal>
            )}

            {/* Marina's Picks */}
            {collection.marinasPicks && collection.marinasPicks.length > 0 && (
              <MotionReveal>
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">💚</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-warm">
                    Marina's Picks
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Marina's favorite pieces from this collection - perfect for the vibe!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {collection.marinasPicks.map((product, index) => (
                    <MotionReveal key={product._id} delay={index * 0.1}>
                    <ProductCard
                      product={{
                        _id: product._id,
                        _updatedAt: new Date().toISOString(),
                        title: product.title,
                        slug: product.slug,
                        price: product.price,
                        mainImageUrl: product.mainImage.asset.url,
                        category: '',
                        featured: true,
                        isOneOfAKind: false,
                        festivalAttribution: collection.festivalTag,
                      }}
                      priority={false}
                    />
                    </MotionReveal>
                  ))}
                </div>
              </section>
              </MotionReveal>
            )}

            {/* All Products */}
            <MotionReveal>
            <section>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-warm mb-6">
                Complete Collection
              </h2>
              <p className="text-gray-600 mb-8">
                {products.length} {products.length === 1 ? 'piece' : 'pieces'} ready for {collection.name}
              </p>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product, index) => (
                    <MotionReveal key={product._id} delay={(index % 4) * 0.1}>
                    <ProductCard
                      product={product}
                      priority={index < 4}
                    />
                    </MotionReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-cream-light rounded-2xl">
                  <p className="text-xl text-gray-600 mb-4">
                    Collection coming soon! Check back for new pieces.
                  </p>
                  <Link href="/products" className="text-terracotta hover:underline font-semibold">
                    Browse All Products →
                  </Link>
                </div>
              )}
            </section>
            </MotionReveal>

            {/* Customer Gallery (if reviews with photos exist) */}
            {allReviews.length > 0 && (
              <MotionReveal>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brown-warm mb-6">
                  Festival Fam Gallery
                </h2>
                <p className="text-gray-600 mb-8">
                  Real photos from real people rocking our pieces!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {allReviews.slice(0, 6).map((review, index) => (
                    <MotionReveal key={review._id} delay={(index % 6) * 0.08}>
                    <div
                      className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                      {review.customerPhoto?.asset?.url && review.customerPhoto.asset.url.trim() !== '' && (
                        <Image
                          src={review.customerPhoto.asset.url}
                          alt={`Photo by ${review.customerName}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <p className="text-white text-sm font-semibold">
                          {review.customerName}
                        </p>
                      </div>
                    </div>
                    </MotionReveal>
                  ))}
                </div>
              </section>
              </MotionReveal>
            )}
          </div>

          {/* Sidebar */}
          <MotionReveal className="space-y-8" delay={0.2}>
            {/* Countdown Timer */}
            {collection.eventStartDate && (
              <CountdownTimer
                targetDate={collection.eventStartDate}
                eventName={collection.name}
              />
            )}

            {/* Festival Tips */}
            {collection.festivalTips && collection.festivalTips.length > 0 && (
              <div className="glass-light glass-shadow rounded-2xl p-6">
                <h3 className="text-2xl font-serif font-bold text-brown-warm mb-6">
                  Festival Essentials
                </h3>
                <ul className="space-y-4">
                  {collection.festivalTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {tip.icon && (
                        <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                      )}
                      <p className="text-gray-700 leading-relaxed">{tip.tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Festival Resources */}
            <div className="glass-light glass-shadow rounded-2xl p-6 border-2 border-sage/20">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📚</span>
                <h3 className="text-2xl font-serif font-bold text-brown-warm">
                  Festival Resources
                </h3>
              </div>

              {/* Safety & Harm Reduction */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-wider mb-3">
                  Safety & Harm Reduction
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://dancesafe.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → DanceSafe - Harm Reduction Org
                  </a>
                  <a
                    href="https://publicgoodnews.com/2024/08/14/how-to-stay-safe-at-concerts-outdoor-music-festivals/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Festival Safety Guide
                  </a>
                  <a
                    href="https://www.shambhalamusicfestival.com/health-safety-harm-reduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Shambhala Health & Safety
                  </a>
                </div>
              </div>

              {/* Packing Guides */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-wider mb-3">
                  Packing Guides
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://festivalsurvivalguide.com/the-ultimate-packing-list/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Ultimate Festival Packing List
                  </a>
                  <a
                    href="https://www.rei.com/learn/expert-advice/festival-camping-checklist.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → REI Camping Checklist
                  </a>
                  <a
                    href="https://www.musicfestivalwizard.com/the-ultimate-music-festival-packing-list/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Music Festival Wizard Guide
                  </a>
                </div>
              </div>

              {/* First-Timer Guides */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-wider mb-3">
                  First-Timer Survival
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://festivalsurvivalguide.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Festival Survival Guide
                  </a>
                  <a
                    href="https://www.loopearplugs.com/blogs/blog/how-to-survive-your-first-festival-our-music-festival-guide-for-beginners"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → First Festival Tips (Loop)
                  </a>
                  <a
                    href="https://www.rockandart.org/music-festival-for-first-time-attendees/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Rock & Art Festival Guide
                  </a>
                </div>
              </div>

              {/* Transportation & Camping */}
              <div>
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-wider mb-3">
                  Transportation & Camping
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://lunolife.com/blogs/journal/how-to-car-camp-at-music-festivals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Car Camping at Festivals
                  </a>
                  <a
                    href="https://www.tourhero.com/en/magazine/lifestyle/music-festival-guide-how-to-prep-and-pack-for-car-camping/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors hover:translate-x-1 transform duration-200"
                  >
                    → Festival Car Camping Guide
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-sage/20">
                <p className="text-xs text-gray-500 italic">
                  These resources are provided to help keep our festival fam safe and prepared. Stay informed, look out for each other! 💚
                </p>
              </div>
            </div>

            {/* Hashtags */}
            {collection.hashtags && collection.hashtags.length > 0 && (
              <div className="glass-light glass-shadow rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-brown-warm mb-4">
                  Share Your Look!
                </h3>
                <div className="flex flex-wrap gap-2">
                  {collection.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-terracotta"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Tag us and use these hashtags to be featured!
                </p>
              </div>
            )}

            {/* Quick Links */}
            <div className="glass-light glass-shadow rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-brown-warm mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link
                  href="/products"
                  className="block text-gray-700 hover:text-terracotta transition-colors"
                >
                  → Browse All Products
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-700 hover:text-terracotta transition-colors"
                >
                  → Marina's Story
                </Link>
                {collection.officialUrl && (
                  <a
                    href={collection.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-terracotta transition-colors"
                  >
                    → Festival Info
                  </a>
                )}
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const collections = await client.fetch(`*[_type == "featuredCollection" && defined(slug.current)][] {"slug": slug.current}`)
  if (!collections || collections.length === 0) {
    return [{ slug: 'dummy-collection' }]
  }
  return collections.map((col: any) => ({
    slug: col.slug,
  }))
}
