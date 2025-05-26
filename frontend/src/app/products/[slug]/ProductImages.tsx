'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
  mainImageUrl: string;
  title: string;
  galleryImages?: string[];
}

interface ProductImagesProps {
  product: Product;
  selectedVariant?: Variant | null;
}

export default function ProductImages({ product, selectedVariant }: ProductImagesProps) {
  // Always initialize with the main image to ensure consistency
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  // Update selected image when variant changes or component mounts
  useEffect(() => {
    // Priority: 1. Variant image (if variant selected), 2. Main product image
    const priorityImage = selectedVariant?.variantImageUrl || product.mainImageUrl || ''
    setSelectedImage(priorityImage)
    setMounted(true)
  }, [product.mainImageUrl, selectedVariant?.variantImageUrl])

  // Build smart image array with variant image prioritized
  const buildImageArray = () => {
    const images: string[] = []
    
    // 1. Add variant image first (if exists and variant is selected)
    if (selectedVariant?.variantImageUrl) {
      images.push(selectedVariant.variantImageUrl)
    }
    
    // 2. Add main image (if it's not the same as variant image)
    if (product.mainImageUrl && product.mainImageUrl !== selectedVariant?.variantImageUrl) {
      images.push(product.mainImageUrl)
    }
    
    // 3. Add gallery images (excluding duplicates)
    if (product.galleryImages) {
      product.galleryImages.forEach(galleryImage => {
        if (!images.includes(galleryImage)) {
          images.push(galleryImage)
        }
      })
    }
    
    return images.filter(Boolean)
  }

  const allImages = buildImageArray()
  
  // Use priority image as fallback during SSR
  const displayImage = selectedImage || selectedVariant?.variantImageUrl || product.mainImageUrl

  // Get variant info for alt text enhancement
  const getImageAltText = (imageUrl: string, index: number) => {
    const baseAlt = `${product.title} - Image ${index + 1}`
    
    // If this is the variant image and we have variant info, enhance the alt text
    if (selectedVariant?.variantImageUrl === imageUrl && selectedVariant) {
      const variantDetails = [
        selectedVariant.size,
        selectedVariant.color,
        selectedVariant.material,
        selectedVariant.style
      ].filter(Boolean).join(' ')
      
      return variantDetails ? `${product.title} - ${variantDetails}` : baseAlt
    }
    
    return baseAlt
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 relative">
        {displayImage && (
          <>
            <Image
              src={displayImage}
              alt={getImageAltText(displayImage, 0)}
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            
            {/* Variant indicator badge */}
            {selectedVariant?.variantImageUrl === displayImage && mounted && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                {selectedVariant.name}
              </div>
            )}
          </>
        )}
      </div>

      {/* Gallery Thumbnails - always render container to avoid layout shift */}
      <div className="grid grid-cols-3 gap-4">
        {allImages.length > 1 && allImages.map((imageUrl, index) => {
          // Skip the selected image logic during SSR, use stable classes
          const isSelected = mounted && selectedImage === imageUrl
          const isVariantImage = selectedVariant?.variantImageUrl === imageUrl
          
          return (
            <div 
              key={`${imageUrl}-${index}`} // More stable key
              onClick={() => mounted && setSelectedImage(imageUrl)}
              className={`aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-md border relative ${
                isSelected
                  ? 'ring-2 ring-pink-400 bg-pink-500/20 border-pink-400/50' 
                  : isVariantImage
                    ? 'border-purple-400/50 bg-purple-500/10 hover:bg-purple-500/20'
                    : 'border-white/20 bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                // Use inline styles for dynamic properties to avoid className hydration issues
                opacity: mounted ? 1 : 0.7 
              }}
            >
              <Image
                src={imageUrl}
                alt={getImageAltText(imageUrl, index)}
                fill
                className="object-cover transition-transform duration-300"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                style={{
                  transform: isSelected && mounted ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              
              {/* Variant image indicator */}
              {isVariantImage && mounted && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-md"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Image context info */}
      {mounted && selectedVariant && (
        <div className="text-center text-sm text-purple-300">
          {selectedVariant.variantImageUrl === selectedImage ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></span>
              Showing {selectedVariant.name} variant
            </span>
          ) : (
            <span className="text-purple-400">
              Variant: {selectedVariant.name}
            </span>
          )}
        </div>
      )}
    </div>
  )
}