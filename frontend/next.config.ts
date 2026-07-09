import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly — the repo has a stray package-lock.json
  // one level up (outside frontend/), which makes Next.js guess the wrong root.
  outputFileTracingRoot: path.join(__dirname),

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
