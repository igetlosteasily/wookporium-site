import type { NextConfig } from "next";

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
    unoptimized: true,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Static export support for Cloudflare Pages
  output: 'export',
};

export default nextConfig;
