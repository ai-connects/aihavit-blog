import type { MetadataRoute } from 'next';
import { getAllArticles, resolveContent } from '@/lib/articles-v2';

const SITE = 'https://blog.aihavit.com';
const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es', 'pt-br', 'id', 'de', 'fr'] as const;
type RouteLang = (typeof ROUTE_LANGS)[number];

/**
 * SEO v1.4 — Split the single 10,665-URL sitemap into 10 per-language sub-sitemaps
 * via Next.js `generateSitemaps`. Google then receives a sitemap index at
 * /sitemap.xml that points at /sitemap/0.xml ... /sitemap/9.xml. This is the
 * fix for the GSC "Discovered — currently not indexed" (5,257) backlog:
 *
 *   - Google allocates crawl budget per sitemap segment, not as one giant batch
 *   - Per-language priority signals (e.g. EN gets priority 1.0) become per-file
 *   - Smaller sitemaps (~1,000 URLs each) crawl + index faster
 *   - Easier to diagnose which segment is stuck in GSC
 *
 * `id` is the index into ROUTE_LANGS so each sub-sitemap covers exactly one lang.
 */
export async function generateSitemaps(): Promise<{ id: number }[]> {
  return ROUTE_LANGS.map((_, idx) => ({ id: idx }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const lang = ROUTE_LANGS[id];
  if (!lang) return [];

  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Home page for this lang
  entries.push({
    url: `${SITE}/${lang}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: lang === 'en' ? 1.0 : 0.9,
  });

  // Tools index + 6 tool detail pages for this lang
  entries.push({
    url: `${SITE}/${lang}/tools`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  });
  for (const tool of ['bmr', 'protein', 'water', 'caffeine', 'sleep-cycle', 'exercise-calories']) {
    entries.push({
      url: `${SITE}/${lang}/tools/${tool}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // About + Editorial-policy for this lang, each with full 10-lang alternates
  const aboutAlternates: Record<string, string> = {};
  const policyAlternates: Record<string, string> = {};
  for (const other of ROUTE_LANGS) {
    aboutAlternates[other] = `${SITE}/${other}/about`;
    policyAlternates[other] = `${SITE}/${other}/editorial-policy`;
  }
  aboutAlternates['x-default'] = `${SITE}/en/about`;
  policyAlternates['x-default'] = `${SITE}/en/editorial-policy`;

  entries.push({
    url: `${SITE}/${lang}/about`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: { languages: aboutAlternates },
  });
  entries.push({
    url: `${SITE}/${lang}/editorial-policy`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: { languages: policyAlternates },
  });

  // Articles — only entries where this lang has a native (non-fallback) translation
  for (const a of getAllArticles()) {
    const r = resolveContent(a, lang);
    if (!r || r.fallback) continue;

    const alternates: Record<string, string> = {};
    for (const other of ROUTE_LANGS) {
      const rr = resolveContent(a, other);
      if (rr && !rr.fallback) {
        alternates[other] = `${SITE}/${other}/${a.slug}`;
      }
    }
    alternates['x-default'] = `${SITE}/en/${a.slug}`;

    entries.push({
      url: `${SITE}/${lang}/${a.slug}`,
      lastModified: new Date(a.updated_at ?? now),
      changeFrequency: 'weekly',
      priority: lang === 'en' ? 0.8 : 0.7,
      alternates: { languages: alternates },
    });
  }

  return entries;
}
