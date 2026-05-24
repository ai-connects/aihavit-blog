import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { SUPPORTED_LANGS, toShortLang, toBcp47, CATEGORIES } from '@/lib/i18n';

const SITE = 'https://www.aihavit.com';

/**
 * PRD §6.6 sitemap.xml builder.
 * 12 × 35 = 420 카테고리 + 1,200 × 35 = 42,000 article (실제) → 시드 50 × 보유 lang only.
 * 각 URL에 alternates (hreflang) 35개씩 첨부.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 정적 페이지
  entries.push({
    url: `${SITE}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  });

  // 카테고리 페이지 — 12 × 35 = 420 URL
  for (const cat of CATEGORIES) {
    for (const lang of SUPPORTED_LANGS) {
      entries.push({
        url: `${SITE}/blog/${toShortLang(lang)}/c/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  // Article 상세 — 시드 article × SUPPORTED_LANGS 35
  for (const a of getAllArticles()) {
    for (const lang of SUPPORTED_LANGS) {
      const c = a.langs[lang];
      // 시드한 본문이 있거나 fallback 가능한 en_us
      if (c?.title || lang === 'en_us') {
        const alternates: Record<string, string> = {};
        for (const otherLang of SUPPORTED_LANGS) {
          const oc = a.langs[otherLang];
          if (oc?.title || otherLang === 'en_us') {
            alternates[toBcp47(otherLang)] = `${SITE}/blog/${toShortLang(otherLang)}/${a.slug}`;
          }
        }
        alternates['x-default'] = `${SITE}/blog/en/${a.slug}`;
        entries.push({
          url: `${SITE}/blog/${toShortLang(lang)}/${a.slug}`,
          lastModified: new Date(a.updated_at),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: alternates },
        });
      }
    }
  }

  return entries;
}
