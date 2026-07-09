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

  // Static export support (optional for Cloudflare Pages)
  // output: 'export', // Uncomment when ready for static export

  // PWA manifest
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.snipcart.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.snipcart.com; img-src 'self' data: https://cdn.sanity.io https://cdn.snipcart.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.api.sanity.io https://app.snipcart.com wss://*.sanity.io;",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
    ];
  },
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
