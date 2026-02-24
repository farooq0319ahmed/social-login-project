import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
};

export default nextConfig;
