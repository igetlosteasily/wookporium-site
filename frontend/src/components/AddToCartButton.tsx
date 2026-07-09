/**
 * AddToCartButton - Snipcart integration for adding products to cart
 * 
 * Handles:
 * - Variant selection (if product has variants)
 * - Inventory validation
 * - Snipcart data attributes
 * - Loading states
 * 
 * @example
 * ```tsx
 * <AddToCartButton product={product} />
 * ```
 */

'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.hasVariants && product.variants && product.variants.length > 0
      ? product.variants[0].variantName
      : null
  )

  // Get selected variant details
  const variant = product.hasVariants && selectedVariant
    ? product.variants?.find(v => v.variantName === selectedVariant)
    : null

  // Calculate final price (base + variant adjustment)
  const finalPrice = variant 
    ? product.price + (variant.priceAdjustment || 0)
    : product.price

  // Check inventory
  const checkInventory = variant ? variant.inventory : product.inventory
  const isOutOfStock = checkInventory <= 0

  // Snipcart item ID (include variant if applicable)
  const itemId = variant 
    ? `${product.slug.current}-${variant.variantName.toLowerCase().replace(/\s+/g, '-')}`
    : product.slug.current

  // Get valid image URL (with fallback to empty string for Snipcart)
  const imageUrl = product.mainImage?.asset?.url || ''

  return (
    <div className="space-y-4">
      {/* Variant Selector */}
      {product.hasVariants && product.variants && product.variants.length > 0 && (
        <div>
          <label htmlFor="variant-select" className="block font-semibold text-dark-brown mb-2">
            Select Variant:
          </label>
          <select
            id="variant-select"
            value={selectedVariant || ''}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full input text-lg"
            aria-label="Select product variant"
          >
            {product.variants.map((v) => (
              <option key={v.variantName} value={v.variantName}>
                {v.variantName}
                {v.priceAdjustment !== 0 && ` (+$${v.priceAdjustment.toFixed(2)})`}
                {v.inventory <= 0 && ' - Out of Stock'}
                {v.inventory > 0 && v.inventory <= 3 && ` - Only ${v.inventory} left`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        className={`
          snipcart-add-item w-full py-4 px-8 rounded-lg font-bold text-lg
          transition-all duration-200 focus-visible-ring
          ${isOutOfStock
            ? 'bg-secondary/30 text-secondary cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-dark active:scale-95 shadow-lg hover:shadow-xl'
          }
        `}
        data-item-id={itemId}
        data-item-price={finalPrice.toFixed(2)}
        data-item-name={product.title}
        data-item-description={product.description || ''}
        data-item-image={imageUrl}
        data-item-url={`/products/${product.slug.current}`}
        data-item-categories={product.category}
        data-item-weight={product.weight || 0}
        data-item-quantity="1"
        data-item-max-quantity={checkInventory}
        disabled={isOutOfStock}
        aria-label={isOutOfStock ? 'Out of stock' : `Add ${product.title} to cart`}
      >
        {isOutOfStock ? (
          <>
            <span className="mr-2">😔</span>
            Out of Stock
          </>
        ) : (
          <>
            <span className="mr-2">🛒</span>
            Add to Cart - ${finalPrice.toFixed(2)}
          </>
        )}
      </button>

      {/* Stock Warning */}
      {!isOutOfStock && checkInventory <= 5 && (
        <p className="text-accent font-semibold text-center text-sm">
          ⚡ Only {checkInventory} left - Order soon!
        </p>
      )}

      {/* Out of Stock Message */}
      {isOutOfStock && (
        <div className="bg-cream p-4 rounded-lg text-center">
          <p className="text-secondary mb-2">
            This item is currently out of stock.
          </p>
          <a
            href="https://instagram.com/wookporium"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            DM us on Instagram for custom orders
          </a>
        </div>
      )}

      {/* Shipping Info */}
      <div className="bg-cream p-4 rounded-lg space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-lg">📦</span>
          <div>
            <p className="font-semibold text-dark-brown">Free Shipping</p>
            <p className="text-secondary">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-lg">✨</span>
          <div>
            <p className="font-semibold text-dark-brown">Handmade with Love</p>
            <p className="text-secondary">Each piece is unique</p>
          </div>
        </div>
      </div>
    </div>
  )
}
