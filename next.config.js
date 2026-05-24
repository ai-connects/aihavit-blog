/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.aihavit.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
  // PRD §6.1 INV-011: ISR revalidate 600s (10분)
  experimental: {
    // Next 14 App Router default
  },
};

module.exports = nextConfig;
