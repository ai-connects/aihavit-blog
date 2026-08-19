/**
 * Article 데이터 액세스 레이어 (mock — 실 구현은 Django public API 호출).
 * PRD §6.9 fallback (INV-005) + §6.1 routing + §6.10 slug 기반 매칭.
 */

import { ARTICLES as SEED_ARTICLES } from '../data/seed-articles';
import { SAMPLE_ARTICLES } from '../data/sample-by-type';
import { SEO_SAMPLE_ARTICLES } from '../data/seo-samples';
import { SEO_BATCH1_ARTICLES } from '../data/seo-batch-1';
import { SEO_BATCH1_PART2 } from '../data/seo-batch-1-part2';
import type { Article, ArticleContent } from './types';
import { type LangKey, toFullLang, FALLBACK_LANG, categoryBySlug, CATEGORIES } from './i18n';

export type { Article, ArticleContent };

/** Article Generation Agent System Batch #1 (5건, 한/영) */
const SEO_BATCH1_ALL: Article[] = [...SEO_BATCH1_ARTICLES, ...SEO_BATCH1_PART2];

/** SEO Batch1(5) + SEO 샘플(2) + type별 샘플(5) + 시드(50) = 총 62개 */
const ARTICLES: Article[] = [...SEO_BATCH1_ALL, ...SEO_SAMPLE_ARTICLES, ...SAMPLE_ARTICLES, ...SEED_ARTICLES];

export function getSampleArticlesByType(): Article[] {
  return SAMPLE_ARTICLES.filter((a) => a.is_active);
}

export function getSeoSampleArticles(): Article[] {
  return SEO_SAMPLE_ARTICLES.filter((a) => a.is_active);
}

/** Article Generation Agent System Batch #1 — 5건 분리 노출 */
export function getSeoBatch1Articles(): Article[] {
  return SEO_BATCH1_ALL.filter((a) => a.is_active);
}

export interface ResolvedContent {
  content: ArticleContent;
  usedLang: LangKey;
  fallback: boolean;
}

/** PRD §6.9 getContent fallback (INV-005) */
export function resolveContent(article: Article, lang: LangKey): ResolvedContent | null {
  const primary = article.langs[lang];
  if (primary && primary.title) {
    return { content: primary, usedLang: lang, fallback: false };
  }
  // fallback to en_us
  const enUs = article.langs[FALLBACK_LANG];
  if (enUs && enUs.title) {
    return { content: enUs, usedLang: FALLBACK_LANG, fallback: true };
  }
  return null; // INV-005: 어떤 본문도 없음 → notFound
}

export function getAllArticles(): Article[] {
  return ARTICLES.filter((a) => a.is_active); // INV-003
}

export function getArticleBySlug(slug: string): Article | null {
  return ARTICLES.find((a) => a.is_active && a.slug === slug) ?? null;
}

export function getArticlesByCategorySlug(categorySlug: string): Article[] {
  const cat = categoryBySlug(categorySlug);
  if (!cat) return [];
  return ARTICLES.filter((a) => a.is_active && a.category === cat.value);
}

export interface SearchOptions {
  query?: string;
  category?: string;
  lang: LangKey;
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** PRD §13.1 D-1 paged URL + 검색 */
export function searchArticles({ query, category, lang, page = 1, pageSize = 12 }: SearchOptions): SearchResult {
  let pool = getAllArticles();
  if (category) {
    const cat = categoryBySlug(category);
    if (cat) pool = pool.filter((a) => a.category === cat.value);
  }
  if (query && query.trim()) {
    const q = query.toLowerCase();
    pool = pool.filter((a) => {
      const resolved = resolveContent(a, lang);
      if (!resolved) return false;
      const c = resolved.content;
      const haystack = [c.title, c.summary, c.mission, a.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }
  // 최신순 정렬
  pool.sort((a, b) => b.published_at.localeCompare(a.published_at));

  const total = pool.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * pageSize;
  return {
    articles: pool.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

/** PRD §6.5 관련 article — 같은 카테고리 6개 */
export function getRelatedArticles(article: Article, lang: LangKey, limit = 6): Article[] {
  return ARTICLES.filter(
    (a) => a.is_active && a.category === article.category && a.article_id !== article.article_id
  )
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, limit);
}

/** 카테고리별 카운트 — 홈/카테고리 카드용 */
export function getCategoryStats() {
  const stats: Record<string, number> = {};
  for (const cat of CATEGORIES) stats[cat.slug] = 0;
  for (const a of ARTICLES) {
    if (!a.is_active) continue;
    const cat = CATEGORIES.find((c) => c.value === a.category);
    if (cat) stats[cat.slug]++;
  }
  return stats;
}

/** Sitemap URL builder (PRD §6.6) */
export function getSitemapEntries() {
  return getAllArticles().flatMap((a) => {
    // 시드한 본문 보유 언어만 alternate
    const availableLangs = Object.entries(a.langs)
      .filter(([_, c]) => c && c.title)
      .map(([k]) => k as LangKey);
    return availableLangs.map((lang) => ({ article: a, lang }));
  });
}
