/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    URL: process.env.URL,
  },
  experimental: {
    scrollRestoration: true,
  },
}
