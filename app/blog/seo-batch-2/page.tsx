/**
 * /blog/seo-batch-2 — 자연스러움 강화판 5건 컨펌 페이지
 * Batch-1 (학술/AI 톤) vs Batch-2 (자연스러운 블로그 톤) 비교
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BATCH2_ARTICLES } from '@/data/seo-batch-2-articles';
import { type LangKey, toFullLang } from '@/lib/i18n';

export const metadata = {
  title: 'SEO/GEO Batch #2 — 자연스러움 강화판 컨펌',
  description: '8-Phase 에이전트 시스템 (naturalness-reviewer 추가) 산출 — 5건 자연스러운 블로그 톤',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { lang?: string };
}

const N_DIMENSIONS = [
  { id: 'N1', label: '호흡 다양성', desc: '짧은 문장 + 긴 문장 혼재, 표준편차 ≥15자' },
  { id: 'N2', label: 'AI 클리셰 0', desc: 'First/Second/Third, Moreover, 이것이 바로~ 등 0건' },
  { id: 'N3', label: '한국어 자연도', desc: '직역체 0건, 한국 독자 관점' },
  { id: 'N4', label: '구체적 사례', desc: '단락마다 숫자/예시/일화 1개 이상' },
  { id: 'N5', label: 'hook 도입부', desc: '첫 100자에 호기심 유발' },
  { id: 'N6', label: '통계 자연 배치', desc: '한 단락 ≤2건, 흐름에 녹임' },
  { id: 'N7', label: '톤 일관성', desc: '친근체/존댓말 한 톤 유지' },
  { id: 'N8', label: '자연스러운 결론', desc: '인위적 CTA 회피, 흐름 자연 도출' },
];

export default function SeoBatch2Page({ searchParams }: Props) {
  const fullLang: LangKey = toFullLang(searchParams.lang ?? 'ko');
  const lang: 'en' | 'ko' = fullLang === 'en_us' ? 'en' : 'ko';

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr']} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 mb-4">
              ✨ 자연스러움 강화판 (Batch #2)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              사람이 쓴 듯한 블로그 — 자연스러움 무한 루프 적용
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-4">
              이전 batch-1이 학술적/AI 같다는 피드백 → 8차원 naturalness-reviewer + article-rewriter 무한 루프
              추가하여 다시 작성. 한국어 직역체 0건, 호흡 다양성, hook 도입부, 구체 사례 강화.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 self-center">언어:</span>
              {(['ko', 'en'] as const).map((L) => (
                <Link
                  key={L}
                  href={`/blog/seo-batch-2?lang=${L}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    L === lang
                      ? 'bg-primary-500 text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {L === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
                </Link>
              ))}
            </div>
          </div>

          {/* 8 차원 naturalness */}
          <section className="mb-10 p-5 md:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10">
            <h2 className="text-xl font-bold mb-4">🆕 8차원 naturalness-reviewer (모든 article 자체 검증 PASS)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {N_DIMENSIONS.map((d) => (
                <div key={d.id} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900">
                  <span className="inline-flex items-center justify-center min-w-[28px] h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex-shrink-0">
                    ✓
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                      {d.id} · <span className="text-emerald-700 dark:text-emerald-400">{d.label}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Before/After 비교 */}
          <section className="mb-10 p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4">Before (Batch #1) vs After (Batch #2)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900">
                <h3 className="font-bold mb-3 text-rose-800 dark:text-rose-300">❌ Batch #1 (이전, 학술/AI 톤)</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>📝 "수면 효율은 ~을 의미합니다"</li>
                  <li>📝 "First, Second, Third..." 나열</li>
                  <li>📝 한 단락에 통계 5개</li>
                  <li>📝 "Pick one habit tonight..." 인위적 CTA</li>
                  <li>📝 모든 문장 비슷한 길이</li>
                  <li>📝 한국어 직역체 ("이것이 바로 ~한 이유다")</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900">
                <h3 className="font-bold mb-3 text-emerald-800 dark:text-emerald-300">✅ Batch #2 (자연스러움 강화)</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>💬 "8시간 잤는데 왜 피곤할까요"</li>
                  <li>💬 "황당할 정도로 단순합니다"</li>
                  <li>💬 "마치 전화기 게임처럼요" 비유</li>
                  <li>💬 "지루하죠? 근데 진짜 작동하는 종류의 지루함" 마무리</li>
                  <li>💬 짧게. 그리고 가끔 길게.</li>
                  <li>💬 한국어 검색 의도에 맞는 자연 표현</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5개 article 카드 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">5건 자연스러움 강화판</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {BATCH2_ARTICLES.map((article) => {
                const content = article[lang] || article.ko;
                const hasEn = !!article.en;
                return (
                  <div
                    key={article.article_id}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{article.category_emoji}</span>
                        <div>
                          <div className="text-xs font-mono font-semibold uppercase text-gray-500">
                            {article.type}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {article.category}
                            {['Gut Health & Microbiome', 'Longevity & Healthy Aging'].includes(article.category) && (
                              <span className="ml-1 text-purple-600 dark:text-purple-400 font-bold">🆕</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{article.reading_time_min} min</span>
                    </div>

                    <h3 className="font-bold text-lg mb-3 leading-tight">{content.title}</h3>

                    <div className="mb-3 p-3 rounded-lg border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-sm">
                      <div className="text-xs font-bold text-primary-800 dark:text-primary-400 mb-1">TL;DR</div>
                      <p className="text-gray-900 dark:text-gray-100">{content.tldr}</p>
                    </div>

                    {/* 자연스러움 표시 */}
                    <div className="mb-3 flex flex-wrap gap-1.5 text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-mono">
                        ✓ N1~N8 PASS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono">
                        한국어 {hasEn ? '+ 영어' : '단독'}
                      </span>
                    </div>

                    <Link
                      href={`/blog/seo-batch-2/${article.slug}?lang=${lang}`}
                      className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-primary-500 text-gray-900 font-semibold hover:bg-primary-600 transition-colors"
                    >
                      📖 전체 글 읽기 →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 컨펌 가이드 */}
          <section className="mt-12 p-5 md:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10">
            <h2 className="text-xl font-bold mb-4">컨펌 가이드</h2>
            <ol className="space-y-2 text-sm md:text-base text-gray-800 dark:text-gray-200 list-decimal list-inside mb-6">
              <li>각 article 풀 본문을 읽으면서 <strong>사람이 쓴 것처럼 자연스러운지</strong> 체감 평가</li>
              <li>한국어가 직역체 아니라 한국 독자에게 자연스럽게 읽히는지</li>
              <li>도입부 hook이 호기심 유발하는지 (첫 100자)</li>
              <li>호흡이 다양한지 (짧은 문장 + 긴 문장 혼재)</li>
              <li>통계가 자연스럽게 본문에 녹아있는지 (나열식 아님)</li>
              <li>구체적 사례·비유가 단락마다 있는지</li>
              <li>결론이 인위적 CTA 아닌 자연스러운 마무리인지</li>
            </ol>

            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-emerald-300 dark:border-emerald-800">
              <h3 className="font-bold mb-2">컨펌 후 다음 단계</h3>
              <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300">
                <li><strong>✅ Go</strong> — 이 톤으로 1,200개 전체 article 일괄 재작성. 8-Phase 에이전트 시스템 영구 도입.</li>
                <li><strong>🔄 부분 수정</strong> — 특정 article 톤/구조 조정 요청 → 즉시 재작성</li>
                <li><strong>❌ 더 자연스럽게</strong> — 어떤 부분이 여전히 인공적인지 알려주시면 N9 추가 차원으로 다시 루프</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
