import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // Remove the serverActions line entirely - it's not needed for static export
};

export default nextConfig;