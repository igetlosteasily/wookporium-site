import React from 'react';

interface CartButtonProps {
  product: {
    _id: string;
    title: string;
    price: number;
    slug: {
      current: string;
    };
    mainImage?: {
      asset: {
        url: string;
      };
    };
    shortDescription?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function CartButton({ product, className = '', children }: CartButtonProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thewookporium.com';
  const productUrl = `${baseUrl}/products/${product.slug.current}`;
  const imageUrl = product.mainImage?.asset?.url || '';

  return (
    <button
      className={`snipcart-add-item bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
      data-item-id={product._id}
      data-item-price={product.price}
      data-item-url={productUrl}
      data-item-name={product.title}
      data-item-image={imageUrl}
      data-item-description={product.shortDescription || product.title}
      data-item-categories="festival,handmade"
    >
      {children || `Add to Cart - $${product.price}`}
    </button>
  );
}