import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Dev-time proxy: forward requests from the Next dev server's /api/*
  // to a backend running on localhost:8081. This avoids CORS in dev and
  // lets your frontend run on a single port (e.g. 3001) while the backend
  // runs separately on 8081.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*',
      },
    ];
  },
};

export default nextConfig;
