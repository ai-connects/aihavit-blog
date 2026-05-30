// SEO dedup: 301 near-duplicate articles merged into a canonical keeper.
// Slug-level map (lib/merged-redirects.json); applied across all langs via :lang.
const mergedRedirects = require('./lib/merged-redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return mergedRedirects.map((r) => ({
      source: `/:lang/${r.from}`,
      destination: `/:lang/${r.to}`,
      permanent: true,
    }));
  },
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
