import type { MetadataRoute } from 'next';

// PRD §6.7
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://blog.aihavit.com/sitemap.xml',
  };
}
