import { getProducts } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import CartTrigger from '@/components/CartTrigger'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  price: number
  mainImageUrl: string
  tags: string[]
  festivalAttribution?: string
}

export default async function HomePage() {
  // Get recent products for featured sections
  const allProducts: Product[] = await getProducts()
  const featuredProducts = allProducts.slice(0, 6) // First 6 for featured
  const newArrivals = allProducts.slice(0, 4) // First 4 for new arrivals

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

            {/* Navigation Links */}
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                About Us
              </Link>
            </div>

            {/* Cart */}
            <CartTrigger className="bg-gray-900 hover:bg-gray-800 text-white" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            The Wookporium
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Handcrafted festival apparel, natural jewelry, and unique accessories for your journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products/"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Shop All Products ✨
            </Link>
            <Link 
              href="/collections/jewelry"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-4 px-8 rounded-lg transition-all duration-300"
            >
              Handmade Jewelry
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold text-gray-900">New Arrivals</h2>
              <Link 
                href="/products/" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  {product.mainImageUrl && (
                    <Link href={`/products/${product.slug.current}/`} className="aspect-square overflow-hidden block relative">
                      <Image
                        src={product.mainImageUrl}
                        alt={product.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </Link>
                  )}
                  
                  <div className="p-4">
                    <Link href={`/products/${product.slug.current}/`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.festivalAttribution && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {product.festivalAttribution}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Collections */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Festival Apparel */}
            <Link href="/collections/apparel" className="group">
              <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4">👕</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Festival Apparel</h3>
                <p className="text-gray-600 mb-4">Handcrafted clothing perfect for EDM festivals and desert burns</p>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Shop Collection →</span>
              </div>
            </Link>

            {/* Natural Jewelry */}
            <Link href="/collections/jewelry" className="group">
              <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Natural Jewelry</h3>
                <p className="text-gray-600 mb-4">Handmade pieces from pinecones and natural materials</p>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Shop Collection →</span>
              </div>
            </Link>

            {/* Unique Accessories */}
            <Link href="/collections/knick-knacks" className="group">
              <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Unique Accessories</h3>
                <p className="text-gray-600 mb-4">Pins, stickers, and one-of-a-kind festival essentials</p>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Shop Collection →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Festival Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Handcrafted</h3>
              <p className="text-gray-600">Every piece is lovingly made by hand with attention to detail and artistic flair</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable</h3>
              <p className="text-gray-600">Using natural materials and eco-friendly practices for a better planet</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Festival Spirit</h3>
              <p className="text-gray-600">Designed for the vibrant community of festival-goers and music lovers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl">Wookporium</span>
          </Link>
          
          <p className="text-gray-600 mb-4">
            Handcrafted festival apparel and accessories for your journey
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">About Us</Link>
            <Link href="/links" className="hover:text-gray-900 transition-colors">Links</Link>
            <Link href="/products" className="hover:text-gray-900 transition-colors">All Products</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}