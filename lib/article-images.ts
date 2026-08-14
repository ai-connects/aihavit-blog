/**
 * Article hero artwork.
 *
 * Until now every card and article header rendered a category gradient with an
 * emoji on it — no photography anywhere on the blog. The HAVIT app's article
 * library ships 289 licensed photos on S3; data/article-images.json maps each
 * blog slug to one of them (see scripts/build-article-images.ts for how the
 * assignment is derived and how to regenerate it).
 *
 * The JSON stores bare filenames; the S3 folder is implied by the prefix, which
 * scripts/build-article-images.ts asserts holds for all 1,424 catalog rows:
 *   art_*.jpg  → /image/articles/        (one photo shot for one app article)
 *   IMG_*.jpg  → /image/actions/image/   (shared/topical photo)
 */

import raw from '@/data/article-images.json';
import hubRaw from '@/data/hub-section-images.json';

const S3_ARTICLES = 'https://havit-prod-us-east.s3.us-east-1.amazonaws.com/image/articles/';
const S3_ACTIONS = 'https://havit-prod-us-east.s3.us-east-1.amazonaws.com/image/actions/image/';

const MAP = (raw as { map: Record<string, string> }).map;

/** Shown when a brand-new article has not been through the mapping script yet. */
const GENERIC_FALLBACK = 'IMG_CAT_LIFE.jpg';

const CATEGORY_FALLBACK: Record<string, string> = {
  'Diet & Nutrition': 'IMG_CAT_DIET.jpg',
  'Exercise & Activity': 'IMG_CAT_EX.jpg',
  'Health & Conditions': 'IMG_CAT_HEALTH.jpg',
  'Hydration & Beverages': 'IMG_CAT_HYD.jpg',
  'Lifestyle Habits': 'IMG_CAT_LIFE.jpg',
  'Medication Guide': 'IMG_CAT_MED.jpg',
  'Mindset & Motivation': 'IMG_CAT_MIND.jpg',
  'Personalized Strategies': 'IMG_CAT_PERSONAL.jpg',
  'Situational Tips': 'IMG_CAT_SIT.jpg',
  'Sleep & Recovery': 'IMG_CAT_SLEEP.jpg',
  'Tracking & Insights': 'IMG_CAT_TRACK.jpg',
  'Weight & Metabolism': 'IMG_CAT_WT.jpg',
  'Longevity & Healthy Aging': 'IMG_CAT_HEALTH.jpg',
  'Mental Health & Stress': 'IMG_CAT_MIND.jpg',
  'Gut Health & Microbiome': 'IMG_CAT_DIET.jpg',
};

function toUrl(file: string): string {
  return (file.startsWith('IMG_') ? S3_ACTIONS : S3_ARTICLES) + file;
}

/** Absolute S3 URL of the hero photo for `slug`. Never returns empty. */
export function articleImage(slug: string, category?: string): string {
  const file =
    MAP[slug] ?? (category ? CATEGORY_FALLBACK[category] : undefined) ?? GENERIC_FALLBACK;
  return toUrl(file);
}

/** True when the slug has a real (non-fallback) assignment. */
export function hasArticleImage(slug: string): boolean {
  return Boolean(MAP[slug]);
}

/**
 * The photos are decorative — the headline next to them already carries the
 * meaning — so the alt text stays descriptive of the article rather than
 * inventing a description of a photo we cannot see.
 */
export function articleImageAlt(title: string): string {
  return title;
}

/**
 * 허브 아티클의 섹션별 사진.
 *
 * 히어로를 본문 섹션에 다시 쓰면 한 글 안에서 같은 사진이 서너 번 반복된다.
 * scripts/build-hub-section-images.mjs 가 섹션 제목을 질의로 삼아 히어로와도,
 * 서로와도 겹치지 않는 사진을 미리 배정해 둔다. 인덱스는 body_md 의 h2 순서.
 * 배정이 없으면 null — 호출부가 사진을 생략한다(같은 사진 재사용보다 낫다).
 */
const HUB_MAP = (hubRaw as { map: Record<string, string[]> }).map;

export function hubSectionImage(slug: string, sectionIndex: number): string | null {
  const file = HUB_MAP[slug]?.[sectionIndex];
  return file ? toUrl(file) : null;
}
