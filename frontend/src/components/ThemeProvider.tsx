'use client'

import { useEffect } from 'react'

interface ThemeProviderProps {
  themeStyle?: string
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  sectionBackgroundColor?: string
  children: React.ReactNode
}

// Theme configurations with background colors
const themeConfigs = {
  minimal: {
    name: 'Clean & Minimal',
    cssClass: 'theme-minimal',
    backgroundColor: '#ffffff',
    sectionBackgroundColor: '#f8fafc',
    gradients: {
      hero: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      sections: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      cards: 'rgba(255, 255, 255, 0.8)',
      accent: 'rgba(0, 0, 0, 0.05)'
    },
    shadows: {
      card: '0 1px 3px rgba(0, 0, 0, 0.1)',
      cardHover: '0 4px 6px rgba(0, 0, 0, 0.1)',
      button: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    borders: {
      radius: '8px',
      cardRadius: '12px',
      buttonRadius: '8px'
    }
  },
  festival: {
    name: 'Festival Vibes',
    cssClass: 'theme-festival',
    backgroundColor: '#1a1625',
    sectionBackgroundColor: '#2d1b45',
    gradients: {
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sections: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      cards: 'rgba(255, 255, 255, 0.95)',
      accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    shadows: {
      card: '0 8px 32px rgba(0, 0, 0, 0.15)',
      cardHover: '0 16px 48px rgba(0, 0, 0, 0.2)',
      button: '0 4px 16px rgba(0, 0, 0, 0.2)'
    },
    borders: {
      radius: '16px',
      cardRadius: '20px',
      buttonRadius: '12px'
    }
  },
  bohemian: {
    name: 'Earthy Bohemian',
    cssClass: 'theme-bohemian',
    backgroundColor: '#f5f5dc',
    sectionBackgroundColor: '#f0e6d2',
    gradients: {
      hero: 'linear-gradient(135deg, #d4a574 0%, #8b4513 100%)',
      sections: 'linear-gradient(135deg, #ddbea9 0%, #cb997e 100%)',
      cards: 'rgba(245, 235, 220, 0.9)',
      accent: 'linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(139, 69, 19, 0.1)',
      cardHover: '0 8px 24px rgba(139, 69, 19, 0.15)',
      button: '0 3px 12px rgba(139, 69, 19, 0.15)'
    },
    borders: {
      radius: '12px',
      cardRadius: '16px',
      buttonRadius: '20px'
    }
  },
  desert: {
    name: 'Desert Burn',
    cssClass: 'theme-desert',
    backgroundColor: '#fdf5e6',
    sectionBackgroundColor: '#f4e6d7',
    gradients: {
      hero: 'linear-gradient(135deg, #ff8a80 0%, #ff5722 100%)',
      sections: 'linear-gradient(135deg, #ffab91 0%, #ff7043 100%)',
      cards: 'rgba(255, 248, 225, 0.95)',
      accent: 'linear-gradient(135deg, #ff9800 0%, #e65100 100%)'
    },
    shadows: {
      card: '0 6px 20px rgba(255, 87, 34, 0.2)',
      cardHover: '0 12px 32px rgba(255, 87, 34, 0.3)',
      button: '0 4px 16px rgba(255, 87, 34, 0.25)'
    },
    borders: {
      radius: '8px',
      cardRadius: '12px',
      buttonRadius: '24px'
    }
  },
  dark: {
    name: 'Dark Mode',
    cssClass: 'theme-dark',
    backgroundColor: '#0f172a',
    sectionBackgroundColor: '#1e293b',
    gradients: {
      hero: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      sections: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
      cards: 'rgba(30, 41, 59, 0.8)',
      accent: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(0, 0, 0, 0.3)',
      cardHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
      button: '0 3px 12px rgba(0, 0, 0, 0.3)'
    },
    borders: {
      radius: '8px',
      cardRadius: '12px',
      buttonRadius: '8px'
    }
  },
  sunset: {
    name: 'Sunset Vibes',
    cssClass: 'theme-sunset',
    backgroundColor: '#fff5f5',
    sectionBackgroundColor: '#fed7d7',
    gradients: {
      hero: 'linear-gradient(135deg, #fed7d7 0%, #f56565 100%)',
      sections: 'linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)',
      cards: 'rgba(255, 245, 245, 0.9)',
      accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(245, 101, 101, 0.15)',
      cardHover: '0 8px 24px rgba(245, 101, 101, 0.25)',
      button: '0 3px 12px rgba(245, 101, 101, 0.2)'
    },
    borders: {
      radius: '16px',
      cardRadius: '20px',
      buttonRadius: '25px'
    }
  },
  forest: {
    name: 'Forest',
    cssClass: 'theme-forest',
    backgroundColor: '#f0fff4',
    sectionBackgroundColor: '#e6fffa',
    gradients: {
      hero: 'linear-gradient(135deg, #48bb78 0%, #2f855a 100%)',
      sections: 'linear-gradient(135deg, #9ae6b4 0%, #68d391 100%)',
      cards: 'rgba(240, 255, 244, 0.9)',
      accent: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(56, 161, 105, 0.15)',
      cardHover: '0 8px 24px rgba(56, 161, 105, 0.25)',
      button: '0 3px 12px rgba(56, 161, 105, 0.2)'
    },
    borders: {
      radius: '12px',
      cardRadius: '16px',
      buttonRadius: '12px'
    }
  },
  ocean: {
    name: 'Ocean',
    cssClass: 'theme-ocean',
    backgroundColor: '#f0f9ff',
    sectionBackgroundColor: '#e0f2fe',
    gradients: {
      hero: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      sections: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)',
      cards: 'rgba(240, 249, 255, 0.9)',
      accent: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(14, 165, 233, 0.15)',
      cardHover: '0 8px 24px rgba(14, 165, 233, 0.25)',
      button: '0 3px 12px rgba(14, 165, 233, 0.2)'
    },
    borders: {
      radius: '8px',
      cardRadius: '12px',
      buttonRadius: '8px'
    }
  },
  custom: {
    name: 'Custom',
    cssClass: 'theme-custom',
    backgroundColor: '#ffffff', // Will be overridden by user selection
    sectionBackgroundColor: '#f8fafc', // Will be overridden by user selection
    gradients: {
      hero: 'linear-gradient(135deg, var(--brand-background) 0%, var(--brand-section-background) 100%)',
      sections: 'linear-gradient(135deg, var(--brand-section-background) 0%, var(--brand-background) 100%)',
      cards: 'rgba(255, 255, 255, 0.8)',
      accent: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)'
    },
    shadows: {
      card: '0 4px 16px rgba(0, 0, 0, 0.1)',
      cardHover: '0 8px 24px rgba(0, 0, 0, 0.15)',
      button: '0 3px 12px rgba(0, 0, 0, 0.15)'
    },
    borders: {
      radius: '8px',
      cardRadius: '12px',
      buttonRadius: '8px'
    }
  }
}

export default function ThemeProvider({ 
  themeStyle = 'minimal', 
  primaryColor = '#111827',
  secondaryColor = '#6b7280',
  backgroundColor = '#ffffff',
  sectionBackgroundColor = '#f8fafc',
  children 
}: ThemeProviderProps) {
  
  useEffect(() => {
    // Get theme configuration
    const theme = themeConfigs[themeStyle as keyof typeof themeConfigs] || themeConfigs.minimal
    
    // Remove existing theme classes
    document.body.classList.remove(...Object.values(themeConfigs).map(t => t.cssClass))
    
    // Add current theme class
    document.body.classList.add(theme.cssClass)
    
    // Apply CSS custom properties for theme
    const root = document.documentElement
    
    // Use custom colors if Custom theme, otherwise use theme defaults
    const finalBackgroundColor = themeStyle === 'custom' ? backgroundColor : theme.backgroundColor
    const finalSectionBackgroundColor = themeStyle === 'custom' ? sectionBackgroundColor : theme.sectionBackgroundColor
    
    // Background colors
    root.style.setProperty('--brand-background', finalBackgroundColor)
    root.style.setProperty('--brand-section-background', finalSectionBackgroundColor)
    
    // Also set on body for immediate visual feedback
    document.body.style.backgroundColor = finalBackgroundColor
    
    // Theme-specific gradients and effects
    root.style.setProperty('--theme-hero-gradient', theme.gradients.hero)
    root.style.setProperty('--theme-sections-gradient', theme.gradients.sections)
    root.style.setProperty('--theme-card-background', theme.gradients.cards)
    root.style.setProperty('--theme-accent-gradient', theme.gradients.accent)
    
    // Theme-specific shadows
    root.style.setProperty('--theme-card-shadow', theme.shadows.card)
    root.style.setProperty('--theme-card-shadow-hover', theme.shadows.cardHover)
    root.style.setProperty('--theme-button-shadow', theme.shadows.button)
    
    // Theme-specific border radius
    root.style.setProperty('--theme-radius', theme.borders.radius)
    root.style.setProperty('--theme-card-radius', theme.borders.cardRadius)
    root.style.setProperty('--theme-button-radius', theme.borders.buttonRadius)
    
    // Brand colors (these can override theme defaults)
    root.style.setProperty('--brand-primary', primaryColor)
    root.style.setProperty('--brand-secondary', secondaryColor)
    
    // Theme-specific behavior adjustments
    switch (themeStyle) {
      case 'festival':
        root.style.setProperty('--theme-animation-speed', '0.4s')
        root.style.setProperty('--theme-scale-hover', '1.08')
        break
      case 'bohemian':
        root.style.setProperty('--theme-animation-speed', '0.6s')
        root.style.setProperty('--theme-scale-hover', '1.03')
        break
      case 'desert':
        root.style.setProperty('--theme-animation-speed', '0.3s')
        root.style.setProperty('--theme-scale-hover', '1.05')
        break
      case 'dark':
        root.style.setProperty('--theme-animation-speed', '0.3s')
        root.style.setProperty('--theme-scale-hover', '1.02')
        // Update text colors for dark theme
        root.style.setProperty('--theme-text-primary', '#f1f5f9')
        root.style.setProperty('--theme-text-secondary', '#cbd5e1')
        break
      case 'sunset':
      case 'forest':
      case 'ocean':
        root.style.setProperty('--theme-animation-speed', '0.3s')
        root.style.setProperty('--theme-scale-hover', '1.03')
        break
      default: // minimal, custom
        root.style.setProperty('--theme-animation-speed', '0.3s')
        root.style.setProperty('--theme-scale-hover', '1.02')
    }
    
  }, [themeStyle, primaryColor, secondaryColor, backgroundColor, sectionBackgroundColor])

  return <>{children}</>
}