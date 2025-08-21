import Link from 'next/link'
import Image from 'next/image'
import CartButton from '@/components/CartButton'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  price: number
  mainImageUrl: string
  tags?: string[]
  festivalAttribution?: string
}

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  primaryColor?: string
}

export default function FeaturedProducts({ 
  products, 
  title = "Featured Products",
  primaryColor = '#111827',
}: FeaturedProductsProps) {
  
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 themed-section">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 
            className="text-4xl themed-heading"
            style={{ 
              color: primaryColor,
              fontFamily: 'var(--font-header)',
              fontWeight: 'var(--font-weight-bold)'
            }}
          >
            {title}
          </h2>
          <Link 
            href="/products/" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden transition-all themed-card"
              style={{
                background: 'var(--theme-card-background)',
                borderRadius: 'var(--theme-card-radius)',
                boxShadow: 'var(--theme-card-shadow)',
                transitionDuration: 'var(--theme-animation-speed)'
              }}
            >
              {/* Product Image */}
              {product.mainImageUrl && (
                <Link href={`/products/${product.slug.current}/`} className="aspect-square overflow-hidden block relative">
                  <Image
                    src={product.mainImageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              )}
              
              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${product.slug.current}/`}>
                  <h3 
                    className="text-xl text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer line-clamp-2"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)'
                    }}
                  >
                    {product.title}
                  </h3>
                </Link>
                
                {product.shortDescription && (
                  <p 
                    className="text-gray-600 text-sm mb-4 line-clamp-2"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-normal)'
                    }}
                  >
                    {product.shortDescription}
                  </p>
                )}

                {/* Price and Festival Attribution */}
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-2xl"
                    style={{ 
                      color: primaryColor,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    ${product.price}
                  </span>
                  {product.festivalAttribution && (
                    <span 
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontWeight: 'var(--font-weight-normal)',
                        borderRadius: 'var(--theme-radius)'
                      }}
                    >
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
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 border border-gray-200"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-normal)',
                          borderRadius: 'var(--theme-radius)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add to Cart Button */}
                <CartButton 
                  product={product}
                  selectedVariant={null}
                  finalPrice={product.price}
                  className="w-full text-white font-semibold py-3 px-6 transition-all transform themed-button-primary"
                >
                  Add to Cart - ${product.price}
                </CartButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}