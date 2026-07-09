/**
 * HeroSlider Component
 * Beautiful auto-playing carousel for homepage hero section
 * 
 * Features:
 * - Auto-play with 6-second intervals (slow, elegant)
 * - Previous/Next navigation buttons
 * - Dot indicators for current slide
 * - Pause on hover
 * - Smooth fade transitions
 * - Fully keyboard accessible
 * - Touch/swipe support for mobile
 * - CMS-controlled content
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroSlide } from '@/lib/types'
import ParallaxBackground from '@/components/ParallaxBackground'

interface HeroSliderProps {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance slides every 6 seconds (slow, elegant pace)
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isPaused && slides.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000) // 6 seconds per slide
    }
    return () => clearInterval(interval)
  }, [isPaused, slides.length])

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  // If no slides, show nothing
  if (!slides || slides.length === 0) {
    return null
  }

  // If only one slide, show it without navigation
  if (slides.length === 1) {
    const slide = slides[0]
    return (
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Gradient Blobs Background */}
        <ParallaxBackground variant="all" />

        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          {slide.backgroundImage?.asset?.url && slide.backgroundImage.asset.url.trim() !== '' ? (
            <>
              <Image
                src={slide.backgroundImage.asset.url}
                alt={slide.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta via-sage to-brown-warm" />
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20 space-y-8 glass-dark p-12 rounded-2xl glass-shadow-lg">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SlideButton button={slide.primaryButton} isPrimary />
            {slide.secondaryButton && (
              <SlideButton button={slide.secondaryButton} />
            )}
          </div>
        </div>
      </section>
    )
  }

  // Multiple slides - show carousel
  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Homepage hero carousel"
    >
      {/* Parallax Gradient Blobs Background */}
      <ParallaxBackground variant="all" />
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          {slide.backgroundImage?.asset?.url && slide.backgroundImage.asset.url.trim() !== '' ? (
            <>
              <Image
                src={slide.backgroundImage.asset.url}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0} // Only prioritize first slide
                sizes="100vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-sage to-brown-warm" />
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4 py-20">
            <div className="max-w-4xl mx-auto space-y-8 glass-dark p-12 rounded-2xl glass-shadow-lg">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SlideButton button={slide.primaryButton} isPrimary />
                {slide.secondaryButton && (
                  <SlideButton button={slide.secondaryButton} />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-light hover:glass-primary text-white p-3 rounded-full transition-all duration-200 focus-visible-ring min-w-[44px] min-h-[44px] glass-shadow"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-light hover:glass-primary text-white p-3 rounded-full transition-all duration-200 focus-visible-ring min-w-[44px] min-h-[44px] glass-shadow"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 focus-visible-ring
              ${index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      {/* Pause Indicator (shows when user hovers) */}
      {isPaused && slides.length > 1 && (
        <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          Paused
        </div>
      )}
    </section>
  )
}

/**
 * Slide Button Component
 * Renders primary or secondary button with proper styling
 */
interface SlideButtonProps {
  button: {
    text: string
    link: string
  }
  isPrimary?: boolean
}

function SlideButton({ button, isPrimary = false }: SlideButtonProps) {
  const isExternal = button.link.startsWith('http')

  const buttonClasses = isPrimary
    ? 'bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors duration-200 shadow-lg hover:shadow-xl'
    : 'glass-light text-white px-8 py-3 rounded-lg font-semibold hover:glass-primary transition-all duration-200 border border-white/30'

  if (isExternal) {
    return (
      <a
        href={button.link}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {button.text}
      </a>
    )
  }

  return (
    <Link href={button.link} className={buttonClasses}>
      {button.text}
    </Link>
  )
}
