/**
 * About Page
 * Dynamic CMS-controlled About page with hero, story, mission, process, and contact sections
 */

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAboutPage, getBusinessInfo, getProducts } from '@/lib/sanity'
import PortableText from '@/components/PortableText'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'
import ParallaxSection from '@/components/ParallaxSection'
import FounderSignature from '@/components/FounderSignature'
import MotionReveal from '@/components/MotionReveal'

/**
 * Generate SEO metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage()
  const business = await getBusinessInfo()

  if (!aboutPage) {
    return {
      title: 'About Us',
      description: 'Learn more about our story and mission.',
    }
  }

  const title = aboutPage.seoTitle || `${aboutPage.heroHeading} | ${business?.brandName || 'Wookporium'}`
  const description = aboutPage.seoDescription || aboutPage.heroSubheading || 'Learn more about our story and handcrafted festival fashion.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: aboutPage.heroImage?.asset?.url ? [aboutPage.heroImage.asset.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: aboutPage.heroImage?.asset?.url ? [aboutPage.heroImage.asset.url] : [],
    },
  }
}

/**
 * About Page Component
 */
export default async function AboutPage() {
  const [aboutPage, business, products] = await Promise.all([
    getAboutPage(),
    getBusinessInfo(),
    getProducts(), // Fetch products for Founder's Picks
  ])



  // If no about page content exists in CMS, show 404
  if (!aboutPage) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ParallaxSection
        backgroundImage={aboutPage.heroImage?.asset?.url || ''}
        height="min-h-[50vh] md:min-h-[60vh]"
        overlayOpacity={0.4}
      >
        <MotionReveal className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif drop-shadow-xl">
            {aboutPage.heroHeading}
          </h1>
          {aboutPage.heroSubheading && (
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md font-light">
              {aboutPage.heroSubheading}
            </p>
          )}
        </MotionReveal>
      </ParallaxSection>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Story Content */}
              <MotionReveal className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-accent-dark mb-6 font-serif">
                  {aboutPage.storyHeading}
                </h2>
                <PortableText
                  content={aboutPage.storyContent}
                  className="text-lg text-cream leading-relaxed"
                />
                <FounderSignature />
              </MotionReveal>

              {/* Story Image */}
              {aboutPage.storyImage?.asset?.url && (
                <MotionReveal delay={0.15} className="order-1 md:order-2">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={aboutPage.storyImage.asset.url}
                      alt={aboutPage.storyHeading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </MotionReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Values Section */}
      {aboutPage.missionPoints && aboutPage.missionPoints.length > 0 && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <MotionReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-accent-dark text-center mb-12 font-serif">
                  {aboutPage.missionHeading}
                </h2>
              </MotionReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aboutPage.missionPoints.map((point, index) => (
                  <MotionReveal key={index} delay={(index % 3) * 0.15}>
                  <div
                    className="bg-white/60 backdrop-blur-md shadow-lg border border-white/40 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
                  >
                    {point.icon && (
                      <div className="text-5xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" aria-hidden="true">
                        {point.icon}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-accent-dark mb-3">
                      {point.heading}
                    </h3>
                    <p className="text-cream leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {(aboutPage.processContent || (aboutPage.processImages && aboutPage.processImages.length > 0)) && (
        <section className="py-16 md:py-24 bg-warm-white">
          <div className="container mx-auto px-4">
            <MotionReveal className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-dark text-center mb-12 font-serif">
                {aboutPage.processHeading}
              </h2>

              {aboutPage.processContent && (
                <div className="max-w-3xl mx-auto mb-12">
                  <p className="text-lg text-cream leading-relaxed text-center">
                    {aboutPage.processContent}
                  </p>
                </div>
              )}

              {/* Studio Montage Layout */}
              {aboutPage.processImages && aboutPage.processImages.length > 0 && (
                <div className="grid grid-cols-12 gap-4 mt-8">
                  {/* Feature Image (Left) */}
                  <div className={`col-span-12 ${aboutPage.processImages.length > 1 ? 'md:col-span-7' : ''} relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-[1.01]`}>
                    {aboutPage.processImages[0]?.asset?.url && (
                      <>
                        <Image
                          src={aboutPage.processImages[0].asset.url}
                          alt="In the studio crafting"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <p className="text-white font-serif text-xl">Handcrafted with Intention</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Column Stack - Only show if we have more images */}
                  {aboutPage.processImages.length > 1 && (
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                      {/* Top Right */}
                      {aboutPage.processImages[1]?.asset?.url && (
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg flex-1">
                          <Image
                            src={aboutPage.processImages[1].asset.url}
                            alt="Detail work"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>
                      )}
                      {/* Bottom Right */}
                      {aboutPage.processImages[2]?.asset?.url && (
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg flex-1">
                          <Image
                            src={aboutPage.processImages[2].asset.url}
                            alt="Finished pieces"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </MotionReveal>
          </div>
        </section>
      )}

      {/* Founder's Favorites (Conversion Hook) */}
      <section className="py-16 bg-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <MotionReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent-dark mb-4">
              Marina's Current Rotation
            </h2>
            <p className="text-cream/90 max-w-2xl mx-auto">
              The pieces I'm currently wearing to every show. Hand-picked and road-tested for maximum vibe.
            </p>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {products.slice(0, 3).map((product, index) => (
              <MotionReveal key={product._id} delay={index * 0.15}>
                <ProductCard product={product} />
              </MotionReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              Shop All Favorites
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-terracotta/10 to-sage/10">
        <div className="container mx-auto px-4">
          <MotionReveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-dark mb-6 font-serif">
              {aboutPage.contactHeading}
            </h2>

            {aboutPage.contactText && (
              <p className="text-lg text-cream mb-8 leading-relaxed">
                {aboutPage.contactText}
              </p>
            )}

            {/* Social Media Links */}
            {aboutPage.showSocialLinks && business && (
              <div className="flex justify-center items-center gap-6 mb-8">
                {business.instagramHandle && (
                  <a
                    href={`https://instagram.com/${business.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-dark hover:text-secondary-dark/80 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                {business.facebookUrl && (
                  <a
                    href={business.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-dark hover:text-secondary-dark/80 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}

                {business.tiktokHandle && (
                  <a
                    href={`https://tiktok.com/@${business.tiktokHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-dark hover:text-secondary-dark/80 transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Back to Shop CTA */}
            <Link
              href="/products"
              className="inline-block bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors duration-200"
            >
              Shop Our Collection
            </Link>
          </MotionReveal>
        </div>
      </section>
    </main>
  )
}
