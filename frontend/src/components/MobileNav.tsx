'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

interface BrandSettings {
  primaryColor?: string
  secondaryColor?: string
  headerFont?: string
  bodyFont?: string
}

interface MobileNavProps {
  brandSettings?: BrandSettings | null
}

export default function MobileNav({ brandSettings }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Dynamic colors with fallbacks
  const primaryColor = brandSettings?.primaryColor || '#111827'
  const secondaryColor = brandSettings?.secondaryColor || '#6b7280'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const mobileNavContent = (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
          style={{ 
            zIndex: 9998,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      )}

      {/* Mobile Menu Sidebar - PORTAL ISOLATED */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '320px',
          backgroundColor: '#ffffff',
          backgroundImage: 'none',
          background: '#ffffff',
          zIndex: 9999,
          isolation: 'isolate',
          contain: 'strict',
          willChange: 'transform',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Triple-layer background protection */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            backgroundImage: 'none',
            background: '#ffffff',
            zIndex: 1
          }}
        />
        
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            zIndex: 2
          }}
        />
        
        <div 
          className="h-full overflow-y-auto"
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            backgroundColor: '#ffffff',
            padding: '1.5rem'
          }}
        >
          {/* Close button */}
          <div className="flex justify-between items-center mb-8">
            <span 
              className="text-lg font-semibold"
              style={{ 
                color: primaryColor,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '600'
              }}
            >
              Menu
            </span>
            <button
              onClick={closeMenu}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Close menu"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { href: '/collections/tops', label: '👕 Tops' },
              { href: '/collections/bottoms', label: '👖 Bottoms' },
              { href: '/collections/outerwear', label: '🧥 Outerwear' },
              { href: '/collections/jewelry', label: '💎 Jewelry' },
              { href: '/collections/apparel', label: '👗 Apparel' },
              { href: '/collections/knick-knacks', label: '✨ Knick-knacks' },
              { href: '/links', label: '🔗 Links' },
              { href: '/about', label: 'ℹ️ About Us' }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block text-lg py-3 px-4 rounded-lg transition-colors border-b border-gray-100"
                onClick={closeMenu}
                style={{
                  color: secondaryColor,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '500',
                  backgroundColor: 'transparent',
                  display: 'block',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              href="/products/"
              className="block w-full text-center py-3 px-4 rounded-lg transition-all duration-300"
              onClick={closeMenu}
              style={{
                backgroundColor: primaryColor,
                color: 'white',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: '600',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              🛍️ Shop All Products
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
          aria-label="Toggle menu"
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            ) : (
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            )}
          </svg>
        </button>
      </div>

      {/* Portal-rendered mobile nav - completely isolated from theme system */}
      {mounted && createPortal(mobileNavContent, document.body)}
    </>
  )
}