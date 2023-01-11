const withPWA = require("next-pwa")({
  dest: "public",
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
  },
})

module.exports = nextConfig
