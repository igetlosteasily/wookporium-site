import Link from 'next/link'
import CartTrigger from '@/components/CartTrigger'
import MobileNav from '@/components/MobileNav'

export const metadata = {
  title: 'About Us - The Wookporium',
  description: 'Learn about The Wookporium - handcrafted festival apparel and natural jewelry for the festival community.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-gray-900 font-semibold text-lg">Wookporium</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/collections/tops" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Tops
              </Link>
              <Link href="/collections/bottoms" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Bottoms
              </Link>
              <Link href="/collections/outerwear" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Outerwear
              </Link>
              <Link href="/collections/jewelry" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Jewelry
              </Link>
              <Link href="/collections/apparel" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Apparel
              </Link>
              <Link href="/collections/knick-knacks" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Knick-knacks
              </Link>
              <Link href="/links" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Links
              </Link>
              <Link href="/about" className="text-emerald-600 transition-colors font-medium">
                About Us
              </Link>
            </div>

            {/* Mobile + Desktop Cart/Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Cart */}
              <CartTrigger className="hidden md:block bg-gray-900 hover:bg-gray-800 text-white" />
              
              {/* Mobile Cart */}
              <CartTrigger className="md:hidden bg-gray-900 hover:bg-gray-800 text-white py-2 px-3" />
              
              {/* Mobile Navigation */}
              <MobileNav brandSettings={null} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-900 transition-colors mb-4 inline-block font-medium"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About The Wookporium
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handcrafted festival apparel and natural jewelry for the vibrant community of festival-goers and music lovers
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Story Section */}
          <div className="bg-white rounded-lg p-8 mb-8 border border-gray-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The Wookporium was born from a passion for the festival community and a love for handcrafted artistry. 
                We believe that festival fashion should be as unique and vibrant as the experiences that bring us together.
              </p>
              <p>
                Every piece in our collection is thoughtfully handcrafted with attention to detail and artistic flair. 
                From crocheted apparel that flows with your dance moves to natural jewelry made from pinecones and 
                organic materials, we create pieces that celebrate self-expression and creativity.
              </p>
              <p>
                Our journey began with a simple belief: festival-goers deserve clothing and accessories that are 
                as authentic and spirited as they are. Whether you are dancing under desert stars or vibing at 
                an EDM festival, our pieces are designed to move with you and reflect your unique energy.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Handcrafted</h3>
              <p className="text-gray-600">
                Every piece is lovingly made by hand with attention to detail and artistic flair that celebrates individuality.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable</h3>
              <p className="text-gray-600">
                Using natural materials and eco-friendly practices because we care about the planet that hosts our festivals.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
              <div className="text-4xl mb-4">🎪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Festival Spirit</h3>
              <p className="text-gray-600">
                Designed for the vibrant community of festival-goers, music lovers, and free spirits who dance to their own beat.
              </p>
            </div>
          </div>

          {/* What Makes Us Special */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">What Makes Us Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3">🧶 Handcrafted Apparel</h3>
                <p className="text-purple-200">
                  Our crocheted tops, flowing pants, and unique festival wear are made with traditional techniques and modern style.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3">🌲 Natural Jewelry</h3>
                <p className="text-purple-200">
                  We transform pinecones and other natural materials into beautiful, one-of-a-kind jewelry pieces.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3">✨ Unique Accessories</h3>
                <p className="text-purple-200">
                  From festival pins to custom stickers, we create the little details that make your festival look complete.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3">🎵 Community Focus</h3>
                <p className="text-purple-200">
                  Made by festival-goers, for festival-goers. We understand the culture and create pieces that truly belong.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl p-8 border border-pink-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Festival Family</h2>
            <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
              Ready to express your unique festival style? Browse our collections and find pieces that speak to your spirit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products/"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Shop All Products
              </Link>
              <Link 
                href="/collections/jewelry"
                className="border-2 border-purple-400 text-purple-200 hover:bg-purple-400 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                See Our Jewelry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}