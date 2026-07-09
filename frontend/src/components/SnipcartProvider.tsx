'use client'

/**
 * Snipcart Provider - Client-side only e-commerce integration
 * Loads Snipcart scripts and container only in the browser to avoid hydration issues
 */

import { useEffect } from 'react'

export default function SnipcartProvider() {
  const apiKey = process.env.NEXT_PUBLIC_SNIPCART_API_KEY

  useEffect(() => {
    // Ensure Snipcart script is loaded
    if (typeof window !== 'undefined' && apiKey && apiKey !== 'your-snipcart-key-here') {
      console.log('Snipcart initialized with API key')
    }
  }, [apiKey])

  // Don't render if no API key configured yet
  if (!apiKey || apiKey === 'your-snipcart-key-here') {
    return null
  }

  return (
    <>
      {/* Snipcart Container */}
      <div
        id="snipcart"
        data-api-key={apiKey}
        data-config-modal-style="side"
        hidden
      />
      
      {/* Snipcart Script */}
      <script
        async
        src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js"
      />
    </>
  )
}
