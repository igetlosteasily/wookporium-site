'use client'

import { useEffect, useRef } from 'react'

export default function SnipcartProvider() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!document.getElementById('snipcart')) {
      const snipcartDiv = document.createElement('div')
      snipcartDiv.id = 'snipcart'
      snipcartDiv.hidden = true
      snipcartDiv.setAttribute('data-api-key', process.env.NEXT_PUBLIC_SNIPCART_API_KEY || '')
      snipcartDiv.setAttribute('data-config-modal-style', 'side')
      snipcartDiv.setAttribute('data-config-add-product-behavior', 'none')
      document.body.appendChild(snipcartDiv)
    }

    if (!document.querySelector('script[src*="snipcart.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return null
}