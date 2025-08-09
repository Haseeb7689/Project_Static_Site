/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // make sure app directory experimental flag is on (for Next 13+)
  },
};

module.exports = nextConfig;
