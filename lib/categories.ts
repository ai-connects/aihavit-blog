/**
 * Category slug ↔ value helpers (SEO crawl-path: /[lang]/category/[slug]).
 *
 * SSOT = ALLOWED_CATEGORIES_V2 (15-enum, lib/articles-v2.ts). Slugs are derived
 * deterministically so they stay in sync with the category enum without a second
 * hand-maintained list. The derived slugs reproduce the existing 12 slugs in
 * lib/i18n.ts CATEGORIES (e.g. 'Diet & Nutrition' → 'diet-and-nutrition') and add
 * the 3 categories missing there (Mental Health & Stress, Gut Health & Microbiome,
 * Longevity & Healthy Aging).
 */

import { ALLOWED_CATEGORIES_V2 } from '@/lib/articles-v2';

/** 'Diet & Nutrition' → 'diet-and-nutrition' (deterministic, URL-safe). */
export function categorySlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface CategoryRef {
  value: string;
  slug: string;
}

/** All 15 categories with their derived slugs, in enum order. */
export const ALL_CATEGORIES: CategoryRef[] = Array.from(ALLOWED_CATEGORIES_V2).map((value) => ({
  value,
  slug: categorySlug(value),
}));

const SLUG_TO_VALUE: Record<string, string> = Object.fromEntries(
  ALL_CATEGORIES.map((c) => [c.slug, c.value]),
);

/** Reverse lookup: slug → category value, or null if unknown. */
export function categoryValueBySlug(slug: string): string | null {
  return SLUG_TO_VALUE[slug] ?? null;
}

export const ALL_CATEGORY_SLUGS: string[] = ALL_CATEGORIES.map((c) => c.slug);
