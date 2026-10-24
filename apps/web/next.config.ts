import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Resolve listing metadata before streaming so a missing listing can return HTTP 404.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
