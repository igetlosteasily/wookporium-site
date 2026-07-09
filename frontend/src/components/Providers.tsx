/**
 * Providers - Global Client Context Providers
 * 
 * Centralizes all client-side context providers (Parallax, Theme, etc.)
 * to prevent hydration mismatches in the Root Layout.
 * 
 * Architecture:
 * - Wraps children in ParallaxProvider
 * - Can be expanded for ThemeProvider, Redux, etc.
 * - 'use client' directive ensures safe client-side execution
 */

'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ParallaxProvider>
      {children}
    </ParallaxProvider>
  );
}
