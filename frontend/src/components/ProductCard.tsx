/**
 * ProductCard - Reusable product display component
 * 
 * Displays product image, name, price, category, and special badges.
 * Used in product grids, featured sections, and search results.
 * 
 * @example
 * ```tsx
 * <ProductCard product={product} priority={false} />
 * ```
 */

import Image from 'next/image'
import Link from 'next/link'
import type { ProductListItem } from '@/lib/types'

interface ProductCardProps {
  /** Product data to display */
  product: ProductListItem
  /** Load image with priority (for above-fold content) */
  priority?: boolean
  /** Optional CSS classes for container */
  className?: string
}

export default function ProductCard({
  product,
  priority = false,
  className = ""
}: ProductCardProps) {
  // Validate product data
  if (!product || !product.mainImageUrl) {
    return <ProductCardSkeleton />
  }

  return (
    <Link
      href={`/products/${product.slug.current}`}
      className={`card group ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.mainImageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Glass overlay on hover */}
        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-8 bg-gradient-to-t from-black/60 to-transparent">
          <span className="glass-light glass-shadow text-primary font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
            <span>✨</span> View Product
          </span>
        </div>

        {/* One of a Kind Badge */}
        {product.isOneOfAKind && (
          <div className="absolute top-4 right-4 glass-accent text-white px-3 py-1 rounded-full text-sm font-semibold glass-shadow z-10">
            One of a Kind
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 glass-primary text-white px-3 py-1 rounded-full text-sm font-semibold glass-shadow z-10">
            Featured
          </div>
        )}
      </div>

      {/* Product Info with Glass Panel */}
      <div className="p-6 glass-dark border-t border-white/10">
        <h3 className="text-xl font-semibold text-warm-white mb-2 group-hover:text-primary transition-colors line-clamp-2 drop-shadow-md">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-secondary uppercase tracking-wide font-bold drop-shadow-[0_0_5px_rgba(255,0,170,0.5)]">
            {product.category}
          </span>
        </div>

        {/* Festival Attribution */}
        {product.festivalAttribution && (
          <p className="text-sm text-white/70 mt-2 italic line-clamp-1">
            {product.festivalAttribution}
          </p>
        )}
      </div>
    </Link>
  )
}

/**
 * ProductCardSkeleton - Loading state for ProductCard
 */
export function ProductCardSkeleton() {
  return (
    <div className="card">
      {/* Image Skeleton */}
      <div className="aspect-square bg-cream skeleton" />

      {/* Info Skeleton */}
      <div className="p-6 space-y-3">
        <div className="h-6 bg-cream skeleton rounded w-3/4" />
        <div className="flex items-center justify-between">
          <div className="h-8 bg-cream skeleton rounded w-20" />
          <div className="h-4 bg-cream skeleton rounded w-16" />
        </div>
      </div>
    </div>
  )
}
