/**
 * translate-short-titles — Translate the EN `short_title` field of the 5 new
 * HAVIT differentiation articles into 8 PRIMARY_LANGS (ja/zh-CN/zh-TW/es/
 * pt-BR/id/de/fr).
 *
 * Why a dedicated script: short_title is a tiny string (~50 chars) with strict
 * CTR-optimized phrasing (hooks like "Trap", "Inside", "Beyond"; numbers in
 * parens; brand names verbatim). A general-purpose translator over-translates
 * or loses the hook. This script uses a tight prompt to preserve those.
 *
 * Idempotent: only touches langs[code] entries that lack `short_title`.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { complete } from './anthropic-client';

const ARTICLES_DIR = path.resolve(__dirname, '../data/articles');

const SLUGS = [
  'havit-vs-myfitnesspal-noom-simple-2026',
  'havit-ai-body-composition-92percent-vs-inbody',
  'what-is-k-wellness',
  'glp1-behavior-change-m0-m1-m2',
  'havit-ai-coaching-engine-8steps',
];

interface TargetLang {
  code: string;
  name: string;
  hint: string;
  cap_chars: number;
}

const TARGETS: TargetLang[] = [
  { code: 'ja',    name: 'Japanese',                            hint: '日本語ネイティブの SERP CTR を狙う簡潔なフック',                  cap_chars: 40 },
  { code: 'zh-CN', name: 'Simplified Chinese',                  hint: '简体中文 SERP CTR 优化的简洁吸引点',                              cap_chars: 30 },
  { code: 'zh-TW', name: 'Traditional Chinese',                 hint: '繁體中文 SERP CTR 優化的簡潔吸引點',                              cap_chars: 30 },
  { code: 'es',    name: 'Spanish (Latin America preferred)',   hint: 'gancho conciso para CTR en SERP español',                        cap_chars: 55 },
  { code: 'pt-BR', name: 'Brazilian Portuguese',                hint: 'gancho conciso para CTR no SERP em português brasileiro',        cap_chars: 55 },
  { code: 'id',    name: 'Indonesian',                          hint: 'hook ringkas untuk CTR SERP bahasa Indonesia',                   cap_chars: 55 },
  { code: 'de',    name: 'German',                              hint: 'prägnanter Hook für SERP-CTR auf Deutsch',                       cap_chars: 60 },
  { code: 'fr',    name: 'French',                              hint: 'accroche concise pour le CTR SERP en français',                  cap_chars: 60 },
];

async function loadEnv(): Promise<void> {
  const envPath = path.resolve(__dirname, '../.env.local');
  const text = await fs.readFile(envPath, 'utf-8');
  for (const line of text.split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

async function translateOne(enShort: string, fullEnTitle: string, target: TargetLang): Promise<string | null> {
  const system = `You translate a single short_title for SEO. Output ONE line only, ${target.name}.

CONTEXT:
- The English short_title is a high-CTR Google SERP headline (~50 chars).
- It uses hooks like "Trap", "Inside", "Beyond", numbers in parens, brand names.
- Your job: preserve the hook FEELING in ${target.name} — natural equivalent of the power word.

CRITICAL RULES:
1. Keep numbers, percentages, brand names verbatim: HAVIT, MyFitnessPal, Noom, Simple, InBody, Ozempic, STEP 4, n=70, Fogg, SDT, BMI, AI, GLP-1.
2. Keep parens () around supporting info, just as in the EN version.
3. Target length: ≤ ${target.cap_chars} characters in ${target.name} (the script counts characters, not words).
4. Hook power: ${target.hint}. The translation must hit emotionally — do not soften "Trap", "Inside" etc.; find natural ${target.name} equivalents.
5. Avoid generic "Guide to" / "Introduction to" phrasing.
6. Output ONLY the title — no quotes, no explanation, no markdown, no period at the end.

EN short_title to translate: ${enShort}
EN full title (for context, do NOT translate the full one): ${fullEnTitle}`;

  const text = await complete({
    model: 'claude-sonnet-4-5-20250929',
    system,
    user: `Output the ${target.name} short_title only.`,
    maxTokens: 200,
    temperature: 0.4,
  });
  const cleaned = text.trim().replace(/^["'`]|["'`]$/g, '').replace(/\n.*$/s, '').trim();
  if (!cleaned || cleaned.length > target.cap_chars * 2) return null; // sanity check
  return cleaned;
}

interface Counters { done: number; skipped: number; failed: number; errors: number }

async function processArticle(slug: string, c: Counters): Promise<void> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  let raw: string;
  try { raw = await fs.readFile(filePath, 'utf-8'); } catch { c.errors++; return; }
  let a: any;
  try { a = JSON.parse(raw); } catch { c.errors++; return; }

  const enContent = a.langs?.en;
  const enShort = enContent?.short_title;
  const enFull = enContent?.title;
  if (!enShort || !enFull) {
    console.error(`[skip] ${slug}: no en.short_title`);
    c.errors++;
    return;
  }

  let modified = false;
  const tasks = TARGETS.filter((t) => !a.langs?.[t.code]?.short_title);
  c.skipped += TARGETS.length - tasks.length;

  if (tasks.length === 0) {
    console.log(`[${slug}] all 8 langs already have short_title, skipping`);
    return;
  }

  console.log(`[${slug}] translating ${tasks.length}: ${tasks.map((t) => t.code).join(', ')}`);
  // Run all 8 in parallel — each request is tiny (200 token output)
  const results = await Promise.allSettled(tasks.map((t) => translateOne(enShort, enFull, t)));
  for (let i = 0; i < tasks.length; i++) {
    const r = results[i];
    const t = tasks[i];
    if (r.status === 'fulfilled' && r.value && r.value.length > 5) {
      a.langs[t.code].short_title = r.value;
      modified = true;
      c.done++;
      console.log(`  ${t.code} (${r.value.length}c): ${r.value}`);
    } else {
      c.failed++;
      const reason = r.status === 'rejected' ? `rejected: ${(r.reason as Error)?.message}` : 'no value';
      console.error(`  ${t.code}: FAIL — ${reason}`);
    }
  }

  if (modified) {
    await fs.writeFile(filePath, JSON.stringify(a, null, 2), 'utf-8');
  }
}

async function main(): Promise<void> {
  await loadEnv();
  console.log(`[translate-short-titles] ${SLUGS.length} articles → ${TARGETS.map((t) => t.code).join(', ')}`);
  const c: Counters = { done: 0, skipped: 0, failed: 0, errors: 0 };
  const start = Date.now();
  for (const slug of SLUGS) {
    await processArticle(slug, c);
    const elapsed = Math.round((Date.now() - start) / 1000);
    console.log(`[translate-short-titles] done=${c.done} skipped=${c.skipped} failed=${c.failed} elapsed=${elapsed}s`);
  }
  console.log('\n[translate-short-titles] DONE');
  console.log(JSON.stringify(c, null, 2));
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[translate-short-titles] fatal:', err);
    process.exit(1);
  });
}
