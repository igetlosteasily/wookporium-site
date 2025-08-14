import { getProduct, getProducts } from '@/lib/sanity'
import CartTrigger from '@/components/CartTrigger'
import MobileNav from '@/components/MobileNav'
import Link from 'next/link'
import { Metadata } from 'next'
import ProductPageClient from './ProductPageClient'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  const products: { slug: { current: string } }[] = await getProducts()
  return products.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current,
  }))
}

// Generate metadata for SEO - Next.js 15 compatible
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)
  
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

// Next.js 15 compatible async component with await params
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)

  // Handle product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Sorry, we couldn&apos;t find that product.
          </p>
          <Link 
            href="/products/" 
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Cart, Back Link, and Mobile Nav */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/products/" 
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            ← Back to Products
          </Link>
          
          {/* Cart + Mobile Navigation */}
          <div className="flex items-center gap-4">
            {/* Desktop Cart */}
            <CartTrigger className="hidden md:block bg-gray-900 hover:bg-gray-800 text-white" />
            
            {/* Mobile Cart */}
            <CartTrigger className="md:hidden bg-gray-900 hover:bg-gray-800 text-white py-2 px-3" />
            
            {/* Mobile Navigation */}
            <MobileNav brandSettings={null} />
          </div>
        </div>

        {/* Pass product to client component that handles all the interactive logic */}
        <ProductPageClient product={product} />
      </div>
    </div>
  )
}