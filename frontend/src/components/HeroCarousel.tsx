'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface HeroImage {
  url: string
  alt?: string
}

interface HeroCarouselProps {
  images: string[] | HeroImage[]
  fallbackImage?: string
  autoAdvance?: boolean
  intervalMs?: number
  className?: string
  children?: React.ReactNode
}

export default function HeroCarousel({ 
  images, 
  fallbackImage,
  autoAdvance = true,
  intervalMs = 5000,
  className = '',
  children
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Normalize images to array of objects
  const normalizedImages = Array.isArray(images) 
    ? images.map((img, idx) => ({
        url: typeof img === 'string' ? img : img.url,
        alt: typeof img === 'string' ? `Hero image ${idx + 1}` : (img.alt || `Hero image ${idx + 1}`)
      }))
    : []

  // Add fallback image if no images provided
  const allImages = normalizedImages.length > 0 
    ? normalizedImages 
    : fallbackImage 
      ? [{ url: fallbackImage, alt: 'Hero background' }]
      : []

  const hasMultipleImages = allImages.length > 1

  useEffect(() => {
    setMounted(true)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }, [allImages.length])

  // Auto-advance functionality
  useEffect(() => {
    if (!hasMultipleImages || !autoAdvance || isHovered || !mounted) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [hasMultipleImages, autoAdvance, isHovered, intervalMs, allImages.length, mounted])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!hasMultipleImages) return
      
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [hasMultipleImages, goToPrevious, goToNext])

  if (allImages.length === 0) {
    // No images available, render content with default background
    return (
      <section 
        className={`relative py-20 px-4 themed-hero ${className}`}
        style={{
          backgroundImage: 'var(--theme-hero-gradient)',
        }}
      >
        {children}
      </section>
    )
  }

  const currentImage = allImages[currentIndex]

  return (
    <section 
      className={`relative py-20 px-4 themed-hero overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: currentImage?.url 
          ? `url(${currentImage.url})` 
          : 'var(--theme-hero-gradient)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Images with Crossfade */}
      {allImages.map((image, index) => (
        <div
          key={`bg-${index}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: mounted && index === currentIndex ? 1 : 0,
            zIndex: 1
          }}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-black/20"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Navigation Controls - Only show if multiple images */}
      {hasMultipleImages && mounted && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {allImages.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Pause/Play Button */}
          {autoAdvance && (
            <button
              onClick={() => setIsHovered(!isHovered)}
              className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isHovered ? "Resume slideshow" : "Pause slideshow"}
            >
              {isHovered ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              )}
            </button>
          )}
        </>
      )}
    </section>
  )
}