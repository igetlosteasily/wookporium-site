import Link from 'next/link'

export default function OfflinePage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            You&apos;re Offline
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            No worries! You can still browse the products you&apos;ve already seen.
          </p>
          <p className="text-purple-300 mb-8">
            When you get signal back, everything will sync up perfectly.
          </p>
          <Link 
            href="/products/" 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Browse Cached Products
          </Link>
        </div>
      </div>
    )
  }