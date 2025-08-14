import Link from 'next/link'
import Image from 'next/image'

interface BrandSettings {
  logoUrl?: string
  logoText?: string
  logoIcon?: string
  primaryColor?: string
  secondaryColor?: string
}

interface DynamicLogoProps {
  brandSettings: BrandSettings | null
  className?: string
}

export default function DynamicLogo({ brandSettings, className = '' }: DynamicLogoProps) {
  // Fallback values if no brand settings
  const logoText = brandSettings?.logoText || 'Wookporium'
  const logoIcon = brandSettings?.logoIcon || 'W'
  const primaryColor = brandSettings?.primaryColor || '#059669' // emerald-600
  const secondaryColor = brandSettings?.secondaryColor || '#0d9488' // teal-600

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image or Icon Circle */}
      {brandSettings?.logoUrl ? (
        // Use uploaded logo image
        <div className="w-8 h-8 relative">
          <Image
            src={brandSettings.logoUrl}
            alt={logoText}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        // Use icon circle with dynamic colors
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          <span className="text-white font-bold text-sm">{logoIcon}</span>
        </div>
      )}
      
      {/* Logo Text */}
      <span className="text-gray-900 font-semibold text-lg">{logoText}</span>
    </Link>
  )
}