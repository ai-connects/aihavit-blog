/**
 * /blog/seo-batch-1 — Article Generation Multi-Agent System Batch #1 컨펌 페이지
 *
 * 5건 신규 SEO/GEO article (한/영) — Phase 1-7 멀티 에이전트 파이프라인 산출물.
 * 컨펌 통과 시 이 시스템을 1,200개 전체 + 신규 컨텐츠 발굴에 계속 적용.
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoBatch1Articles, resolveContent } from '@/lib/articles';
import { type LangKey, toFullLang, toShortLang } from '@/lib/i18n';

export const metadata = {
  title: 'Article Generation Agent System — Batch #1 컨펌',
  description: '5건 신규 SEO/GEO 최적화 article (한/영) — Multi-Agent System Phase 1-7 산출물.',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { lang?: string };
}

const PHASE_DESCRIPTIONS = [
  { phase: 'Phase 1', agent: 'content-discoverer', desc: '기존 12 카테고리 + 누락 영역 분석 → 5개 다양한 주제 발굴' },
  { phase: 'Phase 2', agent: 'seo-strategist', desc: '주제별 SEO/GEO 전략, primary/secondary keyword, SERP 약점, H2 outline' },
  { phase: 'Phase 3a', agent: 'article-writer-en', desc: '영어 풀 article 작성 (3,000~5,000자, SEO/GEO 14필드)' },
  { phase: 'Phase 3b', agent: 'article-writer-ko', desc: '한국어 풀 article (자연스러운 한국어, Naver SEO)' },
  { phase: 'Phase 4', agent: 'article-reviewer', desc: '14필드 체크리스트 + 컴플라이언스 + 학술 출처 정확성' },
  { phase: 'Phase 5', agent: 'seo-tagger', desc: '메타/JSON-LD/hreflang/이미지 alt 완성' },
  { phase: 'Phase 6', agent: 'localizer', desc: '한/영 1:1 정합성 + 학술명 보존 검수' },
  { phase: 'Phase 7', agent: 'web-developer', desc: 'data 통합 + 검수 페이지 + lib/articles.ts 연결' },
];

export default function SeoBatch1Page({ searchParams }: Props) {
  const lang: LangKey = toFullLang(searchParams.lang ?? 'ko');
  const short = toShortLang(lang);
  const articles = getSeoBatch1Articles();
  const availableLangs: LangKey[] = ['en_us', 'ko_kr'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} availableLangs={availableLangs} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          {/* Page header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300 mb-4">
              🤖 Article Generation Agent System — Batch #1 (noindex)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Multi-Agent System 산출 — SEO/GEO Article 5건 컨펌
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-4">
              7-Phase 멀티 에이전트 파이프라인이 산출한 5건의 신규 SEO/GEO 최적화 article (한/영).
              <strong> 컨펌 통과 시 이 시스템으로 1,200개 전체 + 신규 카테고리 콘텐츠 발굴을 계속 진행</strong>합니다.
            </p>

            {/* 언어 스위처 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 self-center">언어:</span>
              {availableLangs.map((L) => (
                <Link
                  key={L}
                  href={`/blog/seo-batch-1?lang=${toShortLang(L)}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    L === lang
                      ? 'bg-primary-500 text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {L === 'en_us' ? '🇺🇸 English' : '🇰🇷 한국어'}
                </Link>
              ))}
            </div>
          </div>

          {/* 파이프라인 다이어그램 */}
          <section className="mb-10 p-5 md:p-6 rounded-2xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-900/10">
            <h2 className="text-xl font-bold mb-4">🔄 7-Phase 파이프라인</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {PHASE_DESCRIPTIONS.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                      {p.phase} · <span className="text-purple-700 dark:text-purple-400">{p.agent}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5개 article 카드 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">5건 산출 (다양한 카테고리)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              기존 12 카테고리 3건 + 신규 누락 카테고리 2건 (🆕 Gut Health & Microbiome, Longevity & Healthy Aging).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {articles.map((article) => {
                const resolved = resolveContent(article, lang);
                if (!resolved) return null;
                const c = resolved.content;
                const isNewCategory = ['Gut Health & Microbiome', 'Longevity & Healthy Aging'].includes(article.category);
                return (
                  <div
                    key={article.article_id}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{c.category_emoji}</span>
                        <div>
                          <div className="text-xs font-mono font-semibold uppercase text-gray-500">
                            {article.type}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {article.category}
                            {isNewCategory && <span className="ml-1 text-purple-600 dark:text-purple-400 font-bold">🆕</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 leading-tight">{c.title}</h3>

                    {c.tldr && (
                      <div className="mb-3 p-3 rounded-lg border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-sm">
                        <div className="text-xs font-bold text-primary-800 dark:text-primary-400 mb-1">TL;DR</div>
                        <p className="text-gray-900 dark:text-gray-100 line-clamp-3">{c.tldr}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono mb-4">
                      <div>{c.meta_description ? '✅' : '⚪'} meta_desc</div>
                      <div>{c.tldr ? '✅' : '⚪'} tldr</div>
                      <div>{c.key_stats?.length ? `✅ stats(${c.key_stats.length})` : '⚪ stats'}</div>
                      <div>{c.comparison_table ? `✅ table(${c.comparison_table.rows.length}r)` : '⚪ table'}</div>
                      <div>{c.faq?.length ? `✅ faq(${c.faq.length})` : '⚪ faq'}</div>
                      <div>{c.deep_dive?.blocks?.length ? `✅ blocks(${c.deep_dive.blocks.length})` : '⚪ blocks'}</div>
                      <div>{c.expert_review ? '✅' : '⚪'} review</div>
                      <div>{c.last_updated ? '✅' : '⚪'} updated</div>
                    </div>

                    {c.primary_keyword && (
                      <div className="mb-3 text-xs">
                        <code className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-300">
                          {c.primary_keyword}
                        </code>
                      </div>
                    )}

                    <Link
                      href={`/blog/${short}/${article.slug}`}
                      className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-primary-500 text-gray-900 font-semibold hover:bg-primary-600 transition-colors"
                    >
                      📖 전체 article 보기 →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 컨펌 가이드 */}
          <section className="mt-12 p-5 md:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10">
            <h2 className="text-xl font-bold mb-4">컨펌 후 다음 단계 결정</h2>
            <div className="space-y-4 text-sm md:text-base text-gray-800 dark:text-gray-200">
              <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-emerald-300 dark:border-emerald-800">
                <h3 className="font-bold mb-2 text-emerald-700 dark:text-emerald-400">✅ Go — 시스템 채택 (권장)</h3>
                <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>이 7-Phase 멀티 에이전트 시스템을 영구 도입</li>
                  <li>1,200개 기존 article 일괄 재작성 자동화 (대량 배치 모드)</li>
                  <li>주간/월간 자동 신규 컨텐츠 발굴 (content-discoverer 정기 실행)</li>
                  <li>Django webhook 통한 자동 동기화 (LOCKED PRD §7.2 IndexNow 포함)</li>
                  <li>한/영 우선 적용 후 단계별로 33개 추가 언어로 확장</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-amber-300 dark:border-amber-800">
                <h3 className="font-bold mb-2 text-amber-700 dark:text-amber-400">🔄 부분 수정</h3>
                <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>특정 article의 구조/depth/톤이 마음에 안 들면 → 해당 article만 재생성</li>
                  <li>SEO/GEO 필드 추가/제거 요청 (예: 더 짧은 TL;DR, FAQ 5개로 축소)</li>
                  <li>특정 카테고리 발굴 방향 조정 (예: 여성 건강, 정신 건강 우선)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-rose-300 dark:border-rose-800">
                <h3 className="font-bold mb-2 text-rose-700 dark:text-rose-400">❌ No-Go (방향 자체 변경)</h3>
                <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>완전히 다른 article 구조가 필요하다면 어떤 방향인지 알려주세요</li>
                  <li>또는 에이전트 시스템 자체를 다르게 설계할지 결정</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 검수 체크리스트 */}
          <section className="mt-8 p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-3">검수 체크리스트 (각 article에서 확인)</h2>
            <ol className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li><strong>Title</strong>: long-tail 키워드 자연스럽게 포함, 50~70자</li>
              <li><strong>Meta description</strong>: 150~160자, CTR 매력</li>
              <li><strong>TL;DR</strong>: AI가 발췌해도 의미 통하는 1문장</li>
              <li><strong>Key stats</strong>: 숫자 정확 + 권위 출처 (저자/연도/저널)</li>
              <li><strong>비교 표</strong>: 사용자가 한눈에 의사결정 가능한 구조</li>
              <li><strong>FAQ</strong>: 실제로 검색되는 질문, 답변 단락 1개로 완결</li>
              <li><strong>본문 깊이</strong>: 다른 블로그에 없는 디테일</li>
              <li><strong>출처 권위</strong>: NEJM/JAMA/Nature 등 1차 출처 인용</li>
              <li><strong>한국어 자연스러움</strong>: 직역체 아니라 자연스러운 한국어</li>
              <li><strong>컴플라이언스</strong>: "진단/measured/InBody" 0건</li>
              <li><strong>신규 카테고리 적합성</strong>: 🆕 Gut Health, Longevity가 HAVIT 서비스에 어울리는지</li>
            </ol>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
