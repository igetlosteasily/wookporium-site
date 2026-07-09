/**
 * Products Page - Main product catalog with filtering
 * 
 * Server component that fetches all products and passes them to
 * the client-side ProductGrid component for filtering.
 */

import type { Metadata } from 'next'
import { getProducts } from '@/lib/sanity'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'
import ParallaxSection from '@/components/ParallaxSection'

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our full collection of handmade festival fashion, crochet apparel, and natural jewelry. Unique pieces crafted with love for the festival community.',
  openGraph: {
    title: 'Shop All Products | Wookporium',
    description: 'Browse our full collection of handmade festival fashion and natural jewelry.',
  },
}

export default async function ProductsPage() {
  // Fetch all available products from Sanity
  const products = await getProducts()

  return (
    <main className="min-h-screen relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-sage/5 to-brown-warm/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.png')] opacity-[0.03]" />
      </div>

      {/* Page Header */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=2536&auto=format&fit=crop"
        height="min-h-[40vh]"
        overlayOpacity={0.4}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-header font-bold text-white mb-4 drop-shadow-xl">
            Shop All Products
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md font-light">
            Discover our full collection of handmade festival fashion and natural jewelry.
            Each piece is crafted with love for your journey. ✨
          </p>
        </div>
      </ParallaxSection>

      {/* Product Grid Section */}
      <section className="section-container relative z-10">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          // Empty State - No Products Yet
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="text-3xl font-header font-semibold text-dark-brown mb-4">
              Coming Soon!
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              We're crafting something magical. Our products will be available soon.
              Check back or follow us on Instagram for updates!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <Link href="/about" className="btn-outline">
                Learn Our Story
              </Link>
              <a
                href="https://instagram.com/wookporium"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Call-to-Action Section */}
      {products.length > 0 && (
        <section className="bg-cream py-16 px-4 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-header font-bold text-dark-brown mb-4">
              Looking for something specific?
            </h2>
            <p className="text-lg text-secondary mb-8">
              We love creating custom pieces! Reach out to discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/wookporium"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                DM us on Instagram
              </a>
              <Link href="/about" className="btn-outline">
                Learn About Our Process
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
