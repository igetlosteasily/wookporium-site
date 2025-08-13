import React from 'react';

interface CartTriggerProps {
  className?: string;
}

export default function CartTrigger({ className = '' }: CartTriggerProps) {
  return (
    <button
      className={`snipcart-checkout font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 ${className}`}
      aria-label="Open shopping cart"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v6a2 2 0 002 2h2m0 0a2 2 0 002-2m-2 2a2 2 0 01-2-2"
        />
      </svg>
      
      <span className="hidden sm:inline">Cart</span>
      
      <span className="bg-gray-100 text-gray-900 rounded-full px-2 py-1 text-xs font-bold min-w-[1.5rem] text-center">
        <span className="snipcart-items-count">0</span>
      </span>
    </button>
  );
}