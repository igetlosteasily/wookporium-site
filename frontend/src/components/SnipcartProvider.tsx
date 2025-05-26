'use client';

import { useEffect } from 'react';

export default function SnipcartProvider() {
  useEffect(() => {
    // Check if Snipcart is already initialized
    if (document.getElementById('snipcart')) {
      return; // Already exists, don't recreate
    }

    // Create Snipcart div with direct DOM manipulation
    const snipcartDiv = document.createElement('div');
    snipcartDiv.id = 'snipcart';
    snipcartDiv.hidden = true;
    snipcartDiv.setAttribute('data-api-key', 'YWIzMjkyOTYtN2FiZi00MTUwLTg2M2QtYzM4ZTNlNjI0MDc3NjM4ODM3MjIzMDMyNTcyODE0');
    snipcartDiv.setAttribute('data-config-modal-style', 'side');
    snipcartDiv.setAttribute('data-config-add-product-behavior', 'none');
    
    // Append to body (outside React's control)
    document.body.appendChild(snipcartDiv);

    // Load Snipcart script if not already loaded
    if (!document.querySelector('script[src*="snipcart.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Cleanup function (though we want Snipcart to persist)
    return () => {
      // Don't remove Snipcart on unmount to prevent the original error
      // The div should persist across navigation
    };
  }, []); // Empty dependency array - run once on mount

  // This component renders nothing visible
  return null;
}