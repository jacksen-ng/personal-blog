import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['jacksen-blog.com', 'www.jacksen-blog.com'],
  },
  typescript: {
    // Skip type checking during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
