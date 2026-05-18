import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  trailingSlash: true,
  // Tell Next.js not to add trailing slash to studio routes
  async rewrites() {
    return [
      {
        source: "/studio/:path*",
        destination: "/studio/:path*",
      },
    ];
  },
};

export default nextConfig;