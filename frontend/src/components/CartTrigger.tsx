'use client'

import React, { useState, useEffect } from 'react';

interface CartTriggerProps {
  className?: string;
}

export default function CartTrigger({ className = '' }: CartTriggerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      className={`snipcart-checkout bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
      aria-label="Open shopping cart"
    >
      🛒 Cart (
      {mounted ? (
        <span className="snipcart-items-count">0</span>
      ) : (
        <span>0</span>
      )}
      )
    </button>
  );
}