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
      // Article hero photos — the HAVIT app's own article library (see
      // lib/article-images.ts). Originals are 0.3–3.9 MB, so they are always
      // rendered through next/image, never linked raw.
      {
        protocol: 'https',
        hostname: 'havit-prod-us-east.s3.us-east-1.amazonaws.com',
        pathname: '/image/**',
      },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // 289 distinct sources — a long TTL keeps the optimizer from re-fetching
    // multi-MB originals as pages revalidate on the 600s ISR window.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  // PRD §6.1 INV-011: ISR revalidate 600s (10분)
  experimental: {
    // Next 14 App Router default
  },
};

module.exports = nextConfig;
