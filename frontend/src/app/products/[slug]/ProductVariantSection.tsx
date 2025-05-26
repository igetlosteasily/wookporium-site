'use client';

import { useState } from 'react';
import CartButton from '@/components/CartButton';
import VariantSelector from '@/components/VariantSelector';

interface Variant {
  sku: string;
  name: string;
  size?: string;
  color?: string;
  material?: string;
  style?: string;
  priceAdjustment: number;
  inventory: number;
  isAvailable: boolean;
  variantImageUrl?: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
  };
  shortDescription?: string;
  hasVariants?: boolean;
  variants?: Variant[];
  variantOptions?: {
    sizes?: string[];
    colors?: string[];
    materials?: string[];
    styles?: string[];
  };
  isAvailable: boolean;
  inventory?: number;
}

interface ProductVariantSectionProps {
  product: Product;
  onVariantChange?: (variant: Variant | null) => void; // New prop for communicating variant changes
}

export default function ProductVariantSection({ product, onVariantChange }: ProductVariantSectionProps) {
  // Ensure we have a valid base price with fallback
  const basePrice = product.price || 0;
  
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [finalPrice, setFinalPrice] = useState(basePrice);

  // Handle variant selection changes
  const handleVariantChange = (variant: Variant | null, price: number) => {
    setSelectedVariant(variant);
    setFinalPrice(price || basePrice); // Fallback to basePrice if price is invalid
    
    // Notify parent component about variant change (for image switching)
    onVariantChange?.(variant);
  };

  // Check product availability
  const isProductAvailable = () => {
    if (!product.isAvailable) return false;
    
    if (product.hasVariants) {
      return product.variants && product.variants.some(v => v.isAvailable && v.inventory > 0);
    }
    
    return (product.inventory || 0) > 0;
  };

  // Get current stock count
  const getCurrentStock = () => {
    if (selectedVariant) {
      return selectedVariant.inventory || 0;
    }
    
    if (product.hasVariants) {
      return product.variants?.reduce((total, variant) => {
        return total + (variant.isAvailable ? (variant.inventory || 0) : 0);
      }, 0) || 0;
    }
    
    return product.inventory || 0;
  };

  // Get price display for the header with null safety
  const getPriceDisplay = () => {
    if (product.hasVariants && !selectedVariant) {
      const prices = product.variants
        ?.filter(v => v.isAvailable)
        .map(v => (basePrice + (v.priceAdjustment || 0)))
        .filter(price => typeof price === 'number' && !isNaN(price)) || [];
      
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        if (minPrice === maxPrice) {
          return `$${minPrice.toFixed(2)}`;
        }
        return `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
      }
    }
    
    // Ensure finalPrice is a valid number before calling toFixed
    const safePrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice : basePrice;
    return `$${safePrice.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Price Display - Only show if variants exist and affect price */}
      {product.hasVariants && (
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-pink-400">
            {getPriceDisplay()}
          </span>
          {selectedVariant && (selectedVariant.priceAdjustment || 0) !== 0 && (
            <span className="text-lg text-purple-300">
              (Base: ${basePrice.toFixed(2)} {(selectedVariant.priceAdjustment || 0) > 0 ? '+' : ''}${(selectedVariant.priceAdjustment || 0).toFixed(2)})
            </span>
          )}
        </div>
      )}

      {/* Variant Selection */}
      {product.hasVariants && (
        <VariantSelector
          hasVariants={product.hasVariants}
          variantOptions={product.variantOptions}
          variants={product.variants || []}
          basePrice={basePrice}
          onVariantChange={handleVariantChange}
        />
      )}

      {/* Add to Cart */}
      <div className="space-y-4">
        <CartButton 
          product={product}
          selectedVariant={selectedVariant}
          finalPrice={typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice : basePrice}
          className="w-full text-lg"
          disabled={!isProductAvailable()}
        />

        {/* Availability Status */}
        <div className="text-center">
          {isProductAvailable() ? (
            <span className="text-green-400 text-sm">
              ✓ {getCurrentStock()} in stock
              {selectedVariant && (
                <span className="text-purple-300 ml-2">
                  ({selectedVariant.name})
                </span>
              )}
            </span>
          ) : (
            <span className="text-red-400 text-sm">✗ Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}