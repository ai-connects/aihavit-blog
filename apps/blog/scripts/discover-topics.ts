/**
 * content-discoverer 자동 실행 — 1,200 article seed 발굴.
 *
 * 입력:
 *   - HAVIT 12 카테고리 (+ 신규 2: Gut Health, Longevity)
 *   - 기존 Django article의 흐직 활용 가능 (옵션)
 *
 * 출력:
 *   - data/article-seeds.json — 1,200 ArticleSeed[]
 */

import { promises as fs } from 'fs';
import path from 'path';
import { complete, safeJsonParse } from './anthropic-client';
import type { ArticleSeed } from './types';

const SEEDS_PATH = path.resolve(__dirname, '../data/article-seeds.json');

// 한 호출당 최대 30건만 (응답 크기 안전). 목표량 = 호출 횟수 결정
const BATCH_SIZE = 30;

const CATEGORIES: Array<{ name: string; emoji: string; targetCount: number }> = [
  { name: 'Tracking & Insights', emoji: '📊', targetCount: 90 },
  { name: 'Mindset & Motivation', emoji: '🧠', targetCount: 100 },
  { name: 'Weight & Metabolism', emoji: '⚖️', targetCount: 110 },
  { name: 'Lifestyle Habits', emoji: '🌿', targetCount: 100 },
  { name: 'Personalized Strategies', emoji: '🎯', targetCount: 90 },
  { name: 'Situational Tips', emoji: '💡', targetCount: 100 },
  { name: 'Diet & Nutrition', emoji: '🥗', targetCount: 130 },
  { name: 'Hydration & Beverages', emoji: '💧', targetCount: 80 },
  { name: 'Health & Conditions', emoji: '🩺', targetCount: 110 },
  { name: 'Medication Guide', emoji: '💊', targetCount: 90 },
  { name: 'Sleep & Recovery', emoji: '😴', targetCount: 100 },
  { name: 'Exercise & Activity', emoji: '💪', targetCount: 110 },
  // 신규 카테고리
  { name: 'Gut Health & Microbiome', emoji: '🦠', targetCount: 50 },
  { name: 'Longevity & Healthy Aging', emoji: '🏃‍♂️', targetCount: 40 },
];

async function discoverBatch(
  category: { name: string; emoji: string },
  batchSize: number,
  batchIdx: number,
  totalBatches: number,
  existingSlugs: string[]
): Promise<ArticleSeed[]> {
  const system = `You are HAVIT's content strategist. Discover article topics that solve real user search intent, not generic content.

Constraints:
- Long-tail search-intent matching (e.g., "수면 효율 90% 달성하는 법" not "수면이 중요한 이유")
- 2025-2026 latest research citations
- Avoid these existing slugs (case-insensitive):
${existingSlugs.slice(0, 30).map((s) => `  - ${s}`).join('\n')}
${existingSlugs.length > 30 ? `  ... (+${existingSlugs.length - 30} more)` : ''}
- Compliance: NO "진단/diagnose/measured/InBody" terms
- HAVIT serves a global health/wellness app with GLP-1 medication support`;

  const user = `Discover ${batchSize} NEW article topics for category "${category.name}" (batch ${batchIdx + 1} of ${totalBatches}).

CRITICAL OUTPUT RULES:
- Your response MUST start with [ and end with ]
- NO prose, NO markdown wrapper, NO explanation before or after
- Exactly ${batchSize} JSON objects in the array
- All string values: escaped quotes (\\") and no raw newlines

Schema for each object:
{
  "slug": "kebab-case-url-2026",
  "category": "${category.name}",
  "category_emoji": "${category.emoji}",
  "type": "guide" | "science" | "tip" | "challenge" | "reference",
  "primary_keyword_en": "long-tail keyword",
  "primary_keyword_ko": "한국어 long-tail",
  "unique_angle": "1-sentence differentiation",
  "authoritative_sources": ["NEJM 2024 ...", "JAMA 2025 ..."],
  "reading_time_min": 10
}

Aim for diverse types and angles. Start your response with [ NOW:`;

  console.log(`[discover] ${category.name} batch ${batchIdx + 1}/${totalBatches} — ${batchSize} topics...`);
  const text = await complete({ system, user, maxTokens: 6000, temperature: 0.8 });
  return safeJsonParse<ArticleSeed[]>(text);
}

async function discoverCategoryTopics(
  category: { name: string; emoji: string; targetCount: number },
  existingSlugs: string[]
): Promise<ArticleSeed[]> {
  const totalBatches = Math.ceil(category.targetCount / BATCH_SIZE);
  const all: ArticleSeed[] = [];
  const seenSlugs = new Set(existingSlugs);

  for (let i = 0; i < totalBatches; i++) {
    const batchSize = Math.min(BATCH_SIZE, category.targetCount - all.length);
    if (batchSize <= 0) break;
    try {
      const batch = await discoverBatch(
        category,
        batchSize,
        i,
        totalBatches,
        Array.from(seenSlugs)
      );
      for (const seed of batch) {
        if (seed.slug && !seenSlugs.has(seed.slug)) {
          all.push(seed);
          seenSlugs.add(seed.slug);
        }
      }
    } catch (e: any) {
      console.warn(`[discover] ${category.name} batch ${i + 1} failed: ${e.message?.slice(0, 100)}`);
      // 한 배치 실패해도 다른 배치 계속
    }
  }
  return all;
}

async function loadEnv(): Promise<void> {
  try {
    const envPath = path.resolve(__dirname, '../.env.local');
    const text = await fs.readFile(envPath, 'utf-8');
    for (const line of text.split('\n')) {
      const match = line.match(/^([A-Z_]+)=(.+)$/);
      if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    console.error('.env.local not found');
    process.exit(1);
  }
}

async function main(): Promise<void> {
  await loadEnv();

  // 기존 article (data/articles/*.json) + batch-2 5건 slug 모두 제외
  const existingSlugs: string[] = [
    'sleep-efficiency-90-percent-protocol-evidence-based',
    'habit-formation-66-days-myth-real-timeline-2026',
    'resistance-training-glp1-muscle-preservation-protocol',
    'gut-microbiome-weight-loss-bacteria-2026-evidence',
    'vo2-max-by-age-longevity-biomarker-target-zones',
  ];
  try {
    const files = await fs.readdir(path.resolve(__dirname, '../data/articles'));
    for (const f of files) {
      if (f.endsWith('.json')) existingSlugs.push(f.replace(/\.json$/, ''));
    }
  } catch {}

  console.log(`[discover] starting with ${existingSlugs.length} existing slugs to avoid`);
  const allSeeds: ArticleSeed[] = [];

  for (const cat of CATEGORIES) {
    const seeds = await discoverCategoryTopics(cat, [...existingSlugs, ...allSeeds.map((s) => s.slug)]);
    allSeeds.push(...seeds);
    console.log(`[discover] ${cat.name}: ${seeds.length} topics (running total: ${allSeeds.length})`);
    // 중간 저장 (한 카테고리 끝날 때마다)
    await fs.mkdir(path.dirname(SEEDS_PATH), { recursive: true });
    await fs.writeFile(SEEDS_PATH, JSON.stringify(allSeeds, null, 2), 'utf-8');
  }

  console.log(`\n[discover] DONE — saved ${allSeeds.length} seeds to ${SEEDS_PATH}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[discover] fatal:', err);
    process.exit(1);
  });
}
