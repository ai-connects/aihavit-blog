import type { MetadataRoute } from 'next';
import { getAllArticles, resolveContent } from '@/lib/articles-v2';

const SITE = 'https://blog.aihavit.com';
const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es', 'pt-br', 'id', 'de', 'fr'] as const;

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
    for (const tool of ['bmr', 'protein', 'water', 'caffeine', 'sleep-cycle', 'exercise-calories']) {
      entries.push({
        url: `${SITE}/${lang}/tools/${tool}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // BLOG_AUTHORITY v1.0.0 (PRD §13.2.3 / §7.1 Step 5 / INV-007) —
  // 12 신규 entry (about×6 lang + editorial-policy×6 lang). 각 entry는
  // 6 lang hreflang alternates 포함 (entry 카운트 아님 — sub-element).
  // 총 sitemap entry = 6,536 (기존) + 12 (신규) = 6,548.
  for (const lang of ROUTE_LANGS) {
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
