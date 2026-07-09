/**
 * Product Not Found Page
 * Displays when a product slug doesn't exist
 */

import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl md:text-5xl font-header font-bold text-dark-brown mb-4">
          Product Not Found
        </h1>
        <p className="text-xl text-secondary mb-8">
          Sorry, we couldn't find the product you're looking for. 
          It may have been sold or removed from our collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
