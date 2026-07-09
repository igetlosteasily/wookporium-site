/**
 * Products Loading State
 * Displays skeleton grid while products are being fetched
 */

import { ProductCardSkeleton } from '@/components/ProductCard'

export default function ProductsLoading() {
  return (
    <main className="min-h-screen">
      <section className="section-container">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-cream skeleton rounded w-64 mx-auto mb-4" />
          <div className="h-6 bg-cream skeleton rounded w-96 max-w-full mx-auto" />
        </div>

        {/* Filter Buttons Skeleton */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-cream skeleton rounded-lg w-24" />
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
