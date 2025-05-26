'use client';

import { useState } from 'react';
import ProductImages from './ProductImages';
import ProductVariantSection from './ProductVariantSection';

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
  variantImageUrl?: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  slug: {
    current: string;
  };
  mainImageUrl: string;
  galleryImages?: string[];
  mainImage?: {
    asset: {
      url: string;
    };
  };
  shortDescription?: string;
  hasVariants?: boolean;
  variants?: Variant[];
  variantOptions?: {
    sizes?: string[];
    colors?: string[];
    materials?: string[];
    styles?: string[];
  };
  isAvailable: boolean;
  inventory?: number;
  tags?: string[];
  festivalAttribution?: string;
  description?: { _type: string; children?: { text: string }[] }[];
  materials?: string[];
  careInstructions?: string;
  artistNotes?: string;
  timeToMake?: string;
  isOneOfAKind?: boolean;
  instagramPost?: string;
  compareAtPrice?: number;
}

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  // State to track the currently selected variant for image switching
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  // Handle variant change from ProductVariantSection
  const handleVariantChange = (variant: Variant | null) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images - with variant support */}
      <ProductImages 
        product={product} 
        selectedVariant={selectedVariant}
      />

      {/* Product Details */}
      <div className="space-y-6">
        {/* Title and Basic Price (will be enhanced by ProductVariantSection if variants exist) */}
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            {product.title}
          </h1>
          
          {/* Show base price for non-variant products, ProductVariantSection will override for variant products */}
          {!product.hasVariants && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-pink-400">
                ${product.price}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xl text-purple-300 line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>
          )}

          {/* Festival Attribution */}
          {product.festivalAttribution && (
            <div className="inline-block bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm mb-4">
              {product.festivalAttribution}
            </div>
          )}
        </div>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-xl text-purple-200">
            {product.shortDescription}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="text-sm bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-3 py-1 rounded-full border border-pink-500/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Variant Selection and Cart - This handles both variant and non-variant products */}
        <ProductVariantSection 
          product={product} 
          onVariantChange={handleVariantChange}
        />

        {/* Product Details Sections */}
        <div className="space-y-6 pt-6 border-t border-white/20">
          {/* Description */}
          {product.description && Array.isArray(product.description) && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <div className="text-purple-200 space-y-2">
                {product.description.map((block: { _type: string; children?: { text: string }[] }, index: number) => {
                  if (block._type === 'block' && block.children) {
                    return (
                      <p key={index}>
                        {block.children.map(child => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}    

          {/* Materials */}
          {product.materials && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Materials</h3>
              <p className="text-purple-200">{product.materials}</p>
            </div>
          )}

          {/* Care Instructions */}
          {product.careInstructions && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Care Instructions</h3>
              <p className="text-purple-200">{product.careInstructions}</p>
            </div>
          )}

          {/* Artist Notes */}
          {product.artistNotes && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Artist Notes</h3>
              <p className="text-purple-200 italic">{product.artistNotes}</p>
            </div>
          )}

          {/* Creation Time */}
          {product.timeToMake && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Creation Time</h3>
              <p className="text-purple-200">{product.timeToMake}</p>
            </div>
          )}

          {/* One of a Kind Badge */}
          {product.isOneOfAKind && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                ✨ One of a Kind
              </h3>
              <p className="text-yellow-200 text-sm">
                This is a unique, handcrafted piece. Once it&apos;s gone, it&apos;s gone forever!
              </p>
            </div>
          )}

          {/* Instagram Link */}
          {product.instagramPost && (
            <div>
              <a 
                href={product.instagramPost}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                📸 See this piece on Instagram
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}