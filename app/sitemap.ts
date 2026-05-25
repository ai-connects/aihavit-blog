import type { MetadataRoute } from 'next';
import { getAllArticles, resolveContent } from '@/lib/articles-v2';

const SITE = 'https://blog.aihavit.com';
const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const lang of ROUTE_LANGS) {
    entries.push({
      url: `${SITE}/${lang}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: lang === 'en' ? 1.0 : 0.9,
    });
    entries.push({
      url: `${SITE}/${lang}/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    entries.push({
      url: `${SITE}/${lang}/tools/bmr`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const a of getAllArticles()) {
    for (const lang of ROUTE_LANGS) {
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
        priority: 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
