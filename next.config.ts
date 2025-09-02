import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: process.env.NODE_ENV === "production" ? "/admin-portal" : "",
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.aceglobal.edu.np",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "aceglobal.edu.np",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
