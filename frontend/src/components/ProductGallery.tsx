/**
 * ProductGallery - Image gallery with thumbnail navigation
 * 
 * Displays main product image with clickable thumbnails below.
 * Client component for interactive image switching.
 * 
 * @example
 * ```tsx
 * <ProductGallery 
 *   images={[{ url: '...', alt: '...' }]} 
 *   productTitle="Product Name"
 * />
 * ```
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  productTitle: string
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter out any images with empty URLs (defensive programming)
  const validImages = images.filter(img => img?.url && img.url.trim() !== '')

  // Validate images
  if (!validImages || validImages.length === 0) {
    return (
      <div className="aspect-square bg-cream rounded-lg flex items-center justify-center">
        <p className="text-secondary">No image available</p>
      </div>
    )
  }

  const selectedImage = validImages[selectedIndex]

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={selectedIndex === 0} // Priority for first image
          className="object-cover"
        />
        
        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {selectedIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                relative aspect-square overflow-hidden rounded-lg 
                transition-all duration-200 focus-visible-ring
                ${selectedIndex === index 
                  ? 'ring-2 ring-primary scale-105' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
                }
              `}
              aria-label={`View image ${index + 1} of ${validImages.length}`}
              aria-pressed={selectedIndex === index}
            >
              <Image
                src={image.url}
                alt={`${productTitle} - Image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 25vw, 20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Keyboard Navigation Hint */}
      {validImages.length > 1 && (
        <p className="text-sm text-secondary text-center">
          Click thumbnails to view different images
        </p>
      )}
    </div>
  )
}
