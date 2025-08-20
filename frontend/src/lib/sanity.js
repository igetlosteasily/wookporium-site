import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'k3xyl4wr',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

// Existing product functions
export async function getProducts() {
  return client.fetch(`*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    festivalAttribution
  }`)
}

export async function getProduct(slug) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    price,
    compareAtPrice,
    inventory,
    "mainImageUrl": mainImage.asset->url,
    "galleryImages": gallery[].asset->url,
    tags,
    festivalAttribution,
    instagramPost,
    hasVariants,
    variantOptions,
    variants[] {
      sku,
      name,
      size,
      color,
      material,
      style,
      priceAdjustment,
      inventory,
      isAvailable,
      "variantImageUrl": variantImage.asset->url
    },
    materials,
    careInstructions,
    timeToMake,
    artistNotes,
    isOneOfAKind,
    isAvailable
  }`, { slug })
}

// Brand Settings functions with hero images
export async function getBrandSettings() {
  return client.fetch(`*[_type == "brandSettings"][0] {
    "logoUrl": logo.asset->url,
    logoText,
    logoIcon,
    "primaryColor": primaryColor.hex,
    "secondaryColor": secondaryColor.hex,
    "backgroundColor": backgroundColor.hex,
    "sectionBackgroundColor": sectionBackgroundColor.hex,
    heroTitle,
    heroSubtitle,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    "heroImages": heroImages[] {
      "url": asset->url,
      alt
    },
    themeStyle,
    buttonStyle,
    headerFont,
    bodyFont,
    fontWeightStyle,
    featuredProducts[]-> {
      _id,
      title,
      slug,
      shortDescription,
      "mainImageUrl": mainImage.asset->url,
      price,
      tags,
      festivalAttribution
    }
  }`)
}

// Homepage content function
export async function getHomepageContent() {
  return client.fetch(`*[_type == "homepageContent"][0] {
    valuesSectionTitle,
    values[] {
      emoji,
      title,
      description
    },
    collectionsSectionTitle,
    collections[] {
      emoji,
      title,
      description,
      linkUrl
    },
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    footerDescription
  }`)
}

// NEW: About page content function
export async function getAboutPageContent() {
  return client.fetch(`*[_type == "aboutPageContent"][0] {
    pageTitle,
    pageSubtitle,
    storyTitle,
    storyContent[] {
      paragraph
    },
    values[] {
      emoji,
      title,
      description
    },
    specialSectionTitle,
    specialItems[] {
      icon,
      title,
      description
    },
    ctaTitle,
    ctaDescription,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl
  }`)
}

// NEW: Links page content function
export async function getLinksPageContent() {
  return client.fetch(`*[_type == "linksPageContent"][0] {
    pageTitle,
    pageDescription,
    linkCategories[] {
      title,
      emoji,
      links[] {
        name,
        url,
        description
      }
    },
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonUrl,
    disclaimerText
  }`)
}

// Complete homepage data with better featured products handling
export async function getCompleteHomepageData() {
  const [brandSettings, homepageContent, products] = await Promise.all([
    getBrandSettings(),
    getHomepageContent(),
    getProducts()
  ])
  
  // Use featured products from brand settings if available, otherwise fallback to recent products
  const featuredProducts = brandSettings?.featuredProducts && brandSettings.featuredProducts.length > 0
    ? brandSettings.featuredProducts
    : products.slice(0, 6) // First 6 as fallback featured
  
  return {
    brandSettings,
    homepageContent,
    featuredProducts,
    newArrivals: products.slice(0, 4) // First 4 as new arrivals
  }
}