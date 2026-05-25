/**
 * V2 article data layer — reads data/articles/*.json (the live content pipeline output).
 * Each JSON file is one article with 6-lang content + SEO/GEO fields.
 *
 * BLOG_AUTHORITY v1.0.0 (PRD §5.2.1 / §6.1 / §7.1 Step 1):
 *   - ArticleAuthor / ArticleReviewer interface 신규
 *   - ArticleV2.author / .reviewer 확장 (선택, default 런타임 주입)
 *   - DEFAULT_AUTHOR / DEFAULT_REVIEWER 상수 (HAVIT Editorial Team / Medical Advisory)
 *   - ALLOWED_CATEGORIES_V2 15-enum guard (E-004 — 빌드 차단)
 *   - YMYL_CATEGORIES_V2 10-set (T1 payload 분기 SSOT)
 *   - data/articles/*.json 파일 1바이트도 변경 없음 (P7 무손실, INV-006)
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';

export interface ArticleV2LangContent {
  title: string;
  meta_description?: string;
  tldr?: string;
  body_md: string;
  key_stats?: Array<{ label: string; value: string; source?: string }>;
  comparison_table?: {
    title: string;
    headers: string[];
    rows: string[][];
    caption?: string;
  } | null;
  faq?: Array<{ question: string; answer: string }>;
  references?: Array<{ text: string; url?: string }> | string;
  last_updated?: string;
}

/** PRD §5.2.1 — 저자 메타 */
export interface ArticleAuthor {
  name: string;
  type: 'Organization' | 'Person';
  url?: string;
}

/** PRD §5.2.1 — 검수자 메타 */
export interface ArticleReviewer {
  name: string;
  credential: string;
  url?: string;
}

export interface ArticleV2 {
  article_id: string;
  slug: string;
  category: string;
  category_emoji?: string;
  type: string;
  reading_time_min?: number;
  primary_keyword_en?: string;
  primary_keyword_ko?: string;
  langs: Record<string, ArticleV2LangContent>;
  published_at?: string;
  updated_at?: string;
  /** PRD §5.2.1 — 런타임 default 주입 (loadAll). JSON 파일에는 없음. */
  author?: ArticleAuthor;
  /** PRD §5.2.1 — 런타임 default 주입 (loadAll). JSON 파일에는 없음. */
  reviewer?: ArticleReviewer;
}

/** PRD §6.4 — DEFAULT_AUTHOR / DEFAULT_REVIEWER */
export const DEFAULT_AUTHOR: ArticleAuthor = {
  name: 'HAVIT Editorial Team',
  type: 'Organization',
};

export const DEFAULT_REVIEWER: ArticleReviewer = {
  name: 'HAVIT Medical Advisory',
  credential: 'Editorial Medical Review Board',
};

/**
 * PRD §6.1 — 15 카테고리 enum SSOT (실DB 1,086건 전수 카운트 기반).
 * E-004 빌드 차단: category가 이 set 외면 throw → 신규 카테고리 무허가 추가 방지.
 */
export const ALLOWED_CATEGORIES_V2: ReadonlySet<string> = new Set([
  'Tracking & Insights',
  'Mindset & Motivation',
  'Weight & Metabolism',
  'Lifestyle Habits',
  'Personalized Strategies',
  'Situational Tips',
  'Diet & Nutrition',
  'Hydration & Beverages',
  'Health & Conditions',
  'Medication Guide',
  'Sleep & Recovery',
  'Exercise & Activity',
  'Mental Health & Stress',
  'Gut Health & Microbiome',
  'Longevity & Healthy Aging',
]);

/**
 * PRD §6.1 / §6.4 — YMYL 10 카테고리 set.
 * JSON-LD T1 (Article + MedicalWebPage) 분기 SSOT.
 */
export const YMYL_CATEGORIES_V2: ReadonlySet<string> = new Set([
  'Weight & Metabolism',
  'Diet & Nutrition',
  'Hydration & Beverages',
  'Health & Conditions',
  'Medication Guide',
  'Sleep & Recovery',
  'Exercise & Activity',
  'Mental Health & Stress',
  'Gut Health & Microbiome',
  'Longevity & Healthy Aging',
]);

export function isYmylCategory(category: string): boolean {
  return YMYL_CATEGORIES_V2.has(category);
}

export const PRIMARY_LANGS = ['en', 'ko', 'ja', 'zh-CN', 'zh-TW', 'es'] as const;
export type PrimaryLang = (typeof PRIMARY_LANGS)[number];

export const SHORT_LANG_TO_DATA: Record<string, PrimaryLang> = {
  en: 'en',
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  es: 'es',
};

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

let _cache: ArticleV2[] | null = null;

function loadAll(): ArticleV2[] {
  if (_cache) return _cache;
  const out: ArticleV2[] = [];
  try {
    const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.json'));
    for (const f of files) {
      try {
        const full = path.join(ARTICLES_DIR, f);
        const raw = readFileSync(full, 'utf-8');
        const parsed = JSON.parse(raw) as ArticleV2;
        if (!parsed.updated_at) {
          const fromContent =
            parsed.langs?.en?.last_updated ??
            parsed.langs?.ko?.last_updated ??
            null;
          parsed.updated_at = fromContent
            ? new Date(fromContent).toISOString()
            : statSync(full).mtime.toISOString();
        }
        if (!parsed.published_at) parsed.published_at = parsed.updated_at;
        // PRD §6.1 / E-004 — 15-enum guard (빌드 차단, 무허가 카테고리 추가 방지)
        if (!ALLOWED_CATEGORIES_V2.has(parsed.category)) {
          throw new Error(
            `Unknown category in ${f}: "${parsed.category}". ` +
              `Allowed: ${Array.from(ALLOWED_CATEGORIES_V2).join(', ')}`,
          );
        }
        // PRD §5.2.1 / §7.1 Step 1 — default author/reviewer 런타임 주입 (JSON 무수정)
        if (!parsed.author) parsed.author = DEFAULT_AUTHOR;
        if (!parsed.reviewer) parsed.reviewer = DEFAULT_REVIEWER;
        out.push(parsed);
      } catch {
        // skip malformed
      }
    }
  } catch {
    // articles dir missing — return empty
  }
  out.sort((a, b) => (b.updated_at ?? '').localeCompare(a.updated_at ?? ''));
  _cache = out;
  return out;
}

export function getAllArticles(): ArticleV2[] {
  return loadAll();
}

export function getArticleBySlug(slug: string): ArticleV2 | null {
  return loadAll().find((a) => a.slug === slug) ?? null;
}

export function resolveContent(
  article: ArticleV2,
  shortLang: string,
): { content: ArticleV2LangContent; usedLang: PrimaryLang; fallback: boolean } | null {
  const target = SHORT_LANG_TO_DATA[shortLang.toLowerCase()] ?? 'en';
  const primary = article.langs[target];
  if (primary && primary.title && primary.body_md) {
    return { content: primary, usedLang: target, fallback: false };
  }
  const en = article.langs['en'];
  if (en && en.title && en.body_md) {
    return { content: en, usedLang: 'en', fallback: true };
  }
  return null;
}

export function getRelatedArticles(article: ArticleV2, limit = 4): ArticleV2[] {
  return loadAll()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): ArticleV2[] {
  return loadAll().filter((a) => a.category === category);
}

export interface ArticleListItem {
  slug: string;
  category: string;
  category_emoji?: string;
  reading_time_min?: number;
  updated_at: string;
  title: string;
  tldr?: string;
  meta_description?: string;
}

export function listArticlesForLang(shortLang: string, limit?: number): ArticleListItem[] {
  const items: ArticleListItem[] = [];
  for (const a of loadAll()) {
    const r = resolveContent(a, shortLang);
    if (!r) continue;
    items.push({
      slug: a.slug,
      category: a.category,
      category_emoji: a.category_emoji,
      reading_time_min: a.reading_time_min,
      updated_at: a.updated_at ?? '',
      title: r.content.title,
      tldr: r.content.tldr,
      meta_description: r.content.meta_description,
    });
    if (limit && items.length >= limit) break;
  }
  return items;
}
