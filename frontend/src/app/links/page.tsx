import Link from 'next/link'
import CartTrigger from '@/components/CartTrigger'
import MobileNav from '@/components/MobileNav'
import { getLinksPageContent, getBrandSettings } from '@/lib/sanity'

// Define types for the CMS content
interface LinkItem {
  name: string
  url: string
  description: string
}

interface LinkCategory {
  title: string
  emoji: string
  links: LinkItem[]
}

interface LinksPageContent {
  pageTitle: string
  pageDescription: string
  linkCategories: LinkCategory[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonUrl: string
  disclaimerText: string
}

export async function generateMetadata() {
  const content = await getLinksPageContent()
  
  return {
    title: `${content?.pageTitle || 'Links'} - The Wookporium`,
    description: content?.pageDescription || 'Useful links for festival-goers, music lovers, and the festival community.',
  }
}

export default async function LinksPage() {
  // Fetch content from CMS
  const [content, brandSettings] = await Promise.all([
    getLinksPageContent(),
    getBrandSettings()
  ])

  // Fallback content if CMS content is not available
  const defaultContent: LinksPageContent = {
    pageTitle: 'Useful Links',
    pageDescription: 'Curated resources for festival-goers, music lovers, and the vibrant community we\'re all part of',
    linkCategories: [
      {
        title: 'Festival Resources',
        emoji: '🎪',
        links: [
          { name: 'Festival Safety Tips', url: 'https://festivalguide.com/safety', description: 'Essential safety information for festival-goers' },
          { name: 'Packing Lists', url: 'https://festivalguide.com/packing', description: 'Complete festival packing checklists' },
          { name: 'Festival Calendar', url: 'https://festivalcalendar.com', description: 'Find upcoming festivals worldwide' },
          { name: 'Weather Preparation', url: 'https://festivalweather.com', description: 'Weather tips and gear recommendations' }
        ]
      },
      {
        title: 'Music & EDM',
        emoji: '🎵',
        links: [
          { name: 'EDM.com', url: 'https://edm.com', description: 'Latest EDM news and artist updates' },
          { name: 'SoundCloud', url: 'https://soundcloud.com', description: 'Discover new music and emerging artists' },
          { name: 'Beatport', url: 'https://beatport.com', description: 'Electronic music downloads and charts' },
          { name: 'Resident Advisor', url: 'https://ra.co', description: 'Electronic music events and culture' }
        ]
      }
    ],
    ctaTitle: 'Ready to Festival in Style?',
    ctaDescription: 'Check out our handcrafted apparel and natural jewelry collection',
    ctaButtonText: 'Shop The Wookporium',
    ctaButtonUrl: '/products/',
    disclaimerText: 'External links are provided for convenience. The Wookporium is not responsible for external content.'
  }

  // Use CMS content if available, otherwise use defaults
  const pageContent = content || defaultContent

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar - FORCED SOLID WHITE */}
      <nav 
        className="sticky top-0 z-50 border-b border-gray-200 shadow-sm"
        style={{ 
          backgroundColor: '#ffffff !important',
          backdropFilter: 'none'
        }}
      >
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
              <Link href="/collections/tops" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Tops
              </Link>
              <Link href="/collections/bottoms" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Bottoms
              </Link>
              <Link href="/collections/outerwear" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Outerwear
              </Link>
              <Link href="/collections/jewelry" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Jewelry
              </Link>
              <Link href="/collections/apparel" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Apparel
              </Link>
              <Link href="/collections/knick-knacks" className="text-gray-900 hover:text-gray-600 transition-colors font-medium">
                Knick-knacks
              </Link>
              <Link href="/links" className="text-emerald-600 transition-colors font-medium">
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
              <MobileNav brandSettings={brandSettings} />
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
            {pageContent.pageTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageContent.pageDescription}
          </p>
        </div>

        {/* Links Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pageContent.linkCategories.map(
              (
              category: LinkCategory, 
              categoryIndex: number
              ) => (
              <div
              key={categoryIndex}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.links.map(
                (
                  link: LinkItem, 
                  linkIndex: number
                ) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                >
                  <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                    {link.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    {link.description}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors ml-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  </div>
                </a>
                ))}
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-gray-50 rounded-lg p-8 border border-gray-200 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.ctaTitle}</h2>
          <p className="text-gray-600 mb-6">
            {pageContent.ctaDescription}
          </p>
          <Link 
            href={pageContent.ctaButtonUrl}
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-block"
          >
            {pageContent.ctaButtonText}
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8 text-purple-400 text-sm">
          <p>
            {pageContent.disclaimerText}
          </p>
        </div>
      </div>
    </div>
  )
}