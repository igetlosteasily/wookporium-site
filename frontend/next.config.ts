import type { NextConfig } from "next";
// @ts-expect-error - next-pwa lacks type definitions
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  // Image optimization with Sanity CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        // Allow external images from Open Graph fetcher
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains for OG-fetched images
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Static export support for Cloudflare Pages
  output: 'export',
};

// PWA Configuration
// PWA Configuration
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      // Sanity images - Cache first for festival connectivity
      urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "sanity-images",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      // Sanity data - Network first with cache fallback
      urlPattern: /^https:\/\/[^/]+\.api\.sanity\.io\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "sanity-data",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      // Static font assets
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      // Snipcart assets
      urlPattern: /^https:\/\/cdn\.snipcart\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "snipcart-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        },
      },
    },
  ],
  fallbacks: {
    document: "/offline",
  },
});

export default pwaConfig(nextConfig);
