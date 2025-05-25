import React from 'react';

interface CartTriggerProps {
  className?: string;
}

export default function CartTrigger({ className = '' }: CartTriggerProps) {
  return (
    <button
      className={`snipcart-checkout bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
      aria-label="Open shopping cart"
    >
      🛒 Cart (<span className="snipcart-items-count">0</span>)
    </button>
  );
}