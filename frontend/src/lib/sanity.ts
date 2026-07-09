/**
 * Sanity CMS Client & Data Fetching
 * All queries with proper error handling and fallbacks
 */

import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type {
  Business,
  Product,
  Review,
  ProductListItem,
  ReviewListItem,
  AboutPage,
  HeroSlide,
  FeaturedCollection
} from './types'

// Initialize Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7iiji3rf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: true, // Use CDN for faster reads
})

// Image URL builder for optimized images
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

/**
 * Get Business Information
 * Returns single business info document or null
 */
export async function getBusinessInfo(): Promise<Business | null> {
  try {
    const business = await client.fetch<Business>(
      `*[_type == "business"][0] {
        _id,
        brandName,
        tagline,
        logo {
          asset-> {
            url
          }
        },
        brandStory,
        heroTitle,
        heroSubtitle,
        heroImage {
          asset-> {
            url
          }
        },
        homepageIntro,
        instagramHandle,
        facebookUrl,
        tiktokHandle,
        email,
        seoDescription,
        seoKeywords
      }`
    )
    return business || null
  } catch (error) {
    console.error('Failed to fetch business info:', error)
    return null
  }
}

/**
 * Get All Products (for product grid)
 * Returns array of products with simplified data for performance
 */
export async function getProducts(): Promise<ProductListItem[]> {
  try {
    const products = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`
    )
    return products || []
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

/**
 * Get Featured Products (for homepage)
 * Returns products marked as featured
 */
export async function getFeaturedProducts(): Promise<ProductListItem[]> {
  try {
    const products = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true && featured == true] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`
    )
    return products || []
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    return []
  }
}

/**
 * Get Products by Category
 * Returns products filtered by category
 */
export async function getProductsByCategory(category: string): Promise<ProductListItem[]> {
  try {
    const products = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true && category == $category] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,
      { category }
    )
    return products || []
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error)
    return []
  }
}

/**
 * Get Single Product by Slug
 * Returns full product details or null
 */
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch<Product>(
      `*[_type == "product" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        price,
        compareAtPrice,
        inventory,
        isAvailable,
        mainImage {
          asset-> {
            url
          }
        },
        gallery[] {
          asset-> {
            url
          }
        },
        category,
        tags,
        festivalAttribution,
        featured,
        isOneOfAKind,
        materials,
        careInstructions,
        weight,
        hasVariants,
        variants[] {
          variantName,
          sku,
          priceAdjustment,
          inventory,
          variantImage {
            asset-> {
              url
            }
          }
        },
        seoTitle,
        seoDescription
      }`,
      { slug }
    )
    return product || null
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error)
    return null
  }
}

/**
 * Get Featured Reviews (for homepage)
 * Returns reviews marked as featured
 */
export async function getFeaturedReviews(): Promise<ReviewListItem[]> {
  try {
    const reviews = await client.fetch<ReviewListItem[]>(
      `*[_type == "review" && featured == true] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        "customerPhotoUrl": customerPhoto.asset->url,
        festivalContext
      }`
    )
    return reviews || []
  } catch (error) {
    console.error('Failed to fetch featured reviews:', error)
    return []
  }
}

/**
 * Get All Reviews
 * Returns all reviews ordered by date
 */
export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await client.fetch<Review[]>(
      `*[_type == "review"] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        product->{
          _id,
          title,
          slug
        },
        customerPhoto {
          asset-> {
            url
          }
        },
        reviewDate,
        featured,
        verified,
        festivalContext
      }`
    )
    return reviews || []
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return []
  }
}

/**
 * Get Reviews for Specific Product
 * Returns reviews linked to a product
 */
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const reviews = await client.fetch<Review[]>(
      `*[_type == "review" && product._ref == $productId] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        customerPhoto {
          asset-> {
            url
          }
        },
        reviewDate,
        featured,
        verified,
        festivalContext
      }`,
      { productId }
    )
    return reviews || []
  } catch (error) {
    console.error(`Failed to fetch reviews for product ${productId}:`, error)
    return []
  }
}

/**
 * Get Related Products
 * Returns 4 related products based on same category, randomized for freshness
 * Falls back to featured products if not enough in category
 * 
 * @param currentProductId - ID of the current product to exclude
 * @param category - Category to match
 * @returns Array of up to 4 related products
 */
export async function getRelatedProducts(
  currentProductId: string,
  category: string
): Promise<ProductListItem[]> {
  try {
    // Get products from same category, excluding current product
    const sameCategoryProducts = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true && category == $category && _id != $currentProductId] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,
      { category, currentProductId }
    )

    // Shuffle for variety (Fisher-Yates shuffle)
    const shuffled = [...(sameCategoryProducts || [])]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // If we have enough from same category, return 4
    if (shuffled.length >= 4) {
      return shuffled.slice(0, 4)
    }

    // Not enough? Add featured products from other categories
    const featuredProducts = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true && featured == true && _id != $currentProductId] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,
      { currentProductId }
    )

    // Combine and deduplicate
    const combined = [...shuffled]
    const existingIds = new Set(shuffled.map(p => p._id))

    for (const product of (featuredProducts || [])) {
      if (!existingIds.has(product._id) && combined.length < 4) {
        combined.push(product)
        existingIds.add(product._id)
      }
    }

    return combined.slice(0, 4)
  } catch (error) {
    console.error(`Failed to fetch related products:`, error)
    return []
  }
}

/**
 * Get Complete Homepage Data
 * Fetches all data needed for homepage in one go
 */
export async function getHomepageData(): Promise<{
  business: Business | null
  featuredProducts: ProductListItem[]
  featuredReviews: ReviewListItem[]
}> {
  try {
    const [business, featuredProducts, featuredReviews] = await Promise.all([
      getBusinessInfo(),
      getFeaturedProducts(),
      getFeaturedReviews(),
    ])

    return {
      business,
      featuredProducts,
      featuredReviews,
    }
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
    return {
      business: null,
      featuredProducts: [],
      featuredReviews: [],
    }
  }
}

/**
 * Get About Page Content
 * Fetches CMS-controlled About page data
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const query = `*[_type == "aboutPage"][0] {
      _id,
      heroHeading,
      heroSubheading,
      heroImage {
        asset-> {
          url
        }
      },
      storyHeading,
      storyContent,
      storyImage {
        asset-> {
          url
        }
      },
      missionHeading,
      missionPoints[] {
        icon,
        heading,
        description
      },
      processHeading,
      processContent,
      processImages[] {
        asset-> {
          url
        }
      },
      contactHeading,
      contactText,
      showSocialLinks,
      seoTitle,
      seoDescription
    }`

    const aboutPage = await client.fetch<AboutPage>(query)
    return aboutPage || null
  } catch (error) {
    console.error('Failed to fetch about page:', error)
    return null
  }
}

/**
 * Get Hero Slides
 * Fetches active hero slides for homepage carousel, ordered by display order
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const slides = await client.fetch<HeroSlide[]>(
      `*[_type == "heroSlide" && isActive == true] | order(order asc) {
        _id,
        title,
        subtitle,
        backgroundImage {
          asset-> {
            url
          }
        },
        primaryButton,
        secondaryButton,
        order,
        isActive
      }`
    )
    return slides || []
  } catch (error) {
    console.error('Failed to fetch hero slides:', error)
    return []
  }
}

/**
 * Get Homepage Featured Collection
 * Fetches the single collection marked as featured for homepage spotlight
 * Returns the collection with simplified data for performance
 */
export async function getHomepageFeaturedCollection(): Promise<FeaturedCollection | null> {
  try {
    const collection = await client.fetch<FeaturedCollection>(
      `*[_type == "featuredCollection" && isActive == true] | order(isFeatured desc, eventStartDate asc)[0] {
        _id,
        name,
        slug,
        festivalTag,
        vibeDescription,
        customHeroImage {
          asset-> {
            url
          }
        },
        eventStartDate,
        eventEndDate,
        isFeatured
      }`
    )
    return collection || null
  } catch (error) {
    console.error('Failed to fetch homepage featured collection:', error)
    return null
  }
}

/**
 * Get All Featured Collections
 * Fetches active collections ordered by display order
 */
export async function getFeaturedCollections(): Promise<FeaturedCollection[]> {
  try {
    const collections = await client.fetch<FeaturedCollection[]>(
      `*[_type == "featuredCollection" && isActive == true] | order(order asc) {
        _id,
        name,
        slug,
        festivalTag,
        vibeDescription,
        customHeroImage {
          asset-> {
            url
          }
        },
        eventStartDate,
        eventEndDate,
        isActive,
        isFeatured,
        order
      }`
    )
    return collections || []
  } catch (error) {
    console.error('Failed to fetch featured collections:', error)
    return []
  }
}

/**
 * Get Single Featured Collection by Slug
 * Fetches complete collection data with Marina's picks
 */
export async function getFeaturedCollection(slug: string): Promise<FeaturedCollection | null> {
  try {
    const collection = await client.fetch<FeaturedCollection>(
      `*[_type == "featuredCollection" && slug.current == $slug && isActive == true][0] {
        _id,
        name,
        slug,
        festivalTag,
        curatorsNote,
        vibeDescription,
        officialUrl,
        eventStartDate,
        eventEndDate,
        customHeroImage {
          asset-> {
            url
          }
        },
        marinasPicks[]-> {
          _id,
          title,
          slug,
          price,
          mainImage {
            asset-> {
              url
            }
          }
        },
        festivalTips[] {
          tip,
          icon
        },
        hashtags,
        themeColor,
        isActive,
        isFeatured,
        order,
        seoTitle,
        seoDescription
      }`,
      { slug }
    )
    return collection || null
  } catch (error) {
    console.error(`Failed to fetch collection with slug ${slug}:`, error)
    return null
  }
}

/**
 * Get Products by Festival Tag
 * Fetches products matching a specific festival attribution
 */
export async function getProductsByFestivalTag(tag: string): Promise<ProductListItem[]> {
  try {
    const products = await client.fetch<ProductListItem[]>(
      `*[_type == "product" && isAvailable == true && festivalAttribution == $tag] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,
      { tag } as any
    )
    return products || []
  } catch (error) {
    console.error(`Failed to fetch products for festival tag ${tag}:`, error)
    return []
  }
}
