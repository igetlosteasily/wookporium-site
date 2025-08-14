import { getProducts } from '@/lib/sanity'
import CartButton from '@/components/CartButton'
import CartTrigger from '@/components/CartTrigger'
import MobileNav from '@/components/MobileNav'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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

interface CollectionPageProps {
  params: Promise<{
    category: string
  }>
}

// Define valid categories and their details
const COLLECTIONS = {
  'tops': {
    title: 'Tops',
    description: 'Festival tops, crop tops, and unique shirts for your journey',
    emoji: '👕',
    tags: ['top', 'shirt', 'crop', 'blouse', 'tank']
  },
  'bottoms': {
    title: 'Bottoms',
    description: 'Comfortable pants, shorts, and skirts for dancing',
    emoji: '👖',
    tags: ['bottom', 'pants', 'shorts', 'skirt', 'leggings']
  },
  'outerwear': {
    title: 'Outerwear',
    description: 'Jackets, hoodies, and layers for desert nights',
    emoji: '🧥',
    tags: ['jacket', 'hoodie', 'cardigan', 'coat', 'outerwear']
  },
  'jewelry': {
    title: 'Jewelry',
    description: 'Handmade natural jewelry from pinecones and organic materials',
    emoji: '💎',
    tags: ['jewelry', 'necklace', 'bracelet', 'earrings', 'ring', 'pinecone']
  },
  'apparel': {
    title: 'Apparel',
    description: 'Complete festival outfits and clothing sets',
    emoji: '👗',
    tags: ['dress', 'jumpsuit', 'romper', 'set', 'outfit']
  },
  'knick-knacks': {
    title: 'Knick-knacks',
    description: 'Pins, stickers, accessories, and unique festival essentials',
    emoji: '✨',
    tags: ['pin', 'sticker', 'accessory', 'bag', 'hat', 'misc']
  }
} as const

type CategoryKey = keyof typeof COLLECTIONS

// Generate static params for all valid categories
export async function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((category) => ({
    category: category,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps) {
  const resolvedParams = await params
  const category = resolvedParams.category as CategoryKey
  
  if (!COLLECTIONS[category]) {
    return {
      title: 'Collection Not Found - The Wookporium'
    }
  }

  const collection = COLLECTIONS[category]
  
  return {
    title: `${collection.title} - The Wookporium`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} Collection`,
      description: collection.description,
    }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params
  const category = resolvedParams.category as CategoryKey
  
  // Check if category exists
  if (!COLLECTIONS[category]) {
    notFound()
  }

  const collection = COLLECTIONS[category]
  const allProducts: Product[] = await getProducts()
  
  // Filter products by category tags
  const filteredProducts = allProducts.filter(product => {
    if (!product.tags) return false
    
    return product.tags.some(tag => 
      collection.tags.some(categoryTag => 
        tag.toLowerCase().includes(categoryTag.toLowerCase()) ||
        categoryTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  })

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
              <Link href="/collections/tops" className={`transition-colors font-medium ${category === 'tops' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Tops
              </Link>
              <Link href="/collections/bottoms" className={`transition-colors font-medium ${category === 'bottoms' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Bottoms
              </Link>
              <Link href="/collections/outerwear" className={`transition-colors font-medium ${category === 'outerwear' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Outerwear
              </Link>
              <Link href="/collections/jewelry" className={`transition-colors font-medium ${category === 'jewelry' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Jewelry
              </Link>
              <Link href="/collections/apparel" className={`transition-colors font-medium ${category === 'apparel' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Apparel
              </Link>
              <Link href="/collections/knick-knacks" className={`transition-colors font-medium ${category === 'knick-knacks' ? 'text-emerald-600' : 'text-gray-600 hover:text-gray-900'}`}>
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
          <div className="flex justify-center items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          
          <div className="text-6xl mb-4">{collection.emoji}</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {collection.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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

                  {/* Add to Cart Button */}
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
        ) : (
          /* No Products Message */
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No {collection.title} Yet</h3>
            <p className="text-xl text-gray-600 mb-8">
              We&apos;re working on adding amazing {collection.title.toLowerCase()} to our collection. Check back soon!
            </p>
            <Link 
              href="/products/"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}