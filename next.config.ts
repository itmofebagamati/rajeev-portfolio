import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let Netlify handle the build — do NOT use output:"export"
  // Netlify natively supports Next.js via @netlify/plugin-nextjs
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
