import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
};

export default nextConfig;
