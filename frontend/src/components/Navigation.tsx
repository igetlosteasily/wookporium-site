/**
 * Navigation - Mobile-first responsive navigation component
 * 
 * Features:
 * - Hamburger menu for mobile (<1024px)
 * - Horizontal menu for desktop (1024px+)
 * - Shopping cart integration with item count badge
 * - Sticky header with smooth scroll behavior
 * - Full keyboard accessibility (Tab, Enter, Escape)
 * - Close on route change for better UX
 * 
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  /** Optional CSS classes for container */
  className?: string
}

export default function Navigation({
  className = ""
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Update cart count from Snipcart - wrapped in useCallback for performance
  const updateCartCount = useCallback((): void => {
    if (typeof window !== 'undefined' && window.Snipcart) {
      const count = window.Snipcart.store.getState().cart.items.count || 0
      setCartItemCount(count)
    }
  }, []) // setCartItemCount is stable from useState

  // Listen for Snipcart events
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('snipcart.ready', updateCartCount)
      document.addEventListener('snipcart.cart.updated', updateCartCount)

      return () => {
        document.removeEventListener('snipcart.ready', updateCartCount)
        document.removeEventListener('snipcart.cart.updated', updateCartCount)
      }
    }
    return undefined
  }, [updateCartCount])

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/collections', label: 'Collections' },
    { href: '/about', label: 'About' },
  ]

  const shopCategories = [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=tops', label: 'Tops' },
    { href: '/products?category=bottoms', label: 'Bottoms' },
    { href: '/products?category=outerwear', label: 'Outerwear' },
    { href: '/products?category=headwear', label: 'Headwear' },
    { href: '/products?category=jewelry', label: 'Jewelry' },
    { href: '/products?category=accessories', label: 'Accessories' },
    { href: '/products?category=knick-knacks', label: 'Knick-knacks' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 glass-light glass-shadow transition-all duration-300 ${className}`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">

          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 focus-visible-ring rounded-lg"
          >
            <span className="text-2xl sm:text-3xl font-header font-bold text-primary">
              Wookporium
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-lg font-semibold transition-colors duration-200
                  focus-visible-ring rounded-lg px-3 py-2
                  ${pathname === link.href
                    ? 'text-primary'
                    : 'text-dark-brown hover:text-primary'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            {/* Shop Dropdown */}
            <div
              className="relative"
              onBlur={(e) => {
                // Only close if focus moves outside the dropdown component
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsShopDropdownOpen(false)
                }
              }}
            >
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className={`
                  text-lg font-semibold transition-colors duration-200
                  focus-visible-ring rounded-lg px-3 py-2 flex items-center gap-1
                  ${pathname.startsWith('/products')
                    ? 'text-primary'
                    : 'text-dark-brown hover:text-primary'
                  }
                `}
                aria-expanded={isShopDropdownOpen}
                aria-haspopup="true"
              >
                Shop
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 glass-light rounded-lg glass-shadow border-white/20 py-2 z-50">
                  {shopCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block px-4 py-2 text-dark-brown hover:bg-cream hover:text-primary transition-colors"
                      onClick={() => setIsShopDropdownOpen(false)}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Cart Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.Snipcart) {
                  window.Snipcart.api.theme.cart.open()
                }
              }}
              className="btn-primary relative min-w-[44px] min-h-[44px] flex items-center gap-2"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <CartIcon />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  aria-live="polite"
                >
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Cart Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.Snipcart) {
                  window.Snipcart.api.theme.cart.open()
                }
              }}
              className="relative p-2 text-primary hover:bg-cream rounded-lg transition-colors min-w-[44px] min-h-[44px]"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <CartIcon />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  aria-live="polite"
                >
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-dark-brown hover:bg-cream rounded-lg transition-colors min-w-[44px] min-h-[44px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && mounted && createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 lg:hidden animate-fade-in z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel - Portaled to body to escape stacking contexts */}
            <div
              id="mobile-menu"
              className="fixed top-16 left-0 right-0 bottom-0 bg-dark-brown/95 backdrop-blur-xl lg:hidden overflow-y-auto animate-slide-up z-[60]"
            >
              <div className="px-4 pt-6 pb-8 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      block text-xl font-semibold py-3 px-4 rounded-lg transition-colors
                      focus-visible-ring
                      ${pathname === link.href
                        ? 'bg-cream text-primary'
                        : 'text-warm-white hover:bg-cream hover:text-primary'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Shop Categories Section */}
                <div className="pt-4 border-t border-secondary/20">
                  <p className="text-sm font-semibold text-warm-white/70 uppercase tracking-wide mb-3 px-4">
                    Shop by Category
                  </p>
                  {shopCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={`
                        block text-lg font-semibold py-3 px-4 rounded-lg transition-colors
                        focus-visible-ring
                        ${pathname === category.href
                          ? 'bg-cream text-primary'
                          : 'text-warm-white hover:bg-cream hover:text-primary'
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>

                {/* Social Links Section */}
                <div className="pt-8 mt-8 border-t border-secondary/20">
                  <p className="text-sm font-semibold text-warm-white/70 uppercase tracking-wide mb-4">
                    Connect With Us
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/wookporium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream text-primary hover:bg-primary hover:text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Follow us on Instagram"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="https://facebook.com/wookporium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cream text-primary hover:bg-primary hover:text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Follow us on Facebook"
                    >
                      <FacebookIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
      </nav>
    </header>
  )
}

// ============================================================================
// Icon Components (Inline for performance, no external dependencies)
// ============================================================================

function MenuIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// TypeScript declaration for Snipcart global
declare global {
  interface Window {
    Snipcart?: {
      api: {
        theme: {
          cart: {
            open: () => void
          }
        }
      }
      store: {
        getState: () => {
          cart: {
            items: {
              count: number
            }
          }
        }
      }
    }
  }
}
