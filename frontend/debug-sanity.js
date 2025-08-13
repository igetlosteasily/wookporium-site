// Create this file: frontend/debug-sanity.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'k3xyl4wr',
  dataset: 'production',
  useCdn: false, // Use false for debugging to get fresh data
  apiVersion: '2023-05-03',
})

async function debugSanity() {
  console.log('🔍 Testing Sanity connection...')
  console.log('Project ID:', 'k3xyl4wr')
  console.log('Dataset:', 'production')
  
  try {
    // Test 1: Basic connection
    console.log('\n📡 Test 1: Basic connection')
    const allDocs = await client.fetch('*[0..5]')
    console.log('Total documents found:', allDocs.length)
    
    // Test 2: Find products
    console.log('\n📦 Test 2: Find all products')
    const allProducts = await client.fetch('*[_type == "product"]')
    console.log('Products found:', allProducts.length)
    
    if (allProducts.length > 0) {
      console.log('First product structure:', JSON.stringify(allProducts[0], null, 2))
    }
    
    // Test 3: Find available products
    console.log('\n✅ Test 3: Find available products')
    const availableProducts = await client.fetch('*[_type == "product" && isAvailable == true]')
    console.log('Available products found:', availableProducts.length)
    
    // Test 4: Your actual query
    console.log('\n🎯 Test 4: Your frontend query')
    const frontendQuery = `*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
      _id,
      title,
      slug,
      shortDescription,
      price,
      "mainImageUrl": mainImage.asset->url,
      tags,
      festivalAttribution
    }`
    
    const frontendResults = await client.fetch(frontendQuery)
    console.log('Frontend query results:', frontendResults.length)
    
    if (frontendResults.length > 0) {
      console.log('First frontend result:', JSON.stringify(frontendResults[0], null, 2))
    }
    
    // Test 5: Check isAvailable field specifically
    console.log('\n🔍 Test 5: Check isAvailable field')
    const isAvailableCheck = await client.fetch('*[_type == "product"] { title, isAvailable }')
    console.log('Products with isAvailable status:', isAvailableCheck)
    
  } catch (error) {
    console.error('❌ Sanity connection error:', error)
  }
}

debugSanity()