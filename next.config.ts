import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 1. Ignore TypeScript Errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. Ignore ESLint Errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;