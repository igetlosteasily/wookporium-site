/**
 * Collection Not Found Page
 * Shown when collection doesn't exist or is inactive
 */

import Link from 'next/link'

export default function CollectionNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream-light px-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6">🎪</div>
        <h1 className="text-6xl font-bold text-brown-warm mb-4 font-serif">
          Collection Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This collection might be from a past festival, or it's still being curated!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="bg-sage text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage/90 transition-colors duration-200"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </main>
  )
}
