import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — ostrá data
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Demo fotky, dokud není nastavené Sanity
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
