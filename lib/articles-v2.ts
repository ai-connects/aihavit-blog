/**
 * V2 article data layer — reads data/articles/*.json (the live content pipeline output).
 * Each JSON file is one article with 6-lang content + SEO/GEO fields.
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
