import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['jacksen-blog.com', 'www.jacksen-blog.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.jacksen-blog.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
