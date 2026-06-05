import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.smart.com.kh",
      },
      {
        protocol: "https",
        hostname: "crdms.images.consumerreports.org",
      },
      {
        protocol: "https",
        hostname: "storyblok.cdn.vmo2digital.co.uk",
      },
      {
        protocol: "https",
        hostname: "khmersamnang.com",
      },
    ],
  },
};

export default nextConfig;
