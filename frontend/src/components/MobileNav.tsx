'use client'

import { useState } from 'react'
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

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Dynamic colors with fallbacks
  const primaryColor = brandSettings?.primaryColor || '#111827'
  const secondaryColor = brandSettings?.secondaryColor || '#6b7280'

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
          aria-label="Toggle menu"
          style={{ 
            fontFamily: 'var(--font-body)',
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-between items-center mb-8">
            <span 
              className="text-lg font-semibold"
              style={{ 
                color: primaryColor,
                fontFamily: 'var(--font-header)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              Menu
            </span>
            <button
              onClick={closeMenu}
              className="text-gray-600 hover:text-gray-900 p-2"
              aria-label="Close menu"
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
                className="block text-lg py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={closeMenu}
                style={{
                  color: secondaryColor,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)'
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
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--font-weight-semibold)',
                borderRadius: 'var(--theme-button-radius)',
                boxShadow: 'var(--theme-button-shadow)'
              }}
            >
              🛍️ Shop All Products
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}