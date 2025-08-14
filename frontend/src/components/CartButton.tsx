import React from 'react';

interface Variant {
  sku: string;
  name: string;
  size?: string;
  color?: string;
  material?: string;
  style?: string;
  priceAdjustment: number;
  inventory: number;
  isAvailable: boolean;
  variantImage?: {
    asset: {
      url: string;
    };
  };
}

interface Product {
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
  hasVariants?: boolean;
  variants?: Variant[];
}

interface CartButtonProps {
  product: Product;
  selectedVariant?: Variant | null;
  finalPrice: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function CartButton({ 
  product, 
  selectedVariant, 
  finalPrice, 
  className = '', 
  children, 
  disabled = false 
}: CartButtonProps) {
  // Use consistent production URL for static export
  const baseUrl = 'https://wookporium.com'; // Updated to new domain!
  const productUrl = `${baseUrl}/products/${product.slug.current}/`;
  
  // Determine image URL (variant image takes priority)
  const imageUrl = selectedVariant?.variantImage?.asset?.url || 
                   product.mainImage?.asset?.url || 
                   '';

  // Generate unique item ID for Snipcart
  const itemId = selectedVariant 
    ? `${product._id}-${selectedVariant.sku}` 
    : product._id;

  // Generate item name with variant info
  const itemName = selectedVariant 
    ? `${product.title} - ${selectedVariant.name}`
    : product.title;

  // Generate description with variant details
  const itemDescription = selectedVariant
    ? `${product.shortDescription || product.title} (${selectedVariant.name})`
    : product.shortDescription || product.title;

  // Build custom fields for variant tracking
  const customFields = selectedVariant ? [
    selectedVariant.size && `Size[${selectedVariant.size}]`,
    selectedVariant.color && `Color[${selectedVariant.color}]`,
    selectedVariant.material && `Material[${selectedVariant.material}]`,
    selectedVariant.style && `Style[${selectedVariant.style}]`,
    `SKU[${selectedVariant.sku}]`
  ].filter(Boolean).join('|') : '';

  // Check if button should be disabled
  const isDisabled = disabled || 
    (product.hasVariants && !selectedVariant) ||
    (selectedVariant && (!selectedVariant.isAvailable || selectedVariant.inventory <= 0));

  // Generate button text
  const getButtonText = () => {
    if (children) return children;
    
    if (product.hasVariants && !selectedVariant) {
      return 'Select Options';
    }
    
    if (selectedVariant && (!selectedVariant.isAvailable || selectedVariant.inventory <= 0)) {
      return 'Out of Stock';
    }
    
    return `Add to Cart - $${finalPrice.toFixed(2)}`;
  };

  return (
    <button
      className={`
        snipcart-add-item font-semibold py-3 px-6 rounded-lg transition-all duration-300 
        ${isDisabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-105 shadow-sm hover:shadow-md'
        } 
        ${className}
      `}
      disabled={!!isDisabled}
      data-item-id={itemId}
      data-item-price={finalPrice}
      data-item-url={productUrl}
      data-item-name={itemName}
      data-item-image={imageUrl}
      data-item-description={itemDescription}
      data-item-categories="festival,handmade"
      data-item-custom1-name="Variant Details"
      data-item-custom1-value={customFields}
      data-item-quantity="1"
      data-item-stackable="false"
      {...(selectedVariant && {
        'data-item-max-quantity': selectedVariant.inventory
      })}
    >
      {getButtonText()}
    </button>
  );
}