import { getProduct, getProducts } from '@/lib/sanity'
import CartButton from '@/components/CartButton'
import CartTrigger from '@/components/CartTrigger'
import Link from 'next/link'
import { Metadata } from 'next'
import ProductImages from './ProductImages'

interface ProductPageProps {
  params: {
    slug: string
  }
}
// Generate static params for all products at build time
export async function generateStaticParams() {
    const products: { slug: { current: string } }[] = await getProducts()
    return products.map((product: { slug: { current: string } }) => ({
      slug: product.slug.current,
    }))
  }
// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - The Wookporium'
    }
  }

  return {
    title: `${product.title} - The Wookporium`,
    description: product.shortDescription || product.description || `${product.title} - Handcrafted festival apparel and accessories`,
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description,
      images: product.mainImageUrl ? [product.mainImageUrl] : [],
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  // Handle product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Sorry, we couldn't find that product.
          </p>
          <Link 
            href="/products/" 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Cart and Back Link */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/products/" 
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Back to Products
          </Link>
          <CartTrigger className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImages product={product} />

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-pink-400">
                  ${product.price}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xl text-purple-300 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              {/* Festival Attribution */}
              {product.festivalAttribution && (
                <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mb-4">
                  {product.festivalAttribution}
                </div>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-xl text-purple-200">
                {product.shortDescription}
              </p>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-sm bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <CartButton 
                product={product}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                Add to Cart - ${product.price}
              </CartButton>

              {/* Availability Status */}
              <div className="text-center">
                {product.isAvailable ? (
                  <span className="text-green-400 text-sm">✓ In Stock</span>
                ) : (
                  <span className="text-red-400 text-sm">✗ Out of Stock</span>
                )}
              </div>
            </div>

            {/* Product Details Sections */}
            <div className="space-y-6 pt-6 border-t border-white/20">
                {/* Description */}
                {product.description && Array.isArray(product.description) && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                        <div className="text-purple-200 space-y-2">
                            {product.description.map((block: { _type: string; children?: { text: string }[] }, index: number) => {
                                if (block._type === 'block' && block.children) {
                                    return (
                                        <p key={index}>
                                            {block.children.map(child => child.text).join('')}
                                        </p>
                                    )
                                }
                                return null
                            })}
                        </div>
                    </div>
                )}    

              {/* Materials */}
              {product.materials && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Materials</h3>
                  <p className="text-purple-200">{product.materials}</p>
                </div>
              )}

              {/* Care Instructions */}
              {product.careInstructions && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Care Instructions</h3>
                  <p className="text-purple-200">{product.careInstructions}</p>
                </div>
              )}

              {/* Artist Notes */}
              {product.artistNotes && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Artist Notes</h3>
                  <p className="text-purple-200 italic">{product.artistNotes}</p>
                </div>
              )}

              {/* Creation Time */}
              {product.timeToMake && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Creation Time</h3>
                  <p className="text-purple-200">{product.timeToMake}</p>
                </div>
              )}

              {/* One of a Kind Badge */}
              {product.isOneOfAKind && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                    ✨ One of a Kind
                  </h3>
                  <p className="text-yellow-200 text-sm">
                    This is a unique, handcrafted piece. Once it's gone, it's gone forever!
                  </p>
                </div>
              )}

              {/* Instagram Link */}
              {product.instagramPost && (
                <div>
                  <a 
                    href={product.instagramPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    📸 See this piece on Instagram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}