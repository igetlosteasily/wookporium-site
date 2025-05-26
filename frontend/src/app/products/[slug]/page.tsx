import { getProduct, getProducts } from '@/lib/sanity'
import CartTrigger from '@/components/CartTrigger'
import Link from 'next/link'
import { Metadata } from 'next'
import ProductPageClient from './ProductPageClient'

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
            Sorry, we couldn&apos;t find that product.
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

        {/* Pass product to client component that handles all the interactive logic */}
        <ProductPageClient product={product} />
      </div>
    </div>
  )
}