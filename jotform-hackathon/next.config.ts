import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.jotform.com"],
    // Alternatively, you can use remotePatterns for more control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'www.jotform.com',
    //     pathname: '/uploads/**',
    //   },
    // ],
  },
};

export default nextConfig;
