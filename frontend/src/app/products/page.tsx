import { getProducts } from '@/lib/sanity'
import CartButton from '@/components/CartButton'
import CartTrigger from '@/components/CartTrigger'
import MobileNav from '@/components/MobileNav'
import Link from 'next/link'
import Image from 'next/image'

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

export default async function ProductsPage() {
  const products: Product[] = await getProducts()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar with Mobile Support */}
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-900 transition-colors mb-4 inline-block font-medium"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of handcrafted festival apparel, natural jewelry, and unique accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              {/* Product Image */}
              {product.mainImageUrl && (
                <Link href={`/products/${product.slug.current}/`} className="aspect-square overflow-hidden block relative">
                  <Image
                    src={product.mainImageUrl}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              )}

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${product.slug.current}/`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer">
                        {product.title}
                    </h3>
                </Link>
                
                {product.shortDescription && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.festivalAttribution && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.festivalAttribution}
                    </span>
                  )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Working Add to Cart Button */}
                <CartButton 
                  product={product}
                  selectedVariant={null}
                  finalPrice={product.price}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  Add to Cart - ${product.price}
                </CartButton>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Yet</h3>
            <p className="text-xl text-gray-600 mb-8">
              Products will appear here once they are added to your Sanity CMS.
            </p>
            <Link 
              href="/"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}