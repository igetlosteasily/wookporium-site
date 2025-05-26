import { getProducts } from '@/lib/sanity'
import CartButton from '@/components/CartButton'
import CartTrigger from '@/components/CartTrigger'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Cart */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <CartTrigger className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            The Wookporium
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Handcrafted festival apparel, natural jewelry, and unique accessories for your journey
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
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
                    <h3 className="text-xl font-semibold text-white mb-2 hover:text-pink-300 transition-colors cursor-pointer">
                        {product.title}
                    </h3>
                </Link>
                
                {product.shortDescription && (
                  <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-pink-400">
                    ${product.price}
                  </span>
                  {product.festivalAttribution && (
                    <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
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
                        className="text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add to Cart Button */}
                <CartButton 
                  product={product}
                  finalPrice={product.price}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
            <p className="text-xl text-purple-300">
              No products available at the moment. Check back soon for amazing festival gear!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}