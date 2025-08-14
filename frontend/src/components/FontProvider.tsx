'use client'

import { useEffect } from 'react'

interface FontProviderProps {
  headerFont?: string
  bodyFont?: string
  fontWeightStyle?: string
  children: React.ReactNode
}

// Font mapping for Google Fonts
const fontMap = {
  inter: 'Inter:wght@300;400;500;600;700;800',
  playfair: 'Playfair+Display:wght@400;500;600;700;800',
  montserrat: 'Montserrat:wght@300;400;500;600;700;800',
  poppins: 'Poppins:wght@300;400;500;600;700;800',
  oswald: 'Oswald:wght@300;400;500;600;700',
  dancing: 'Dancing+Script:wght@400;500;600;700',
  bebas: 'Bebas+Neue:wght@400',
  righteous: 'Righteous:wght@400',
  opensans: 'Open+Sans:wght@300;400;500;600;700;800',
  lato: 'Lato:wght@300;400;700;900',
  sourcesans: 'Source+Sans+Pro:wght@300;400;600;700;900',
  nunito: 'Nunito:wght@300;400;500;600;700;800',
  roboto: 'Roboto:wght@300;400;500;700;900',
  merriweather: 'Merriweather:wght@300;400;700;900',
  system: '' // No Google Font needed
}

// CSS font family mapping
const fontFamilyMap = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  montserrat: "'Montserrat', sans-serif",
  poppins: "'Poppins', sans-serif",
  oswald: "'Oswald', sans-serif",
  dancing: "'Dancing Script', cursive",
  bebas: "'Bebas Neue', sans-serif",
  righteous: "'Righteous', sans-serif",
  opensans: "'Open Sans', sans-serif",
  lato: "'Lato', sans-serif",
  sourcesans: "'Source Sans Pro', sans-serif",
  nunito: "'Nunito', sans-serif",
  roboto: "'Roboto', sans-serif",
  merriweather: "'Merriweather', serif",
  system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
}

// Font weight mapping
const fontWeightMap = {
  light: {
    normal: '300',
    medium: '400',
    semibold: '500',
    bold: '600'
  },
  normal: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  bold: {
    normal: '500',
    medium: '600',
    semibold: '700',
    bold: '800'
  }
}

export default function FontProvider({ 
  headerFont = 'inter', 
  bodyFont = 'inter', 
  fontWeightStyle = 'normal',
  children 
}: FontProviderProps) {
  
  useEffect(() => {
    // Remove existing font links
    const existingLinks = document.querySelectorAll('link[data-font-provider]')
    existingLinks.forEach(link => link.remove())

    // Collect unique fonts to load
    const fontsToLoad = new Set<string>()
    
    if (headerFont !== 'system' && fontMap[headerFont as keyof typeof fontMap]) {
      fontsToLoad.add(fontMap[headerFont as keyof typeof fontMap])
    }
    
    if (bodyFont !== 'system' && fontMap[bodyFont as keyof typeof fontMap] && bodyFont !== headerFont) {
      fontsToLoad.add(fontMap[bodyFont as keyof typeof fontMap])
    }

    // Load Google Fonts
    fontsToLoad.forEach(fontString => {
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css2?family=${fontString}&display=swap`
      link.rel = 'stylesheet'
      link.setAttribute('data-font-provider', 'true')
      document.head.appendChild(link)
    })

    // Apply CSS custom properties
    const headerFontFamily = fontFamilyMap[headerFont as keyof typeof fontFamilyMap] || fontFamilyMap.inter
    const bodyFontFamily = fontFamilyMap[bodyFont as keyof typeof fontFamilyMap] || fontFamilyMap.inter
    const weights = fontWeightMap[fontWeightStyle as keyof typeof fontWeightMap] || fontWeightMap.normal

    document.documentElement.style.setProperty('--font-header', headerFontFamily)
    document.documentElement.style.setProperty('--font-body', bodyFontFamily)
    document.documentElement.style.setProperty('--font-weight-normal', weights.normal)
    document.documentElement.style.setProperty('--font-weight-medium', weights.medium)
    document.documentElement.style.setProperty('--font-weight-semibold', weights.semibold)
    document.documentElement.style.setProperty('--font-weight-bold', weights.bold)

  }, [headerFont, bodyFont, fontWeightStyle])

  return <>{children}</>
}