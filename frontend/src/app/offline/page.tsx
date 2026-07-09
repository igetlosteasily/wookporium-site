/**
 * Offline Page - PWA fallback when network is unavailable
 * 
 * Displays a friendly message when users lose connectivity at festivals.
 * Part of the PWA offline-first strategy for reliable festival experiences.
 */

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offline - Wookporium',
  description: 'You are currently offline. We\'ll be back when you reconnect!',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="text-8xl mb-6" role="img" aria-label="Offline indicator">
          📡
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl font-header font-bold text-dark-brown mb-4">
          You're Offline
        </h1>
        
        {/* Description */}
        <p className="text-lg text-secondary mb-6">
          Don't worry! When you're back online, we'll be right here with all the festival fashion goodness you love.
        </p>
        
        {/* Pro Tip Box */}
        <div className="bg-cream p-6 rounded-lg mb-8">
          <p className="text-sm text-secondary-dark mb-2">
            💡 <strong>Pro tip:</strong> Pages you've recently visited are saved for offline viewing!
          </p>
          <p className="text-sm text-secondary-dark">
            Try browsing your recently viewed products - they should still work.
          </p>
        </div>
        
        {/* Action Button */}
        <Link
          href="/"
          className="btn-primary inline-block"
        >
          Try Reloading Homepage
        </Link>
        
        {/* Additional Context */}
        <p className="text-sm text-secondary mt-8">
          Having issues? Your connection might be restored soon. Check your device's network settings.
        </p>
      </div>
    </div>
  )
}
