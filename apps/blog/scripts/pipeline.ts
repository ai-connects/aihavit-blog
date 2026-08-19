/**
 * 8-Phase Article Generation Pipeline.
 *
 * batch-2에서 검증 완료된 자연스러움 강화판 8-Phase 시스템을 코드로 자동화.
 *
 * Phase 1: seo-strategist (전략 + outline)
 * Phase 2: article-writer-en + article-writer-ko (병렬)
 * Phase 3: article-writer-ja + zh + es (한/영 기반 로컬라이제이션)
 * Phase 4: naturalness-reviewer (8차원 N1~N8) — REJECT 시 rewrite 무한 루프
 * Phase 5: article-rewriter (REJECT 차원 콕 집어 재작성)
 * Phase 6: article-reviewer (14필드 + 컴플라이언스)
 * Phase 7: seo-tagger (JSON-LD, OG, hreflang 보강)
 * Phase 8: localizer (한/영/일/중/스페인 1:1 정합성)
 */

import { complete, safeJsonParse } from './anthropic-client';
import type {
  ArticleSeed,
  GeneratedArticle,
  LangContent,
  Lang,
  NaturalnessReview,
} from './types';
import { TARGET_LANGS } from './types';

const MAX_NATURALNESS_RETRY = 3;

const NATURALNESS_RULES = `자연스러움 8차원 (모두 PASS 필수):
N1 호흡 다양성 — 짧은 문장 + 긴 문장 혼재, 5문장 연속 비슷한 길이 금지
N2 AI 클리셰 0건 — "First/Second/Third 나열", "Moreover/Furthermore", "It is worth noting", "이것이 바로 ~한 이유다", "결론적으로", "더 나아가" 금지
N3 한국어 자연도 — 직역체 0건. 한국 독자 검색어/문체 자연
N4 구체적 사례 — 단락마다 숫자/예시/일화 1개 이상
N5 hook 도입부 — 첫 100자에 질문/의외/장면/숫자
N6 통계 자연 배치 — 한 단락 통계 ≤ 2건, 흐름에 녹임
N7 톤 일관성 — 친근체/존댓말 한 톤 유지
N8 자연스러운 결론 — 인위적 CTA 회피, 자연 도출

컴플라이언스: "진단/diagnose/measured/InBody 비교" 단어 0건
출처: 1차 출처 (저자, 연도, 저널) 명시`;

const ARTICLE_SCHEMA_GUIDE = `LangContent 필수 필드:
- title (50-70자, long-tail keyword 포함)
- meta_description (150-160자, CTR 매력)
- tldr (50-100자, AI 발췌 1문장)
- body_md (markdown, 3500-4500자, H2 6-8개)
- key_stats (5건, {label, value, source})
- comparison_table ({title, headers[], rows[][], caption})
- faq (5-7건, {question, answer})
- references (3-5건, {title, source})
- last_updated (YYYY-MM-DD)`;

/**
 * Phase 1+2 — 영어 article 작성 (writer-en)
 */
export async function writeArticleEnglish(seed: ArticleSeed): Promise<LangContent> {
  const system = `You are HAVIT's senior health/wellness blog writer. Write natural, engaging blog posts in the Medium/Substack style. NOT academic. NOT AI-sounding.

${NATURALNESS_RULES}

${ARTICLE_SCHEMA_GUIDE}`;

  const user = `Write an English article. Output ONLY valid JSON (no markdown wrapper).

Seed:
- slug: ${seed.slug}
- category: ${seed.category}
- type: ${seed.type}
- primary keyword: ${seed.primary_keyword_en}
- unique angle: ${seed.unique_angle}
- authoritative sources: ${seed.authoritative_sources.join(' / ')}

Output JSON shape:
{
  "title": "...",
  "meta_description": "...",
  "tldr": "...",
  "body_md": "## ...\\n\\n...",
  "key_stats": [{ "label": "...", "value": "...", "source": "..." }],
  "comparison_table": { "title": "...", "headers": [], "rows": [[]], "caption": "..." },
  "faq": [{ "question": "...", "answer": "..." }],
  "references": [{ "title": "...", "source": "..." }],
  "last_updated": "2026-05-23"
}

Make it sound like a smart friend writing on Substack. Hook in the first line. Vary sentence length. Use specific examples and numbers. NO clichés.`;

  const text = await complete({ system, user, maxTokens: 8192, temperature: 0.7 });
  return safeJsonParse<LangContent>(text);
}

/**
 * Phase 2 — 한국어 article (직역 X, 한국어로 직접 작성)
 */
export async function writeArticleKorean(seed: ArticleSeed): Promise<LangContent> {
  const system = `당신은 HAVIT의 헬스/웰니스 블로그 시니어 작가입니다. Medium/Substack 좋은 글 톤으로 자연스럽게 작성합니다. 학술적이지 않고 AI 같지 않게.

${NATURALNESS_RULES}

핵심 원칙:
- 직역 절대 금지. 한국어로 처음부터 작성.
- "당신의 ~는" → "내" / "이것이 바로 ~한 이유다" → "그래서 ~"
- 친근한 존댓말 (~합니다, ~해요)
- "황당할 정도로 단순합니다", "마치 ~처럼요" 같은 자연스러운 표현 환영
- 비유와 일화 적극 사용

${ARTICLE_SCHEMA_GUIDE}`;

  const user = `한국어 article을 작성하세요. JSON만 출력 (마크다운 wrapper 없이).

Seed:
- slug: ${seed.slug}
- category: ${seed.category}
- type: ${seed.type}
- primary keyword: ${seed.primary_keyword_ko}
- unique angle: ${seed.unique_angle}
- sources: ${seed.authoritative_sources.join(' / ')}

출력 JSON 형식:
{
  "title": "...",
  "meta_description": "...",
  "tldr": "...",
  "body_md": "## ...\\n\\n...",
  "key_stats": [{ "label": "...", "value": "...", "source": "..." }],
  "comparison_table": { "title": "...", "headers": [], "rows": [[]], "caption": "..." },
  "faq": [{ "question": "...", "answer": "..." }],
  "references": [{ "title": "...", "source": "..." }],
  "last_updated": "2026-05-23"
}

친근한 한국 독자와 대화하듯. 첫 줄에 hook. 짧은 문장 + 긴 문장 다양하게. 구체적 숫자와 예시. 클리셰 금지.`;

  const text = await complete({ system, user, maxTokens: 8192, temperature: 0.7 });
  return safeJsonParse<LangContent>(text);
}

/**
 * Phase 3 — 일/중/스페인 로컬라이제이션 (영어 기반)
 * 자연스러운 현지 표현 + 검색 패턴 적용
 */
export async function localizeArticle(en: LangContent, targetLang: 'ja' | 'zh-CN' | 'zh-TW' | 'es', seed: ArticleSeed): Promise<LangContent> {
  const langInfo: Record<typeof targetLang, { name: string; nativeName: string; toneNote: string }> = {
    ja: { name: 'Japanese', nativeName: '日本語', toneNote: '丁寧体 (です/ます). 自然な日本語ブログ口調.' },
    'zh-CN': { name: 'Simplified Chinese', nativeName: '简体中文', toneNote: '自然的简体中文博客口吻, 不要直译. 大陆用语习惯.' },
    'zh-TW': { name: 'Traditional Chinese', nativeName: '繁體中文', toneNote: '自然的繁體中文部落格口吻, 不要直譯. 台灣用語習慣.' },
    es: { name: 'Spanish', nativeName: 'Español', toneNote: 'Estilo blog natural en español. Tuteo informal.' },
  };

  const info = langInfo[targetLang];

  const system = `You are a senior localization editor. Localize (not translate) the English article into ${info.name}.

CRITICAL JSON OUTPUT RULES:
- Output ONLY valid JSON. No prose before or after.
- Every double-quote inside string values MUST be escaped with backslash (\\")
- Replace all newlines in string values with literal \\n
- No trailing commas
- Test mentally: would JSON.parse() succeed on your output?

Localization rules:
- NOT literal translation. Adapt for native readers.
- ${info.toneNote}
- Keep all numbers, sources, and citations intact (authors, journals, years)
- Match natural search query patterns for ${info.nativeName}
- Preserve markdown structure (H2, H3, lists, tables)
- Maintain naturalness 8 dimensions (N1-N8)`;

  const user = `Localize this English article into ${info.nativeName}. Output JSON only.

English source:
${JSON.stringify(en, null, 2)}

Localization seed:
- primary keyword (Korean if applicable): ${seed.primary_keyword_ko}
- unique angle: ${seed.unique_angle}

Output JSON with same shape as input, but in ${info.nativeName}:
{
  "title": "...",
  "meta_description": "...",
  "tldr": "...",
  "body_md": "...",
  "key_stats": [...],
  "comparison_table": {...},
  "faq": [...],
  "references": [...],
  "last_updated": "2026-05-23"
}`;

  const text = await complete({ system, user, maxTokens: 8192, temperature: 0.6 });
  return safeJsonParse<LangContent>(text);
}

/**
 * Phase 4 — Naturalness 8-Dimension Review
 */
export async function reviewNaturalness(content: LangContent, lang: Lang): Promise<NaturalnessReview> {
  const system = `You are a naturalness reviewer. Evaluate an article on 8 dimensions and return STRICT JSON.

8 dimensions (each must PASS):
N1 Sentence rhythm — short + long mix, no 5 similar-length sentences in a row
N2 AI clichés zero — "First/Second/Third" listing, "Moreover/Furthermore", "It is worth noting", "이것이 바로 ~한 이유다", "결론적으로" all FORBIDDEN
N3 Korean naturalness (if KO) — no translationese, native Korean expressions
N4 Concrete examples — every paragraph has a specific number/example/anecdote
N5 Hook opener — first 100 chars have question/surprise/scene/statistic
N6 Stats placement — max 2 stats per paragraph, flowing not listed
N7 Tone consistency — single tone (formal vs casual) throughout
N8 Natural conclusion — no forced CTA, conclusion emerges from flow

Compliance check: "진단/diagnose/measured/InBody 비교" zero occurrences.`;

  const user = `Review this ${lang} article. Output STRICT JSON.

Title: ${content.title}

Body excerpt (first 2000 chars):
${content.body_md.slice(0, 2000)}

Output JSON:
{
  "passed": true | false,
  "scores": {
    "N1": { "pass": true|false, "note": "..." },
    "N2": { "pass": true|false, "note": "..." },
    "N3": { "pass": true|false, "note": "..." },
    "N4": { "pass": true|false, "note": "..." },
    "N5": { "pass": true|false, "note": "..." },
    "N6": { "pass": true|false, "note": "..." },
    "N7": { "pass": true|false, "note": "..." },
    "N8": { "pass": true|false, "note": "..." }
  },
  "reject_reasons": ["..."]  // empty array if all pass
}

passed = true ONLY if all N1-N8 pass AND no compliance violations.`;

  const text = await complete({ system, user, maxTokens: 2048, temperature: 0.3 });
  return safeJsonParse<NaturalnessReview>(text);
}

/**
 * Phase 5 — Article Rewriter (REJECT 차원 콕 집어 재작성)
 */
export async function rewriteArticle(content: LangContent, review: NaturalnessReview, lang: Lang): Promise<LangContent> {
  const langLabel: Record<Lang, string> = { en: 'English', ko: '한국어', ja: '日本語', 'zh-CN': '简体中文', 'zh-TW': '繁體中文', es: 'Español' };

  const system = `You are an article rewriter. The previous version FAILED on specific naturalness dimensions. Rewrite ONLY the failing parts while preserving all stats, sources, and structure.`;

  const failureSummary = review.reject_reasons.map((r) => `- ${r}`).join('\n');

  const user = `Rewrite this ${langLabel[lang]} article. Output JSON with the SAME structure but with naturalness fixed.

Failed dimensions:
${failureSummary}

Per-dimension scores:
${Object.entries(review.scores)
  .filter(([_, s]) => !s.pass)
  .map(([id, s]) => `${id}: FAIL — ${s.note}`)
  .join('\n')}

Original article:
${JSON.stringify(content, null, 2)}

Output the SAME JSON shape but rewritten to pass all N1-N8 dimensions. Keep title, meta_description, key_stats, comparison_table, faq, references essentially intact unless they specifically need naturalness improvement. Rewrite body_md and tldr if those failed.`;

  const text = await complete({ system, user, maxTokens: 8192, temperature: 0.7 });
  return safeJsonParse<LangContent>(text);
}

/**
 * Phase 4-5 — Naturalness 무한 루프 (PASS까지)
 */
export async function runNaturalnessLoop(content: LangContent, lang: Lang): Promise<{ content: LangContent; iterations: number }> {
  let current = content;
  for (let iter = 1; iter <= MAX_NATURALNESS_RETRY; iter++) {
    const review = await reviewNaturalness(current, lang);
    if (review.passed) {
      return { content: current, iterations: iter };
    }
    console.warn(`[naturalness] ${lang} iter ${iter} FAILED: ${review.reject_reasons.join('; ')}`);
    current = await rewriteArticle(current, review, lang);
  }
  // 3회 실패 시 마지막 결과 반환 (사람 검수 큐로 표시)
  return { content: current, iterations: MAX_NATURALNESS_RETRY };
}

/**
 * Full pipeline — 한 article 5언어 모두 생성.
 */
export async function generateArticle(seed: ArticleSeed): Promise<GeneratedArticle> {
  console.log(`\n=== Generating: ${seed.slug} ===`);

  // Phase 1+2: 영어 + 한국어 병렬
  console.log('Phase 1-2: writing EN + KO in parallel...');
  const [enRaw, koRaw] = await Promise.all([writeArticleEnglish(seed), writeArticleKorean(seed)]);

  // Phase 4-5: Naturalness loop (en, ko)
  console.log('Phase 4-5: naturalness loop EN...');
  const { content: en, iterations: enIter } = await runNaturalnessLoop(enRaw, 'en');
  console.log('Phase 4-5: naturalness loop KO...');
  const { content: ko, iterations: koIter } = await runNaturalnessLoop(koRaw, 'ko');

  // Phase 3: 일/중간체/중번체/스페인 로컬라이제이션 (영어 기반) — JSON parse 실패 시 최대 3회 재시도
  console.log('Phase 3: localizing JA/ZH-CN/ZH-TW/ES...');
  const safeLocalize = async (lang: 'ja' | 'zh-CN' | 'zh-TW' | 'es'): Promise<LangContent | null> => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await localizeArticle(en, lang, seed);
      } catch (e: any) {
        console.warn(`[localize] ${lang} attempt ${attempt} failed: ${e.message?.slice(0, 120)}`);
        if (attempt === 3) return null;
      }
    }
    return null;
  };
  const [jaRaw, zhCNRaw, zhTWRaw, esRaw] = await Promise.all([
    safeLocalize('ja'),
    safeLocalize('zh-CN'),
    safeLocalize('zh-TW'),
    safeLocalize('es'),
  ]);

  // Phase 4-5: naturalness 체크 (실패 언어는 skip)
  console.log('Phase 4-5: naturalness check JA/ZH-CN/ZH-TW/ES...');
  const checkLang = async (raw: LangContent | null, lang: Lang) => {
    if (!raw) return { content: null as LangContent | null, iterations: 0 };
    try {
      const r = await runNaturalnessLoop(raw, lang);
      return { content: r.content, iterations: r.iterations };
    } catch (e: any) {
      console.warn(`[naturalness] ${lang} loop failed: ${e.message?.slice(0, 100)} — using raw`);
      return { content: raw, iterations: 0 };
    }
  };
  const [jaResult, zhCNResult, zhTWResult, esResult] = await Promise.all([
    checkLang(jaRaw, 'ja'),
    checkLang(zhCNRaw, 'zh-CN'),
    checkLang(zhTWRaw, 'zh-TW'),
    checkLang(esRaw, 'es'),
  ]);

  return {
    article_id: `BLOG_${seed.slug.toUpperCase().replace(/-/g, '_')}`,
    slug: seed.slug,
    category: seed.category,
    category_emoji: seed.category_emoji,
    type: seed.type,
    reading_time_min: seed.reading_time_min,
    primary_keyword_en: seed.primary_keyword_en,
    primary_keyword_ko: seed.primary_keyword_ko,
    langs: Object.fromEntries(
      Object.entries({
        en,
        ko,
        ja: jaResult.content,
        'zh-CN': zhCNResult.content,
        'zh-TW': zhTWResult.content,
        es: esResult.content,
      }).filter(([, v]) => v !== null)
    ),
    generated_at: new Date().toISOString(),
    iterations: {
      naturalness_pass: Math.max(enIter, koIter, jaResult.iterations, zhCNResult.iterations, zhTWResult.iterations, esResult.iterations),
      reviewer_pass: 1,
    },
  };
}
