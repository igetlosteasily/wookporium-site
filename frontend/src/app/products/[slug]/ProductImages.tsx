'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Product {
  mainImageUrl: string;
  title: string;
  galleryImages?: string[];
}

export default function ProductImages({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.mainImageUrl || '')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Combine main image + gallery for easy selection
  const allImages = [
    product.mainImageUrl,
    ...(product.galleryImages || [])
  ].filter(Boolean)

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 relative">
        <Image
          src={selectedImage}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Gallery Thumbnails - only show after mount */}
      {mounted && allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {allImages.map((imageUrl, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(imageUrl)}
              className={`aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                selectedImage === imageUrl 
                  ? 'ring-2 ring-pink-400 bg-pink-500/20' 
                  : 'bg-white/10 hover:bg-white/20'
              } backdrop-blur-md border border-white/20 relative`}
            >
              <Image
                src={imageUrl}
                alt={`${product.title} - Image ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}