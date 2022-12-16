/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    url: process.env.URI,
  },
  experimental: {
    scrollRestoration: true,
  },
}
