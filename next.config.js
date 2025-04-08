/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Enable styled-components compilation
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
      },
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.oneplus.com',
      },
      {
        protocol: 'https',
        hostname: 'i01.appmifile.com',
      }
    ],
  },
  // Improve production build
  swcMinify: true,
  reactStrictMode: true,
}

module.exports = nextConfig
