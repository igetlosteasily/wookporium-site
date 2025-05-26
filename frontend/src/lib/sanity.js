import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'xuk0sjea', // Your Sanity project ID
  dataset: 'production', // Your dataset name
  useCdn: true, // Use CDN for faster loading
  apiVersion: '2023-05-03', // Current API version
})

// Helper function to get product data for listings
export async function getProducts() {
  const query = `*[_type == "product" && isAvailable == true] {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    festivalAttribution,
    hasVariants,
    variants[] {
      priceAdjustment,
      isAvailable,
      inventory,
      "variantImageUrl": variantImage.asset->url
    }
  }`
  
  return await sanityClient.fetch(query)
}

// Helper function to get single product with full variant data INCLUDING IMAGES
export async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
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
    materials,
    careInstructions,
    artistNotes,
    timeToMake,
    isOneOfAKind,
    isAvailable,
    hasVariants,
    variantOptions {
      sizes,
      colors,
      materials,
      styles
    },
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
    }
  }`
  
  return await sanityClient.fetch(query, { slug })
}

// Helper function to get products with variant information for listing pages
export async function getProductsWithVariants() {
  const query = `*[_type == "product" && isAvailable == true] {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    festivalAttribution,
    hasVariants,
    "priceRange": {
      "min": price,
      "max": price
    },
    "availableVariants": count(variants[isAvailable == true && inventory > 0]),
    "totalStock": sum(variants[isAvailable == true].inventory)
  }`
  
  return await sanityClient.fetch(query)
}

// Helper function to check variant availability
export async function getVariantAvailability(productId, variantSku) {
  const query = `*[_type == "product" && _id == $productId][0] {
    "variant": variants[sku == $variantSku][0] {
      sku,
      inventory,
      isAvailable,
      "variantImageUrl": variantImage.asset->url
    }
  }`
  
  return await sanityClient.fetch(query, { productId, variantSku })
}

// Helper function for search with variant support
export async function searchProducts(searchTerm) {
  const query = `*[
    _type == "product" && 
    isAvailable == true && 
    (
      title match $searchTerm + "*" ||
      shortDescription match $searchTerm + "*" ||
      tags[] match $searchTerm + "*" ||
      variants[].name match $searchTerm + "*" ||
      variants[].color match $searchTerm + "*" ||
      variants[].size match $searchTerm + "*"
    )
  ] {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    hasVariants,
    "hasVariantImages": count(variants[defined(variantImage)]) > 0
  }`
  
  return await sanityClient.fetch(query, { searchTerm })
}