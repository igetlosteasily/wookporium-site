'use client';

import { useState, useEffect } from 'react';

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

interface VariantOptions {
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  styles?: string[];
}

interface VariantSelectorProps {
  hasVariants: boolean;
  variantOptions?: VariantOptions;
  variants: Variant[];
  basePrice: number;
  onVariantChange: (variant: Variant | null, finalPrice: number) => void;
}

// Define the type for selectedOptions keys
type SelectedOptionsKey = 'size' | 'color' | 'material' | 'style';

export default function VariantSelector({
  hasVariants,
  variantOptions,
  variants,
  basePrice,
  onVariantChange
}: VariantSelectorProps) {
  // Ensure we have a valid base price with fallback
  const safeBasePrice = typeof basePrice === 'number' && !isNaN(basePrice) ? basePrice : 0;
  
  const [selectedOptions, setSelectedOptions] = useState<{
    size?: string;
    color?: string;
    material?: string;
    style?: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [finalPrice, setFinalPrice] = useState(safeBasePrice);

  // ALL HOOKS MUST BE BEFORE ANY CONDITIONAL RETURNS
  // Find matching variant based on selected options
  useEffect(() => {
    if (!hasVariants || !variants || variants.length === 0) {
      return; // Early return within useEffect is fine
    }

    const matchingVariant = variants.find(variant => {
      return (!selectedOptions.size || variant.size === selectedOptions.size) &&
             (!selectedOptions.color || variant.color === selectedOptions.color) &&
             (!selectedOptions.material || variant.material === selectedOptions.material) &&
             (!selectedOptions.style || variant.style === selectedOptions.style);
    });

    if (matchingVariant) {
      const adjustment = matchingVariant.priceAdjustment || 0;
      const newPrice = safeBasePrice + adjustment;
      setSelectedVariant(matchingVariant);
      setFinalPrice(newPrice);
      onVariantChange(matchingVariant, newPrice);
    } else {
      setSelectedVariant(null);
      setFinalPrice(safeBasePrice);
      onVariantChange(null, safeBasePrice);
    }
  }, [selectedOptions, variants, safeBasePrice, onVariantChange, hasVariants]);

  // NOW all the conditional returns come AFTER all hooks
  if (!hasVariants || !variants || variants.length === 0) {
    return null;
  }

  // Map plural option types to singular variant properties with proper typing
  const getVariantProperty = (optionType: keyof VariantOptions): SelectedOptionsKey => {
    const mapping: Record<keyof VariantOptions, SelectedOptionsKey> = {
      sizes: 'size',
      colors: 'color',
      materials: 'material',
      styles: 'style'
    };
    return mapping[optionType];
  };

  // Get available options for current selection state
  const getAvailableOptions = (optionType: keyof VariantOptions) => {
    const variantProperty = getVariantProperty(optionType);
    
    return variants
      .filter(variant => {
        // Filter based on other selected options
        if (optionType !== 'sizes' && selectedOptions.size && variant.size !== selectedOptions.size) return false;
        if (optionType !== 'colors' && selectedOptions.color && variant.color !== selectedOptions.color) return false;
        if (optionType !== 'materials' && selectedOptions.material && variant.material !== selectedOptions.material) return false;
        if (optionType !== 'styles' && selectedOptions.style && variant.style !== selectedOptions.style) return false;
        return variant.isAvailable && (variant.inventory || 0) > 0;
      })
      .map(variant => variant[variantProperty])
      .filter((value, index, self) => value && self.indexOf(value) === index) as string[];
  };

  const handleOptionSelect = (optionType: keyof VariantOptions, value: string) => {
    const variantProperty = getVariantProperty(optionType);
    
    setSelectedOptions(prev => ({
      ...prev,
      [variantProperty]: prev[variantProperty] === value ? undefined : value
    }));
  };

  const renderOptionGroup = (title: string, optionType: keyof VariantOptions, options: string[]) => {
    if (!options || options.length === 0) return null;

    const availableOptions = getAvailableOptions(optionType);
    const variantProperty = getVariantProperty(optionType);
    const selectedValue = selectedOptions[variantProperty];

    return (
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {options.map((option) => {
            const isAvailable = availableOptions.includes(option);
            const isSelected = selectedValue === option;
            
            return (
              <button
                key={option}
                onClick={() => isAvailable ? handleOptionSelect(optionType, option) : null}
                disabled={!isAvailable}
                className={`
                  px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                  ${isSelected 
                    ? 'border-pink-400 bg-pink-400/20 text-pink-300' 
                    : isAvailable
                      ? 'border-purple-400/50 text-purple-200 hover:border-purple-400 hover:bg-purple-400/10'
                      : 'border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                  }
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Check if all required options are selected
  const hasRequiredSelections = () => {
    if (!variantOptions) return true;
    
    return (!variantOptions.sizes || selectedOptions.size) &&
           (!variantOptions.colors || selectedOptions.color) &&
           (!variantOptions.materials || selectedOptions.material) &&
           (!variantOptions.styles || selectedOptions.style);
  };

  // Safe price display
  const safeFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice : safeBasePrice;

  return (
    <div className="space-y-6 p-4 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Options</h3>
        {selectedVariant && (
          <div className="text-right">
            <div className="text-2xl font-bold text-pink-400">
              ${safeFinalPrice.toFixed(2)}
            </div>
            {selectedVariant.priceAdjustment && selectedVariant.priceAdjustment !== 0 && (
              <div className="text-sm text-purple-300">
                {selectedVariant.priceAdjustment > 0 ? '+' : ''}${(selectedVariant.priceAdjustment || 0).toFixed(2)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Render option groups */}
      {variantOptions?.sizes && renderOptionGroup('Size', 'sizes', variantOptions.sizes)}
      {variantOptions?.colors && renderOptionGroup('Color', 'colors', variantOptions.colors)}
      {variantOptions?.materials && renderOptionGroup('Material', 'materials', variantOptions.materials)}
      {variantOptions?.styles && renderOptionGroup('Style', 'styles', variantOptions.styles)}

      {/* Selection status */}
      <div className="pt-4 border-t border-white/10">
        {selectedVariant ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-white font-medium">{selectedVariant.name}</span>
            </div>
            <div className="text-sm text-purple-200">
              Stock: {selectedVariant.inventory || 0} available
            </div>
            {selectedVariant.sku && (
              <div className="text-xs text-purple-300">
                SKU: {selectedVariant.sku}
              </div>
            )}
          </div>
        ) : hasRequiredSelections() ? (
          <div className="text-amber-300">
            <span className="text-amber-400">⚠</span> This combination is not available
          </div>
        ) : (
          <div className="text-purple-300">
            Please select all options above
          </div>
        )}
      </div>
    </div>
  );
}