import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.normah.ai",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "images.normah.ai",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "api.normah.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.normah.ai",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
