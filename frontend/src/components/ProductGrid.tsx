/**
 * ProductGrid - Client component for filterable product display
 * 
 * Handles category filtering and product display with smooth animations.
 * Receives products from server component for optimal performance.
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import MotionReveal from '@/components/MotionReveal'
import type { ProductListItem } from '@/lib/types'

interface ProductGridProps {
  /** All products to display and filter */
  products: ProductListItem[]
  /** Initial category filter from URL */
  initialCategory?: string
}

// Available product categories (must match Sanity schema)
const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'headwear', label: 'Headwear' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'knick-knacks', label: 'Knick-knacks' },
]

export default function ProductGrid({ products, initialCategory = 'all' }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Update active category when URL changes (e.g., clicking navigation while on products page)
  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return products
    }
    return products.filter(product =>
      product.category.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [products, activeCategory])

  // Count products per category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }

    CATEGORIES.forEach(cat => {
      if (cat.value !== 'all') {
        counts[cat.value] = products.filter(p =>
          p.category.toLowerCase() === cat.value.toLowerCase()
        ).length
      }
    })

    return counts
  }, [products])

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {CATEGORIES.map((category) => {
          const count = categoryCounts[category.value] || 0
          const isActive = activeCategory === category.value

          // Don't show categories with 0 products (except "All")
          if (count === 0 && category.value !== 'all') {
            return null
          }

          return (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`
                px-6 py-2 rounded-full font-semibold transition-all duration-300
                focus-visible-ring min-w-[44px] min-h-[44px] flex items-center gap-2
                border
                ${isActive
                  ? 'bg-primary text-deep-bg shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-105 border-primary'
                  : 'bg-white/10 text-warm-white border-white/20 hover:bg-white/20 hover:text-primary hover:border-primary/50'
                }
              `}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={isActive}
            >
              {category.label}
              <span
                className={`
                  text-xs font-bold px-2 py-0.5 rounded-full
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/10 text-primary'
                  }
                `}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Results Count */}
      <p className="text-center text-secondary mb-8">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        {activeCategory !== 'all' && (
          <button
            onClick={() => setActiveCategory('all')}
            className="ml-2 text-primary hover:underline focus-visible-ring rounded"
          >
            Clear filter
          </button>
        )}
      </p>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <MotionReveal key={product._id} delay={index * 0.1}>
              <ProductCard
                product={product}
                priority={index < 4} // Prioritize first 4 images
              />
            </MotionReveal>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-header font-semibold text-dark-brown mb-2">
            No products found
          </h3>
          <p className="text-secondary mb-6">
            Try selecting a different category
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="btn-primary"
          >
            View All Products
          </button>
        </div>
      )}
    </>
  )
}
