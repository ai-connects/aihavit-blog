/**
 * 10건 배치 테스트 — content-discoverer로 10개 주제 발굴 후 자동 생성.
 *
 * 실행:
 *   npx tsx scripts/test-batch-10.ts
 *
 * 예상: 약 15~25분, 비용 ~$8~12 (10건 × 5언어 × 8-Phase)
 */

import { promises as fs } from 'fs';
import path from 'path';

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
  const { complete, safeJsonParse } = await import('./anthropic-client');
  const { generateArticle } = await import('./pipeline');

  // 1) 5개 카테고리에서 각 2개 = 10개 주제 발굴
  console.log('\n=== Discover 10 topics across diverse categories ===');
  const discoverPrompt = `5개 카테고리 각 2개씩, 10개의 다양한 article 주제를 발굴해주세요.

카테고리:
1. Sleep & Recovery
2. Diet & Nutrition
3. Exercise & Activity
4. Mental Health & Stress (신규)
5. Gut Health & Microbiome (신규)

제약:
- 기존 batch-2 5건과 중복 금지:
  - sleep-efficiency-90-percent-protocol-evidence-based
  - habit-formation-66-days-myth-real-timeline-2026
  - resistance-training-glp1-muscle-preservation-protocol
  - gut-microbiome-weight-loss-bacteria-2026-evidence
  - vo2-max-by-age-longevity-biomarker-target-zones
  - doms-real-cause-recovery-protocol-2026
- 검색 의도가 명확한 long-tail
- 2024~2026 권위 출처 인용 가능

STRICT JSON 배열만 출력. 각 항목 형식:
{
  "slug": "kebab-case-url-2026",
  "category": "Sleep & Recovery",
  "category_emoji": "😴",
  "type": "guide" | "science" | "tip" | "challenge" | "reference",
  "primary_keyword_en": "long-tail",
  "primary_keyword_ko": "한국어",
  "unique_angle": "1문장",
  "authoritative_sources": ["NEJM 2024 ...", "JAMA 2025 ..."],
  "reading_time_min": 10
}`;

  const discoverResponse = await complete({
    system: 'You are HAVIT content strategist. Output strict JSON only.',
    user: discoverPrompt,
    maxTokens: 4096,
    temperature: 0.8,
  });
  const seeds = safeJsonParse<any[]>(discoverResponse);
  console.log(`Discovered ${seeds.length} topics:`);
  for (const s of seeds) console.log(`  - [${s.category}] ${s.slug}`);

  // 2) 10건 병렬 생성
  console.log('\n=== Generate 10 articles in parallel (each = 6 langs) ===');
  console.log('Estimated time: 15~25 min, cost: ~$12\n');

  const start = Date.now();
  const results = await Promise.allSettled(seeds.map((s) => generateArticle(s)));

  // 3) 결과 저장
  await fs.mkdir(path.resolve(__dirname, '../data/articles'), { recursive: true });
  let success = 0;
  let failed = 0;
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const seed = seeds[i];
    if (r.status === 'fulfilled') {
      const outPath = path.resolve(__dirname, '../data/articles', `${r.value.slug}.json`);
      await fs.writeFile(outPath, JSON.stringify(r.value, null, 2));
      const langs = Object.keys(r.value.langs).join(',');
      console.log(`✓ ${r.value.slug} (langs: ${langs})`);
      success++;
    } else {
      console.error(`✗ ${seed.slug}: ${r.reason?.message?.slice(0, 120)}`);
      failed++;
    }
  }

  const elapsed = Math.round((Date.now() - start) / 1000);
  console.log(`\n=== DONE (${elapsed}s) ===`);
  console.log(`success: ${success}/${seeds.length}`);
  console.log(`failed: ${failed}/${seeds.length}`);
  console.log(`\nView all generated articles:`);
  console.log(`  http://localhost:3000/blog/g`);
}

main().catch((e) => {
  console.error('FATAL:', e.message);
  if (e.stack) console.error(e.stack.slice(0, 500));
  process.exit(1);
});
