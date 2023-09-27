/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_API: "http://0.0.0.0:8000/",
    DEV: true
  },
};

module.exports = nextConfig;
