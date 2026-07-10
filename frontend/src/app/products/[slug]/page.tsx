/**
 * Product Detail Page - Individual product view
 * 
 * Server component that fetches product data and displays:
 * - Image gallery
 * - Product details and description
 * - Variant selector (if applicable)
 * - Add to cart button
 * - Reviews
 * - Related products
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, getRelatedProducts, getProductReviews, client } from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import AddToCartButton from '@/components/AddToCartButton'
import MotionReveal from '@/components/MotionReveal'

// ISR: known product pages are pre-rendered via generateStaticParams and
// refreshed at most once per 60s. New products (not in the static list) render
// on first request thanks to Next's default dynamicParams — also no rebuild.
export const revalidate = 60

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  // Validate image URL exists for metadata
  const productImageUrl = product.mainImage?.asset?.url
  const hasValidImage = productImageUrl && productImageUrl.trim() !== ''

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.description || `${product.title} - Handmade festival fashion from Wookporium`,
    ...(hasValidImage && {
      openGraph: {
        title: product.title,
        description: product.description || `${product.title} - Handmade festival fashion`,
        images: [
          {
            url: productImageUrl,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description || `${product.title} - Handmade festival fashion`,
        images: [productImageUrl],
      },
    }),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params

  // Fetch product data
  const product = await getProduct(resolvedParams.slug)

  // 404 if product doesn't exist
  if (!product) {
    notFound()
  }

  // Fetch related products and reviews
  const [relatedProducts, reviews] = await Promise.all([
    getRelatedProducts(product._id, product.category),
    getProductReviews(product._id),
  ])

  // Prepare images for gallery - ONLY include valid image URLs
  const galleryImages = [
    // Main image (if valid)
    product.mainImage?.asset?.url && {
      url: product.mainImage.asset.url,
      alt: product.title,
    },
    // Gallery images (filter out any with invalid URLs)
    ...(product.gallery || []).filter(img => img?.asset?.url).map((img) => ({
      url: img.asset.url,
      alt: product.title,
    })),
  ].filter(Boolean) as Array<{ url: string; alt: string }>

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <main className="min-h-screen relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-sage/5 to-brown-warm/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.png')] opacity-[0.03]" />
      </div>
      {/* Breadcrumb Navigation */}
      <nav className="bg-cream py-4 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto relative z-10">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-secondary hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-secondary">/</li>
            <li>
              <Link href="/products" className="text-secondary hover:text-primary transition-colors">
                Shop
              </Link>
            </li>
            <li className="text-secondary">/</li>
            <li className="text-dark-brown font-semibold">{product.title}</li>
          </ol>
        </div>
      </nav>

      {/* Product Details Section */}
      <section className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <MotionReveal>
            <ProductGallery images={galleryImages} productTitle={product.title} />
          </MotionReveal>

          {/* Right Column - Product Info */}
          <MotionReveal delay={0.15} className="glass-light glass-shadow rounded-2xl p-6 md:p-8 space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 bg-white/50 text-secondary uppercase text-sm font-semibold rounded-full border border-white/20">
                {product.category}
              </span>
              {product.isOneOfAKind && (
                <span className="px-4 py-1 bg-accent/90 text-white text-sm font-semibold rounded-full shadow-sm">
                  One of a Kind ✨
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-header font-bold text-dark-brown drop-shadow-sm">
              {product.title}
            </h1>

            {/* Reviews Summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.round(averageRating) ? 'text-accent' : 'text-gray-300'}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-secondary font-medium">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 border-b border-brown-warm/10 pb-6">
              <span className="text-5xl font-bold text-primary drop-shadow-sm">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-2xl text-secondary line-through opacity-70">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Festival Attribution */}
            {product.festivalAttribution && (
              <p className="text-lg text-secondary-dark italic bg-white/30 p-3 rounded-lg border-l-4 border-accent">
                ✨ {product.festivalAttribution}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-dark-brown leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <h3 className="font-semibold text-dark-brown mb-2">Materials:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/50 border border-white/20 text-secondary text-sm rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-white/40 p-4 rounded-lg border border-white/20">
                <h3 className="font-semibold text-dark-brown mb-2">Care Instructions:</h3>
                <p className="text-secondary text-sm">
                  {product.careInstructions}
                </p>
              </div>
            )}

            {/* Inventory Status */}
            {product.inventory <= 5 && product.inventory > 0 && (
              <p className="text-accent font-semibold animate-pulse">
                Only {product.inventory} left in stock!
              </p>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4">
              <AddToCartButton product={product} />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-brown-warm/10">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <span className="text-2xl">🌱</span>
                <span className="text-sm">Sustainably Made</span>
              </div>
              <div className="flex items-center gap-2 text-secondary font-medium">
                <span className="text-2xl">✋</span>
                <span className="text-sm">Handcrafted</span>
              </div>
              <div className="flex items-center gap-2 text-secondary font-medium">
                <span className="text-2xl">💚</span>
                <span className="text-sm">Made with Love</span>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="bg-cream py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-header font-bold text-dark-brown mb-8 text-center">
                Customer Reviews
              </h2>
            </MotionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((review, index) => (
                <MotionReveal key={review._id} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < review.rating ? 'text-accent' : 'text-gray-300'}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-dark-brown mb-4 leading-relaxed">
                    "{review.reviewText}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    {review.customerPhoto?.asset?.url && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={review.customerPhoto.asset.url}
                          alt={review.customerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-dark-brown">
                        {review.customerName}
                      </p>
                      {review.festivalContext && (
                        <p className="text-xs text-secondary italic">
                          {review.festivalContext}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section-container">
          <MotionReveal>
            <h2 className="text-3xl md:text-4xl font-header font-bold text-dark-brown mb-8 text-center">
              You Might Also Like
            </h2>
          </MotionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <MotionReveal key={relatedProduct._id} delay={index * 0.1}>
                <ProductCard product={relatedProduct} />
              </MotionReveal>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product" && defined(slug.current)][] {"slug": slug.current}`)
  if (!products || products.length === 0) {
    return [{ slug: 'dummy-product' }]
  }
  return products.map((prod: any) => ({
    slug: prod.slug,
  }))
}
