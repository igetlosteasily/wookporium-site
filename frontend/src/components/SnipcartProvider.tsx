'use client'

import { useEffect, useRef } from 'react'

export default function SnipcartProvider() {
  const snipcartRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return
    initialized.current = true

    // Create Snipcart div if it doesn't exist
    if (!document.getElementById('snipcart')) {
      const snipcartDiv = document.createElement('div')
      snipcartDiv.id = 'snipcart'
      snipcartDiv.hidden = true
      snipcartDiv.setAttribute('data-api-key', process.env.NEXT_PUBLIC_SNIPCART_API_KEY || '')
      snipcartDiv.setAttribute('data-config-modal-style', 'side')
      snipcartDiv.setAttribute('data-config-add-product-behavior', 'none')
      document.body.appendChild(snipcartDiv)
    }

    // Load Snipcart script if not already loaded
    if (!document.querySelector('script[src*="snipcart.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js'
      script.async = true
      document.body.appendChild(script)
    }

    // Cleanup function
    return () => {
      // Don't remove elements on cleanup - let Snipcart manage them
    }
  }, [])

  // Don't render anything - we're managing DOM directly
  return null
}