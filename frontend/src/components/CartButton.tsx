'use client'

/**
 * Cart Button Component
 * Triggers Snipcart cart modal
 */

import { useEffect, useState, useCallback } from 'react'

interface CartButtonProps {
  className?: string
}

export default function CartButton({ className = '' }: CartButtonProps) {
  const [itemCount, setItemCount] = useState<number>(0)

  // Update cart count from Snipcart - wrapped in useCallback for performance
  const updateCartCount = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).Snipcart) {
      const count = (window as any).Snipcart.store.getState().cart.items.count
      setItemCount(count || 0)
    }
  }, []) // setItemCount is stable from useState

  // Listen for Snipcart events
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('snipcart.ready', updateCartCount)
      document.addEventListener('snipcart.cart.updated', updateCartCount)
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('snipcart.ready', updateCartCount)
        document.removeEventListener('snipcart.cart.updated', updateCartCount)
      }
    }
  }, [updateCartCount])

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).Snipcart) {
      ;(window as any).Snipcart.api.theme.cart.open()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>

      {/* Cart Text (Desktop Only) */}
      <span className="hidden sm:inline font-semibold">Cart</span>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
