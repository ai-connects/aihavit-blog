/**
 * /blog/seo-sample — SEO/GEO 최적화 article 컨펌 페이지
 *
 * 2건 샘플:
 *  1. Semaglutide (위고비) 첫 4주 가이드 — Medical/Guide
 *  2. 단백질 하루 권장량 — Science/Calculator
 *
 * 컨펌 통과 시 1,200개 article 전체에 동일 SEO/GEO 패턴 적용.
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSeoSampleArticles, resolveContent } from '@/lib/articles';
import { type LangKey, toFullLang, toShortLang } from '@/lib/i18n';

export const metadata = {
  title: 'SEO/GEO Optimized Sample — HAVIT Blog 컨펌',
  description: 'SEO/GEO 최적화 article 2건 — 사용자 컨펌용 (noindex).',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { lang?: string };
}

export default function SeoSamplePage({ searchParams }: Props) {
  const lang: LangKey = toFullLang(searchParams.lang ?? 'ko');
  const short = toShortLang(lang);
  const samples = getSeoSampleArticles();
  const availableLangs: LangKey[] = ['en_us', 'ko_kr'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} availableLangs={availableLangs} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 mb-4">
              🎯 SEO/GEO 컨펌 페이지 (noindex)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              SEO/GEO 최적화 article 컨펌 — 2건 샘플
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              아래 2건의 article은 SEO(Google/Naver) + GEO(ChatGPT/Perplexity/Claude/Gemini) 최적화
              관점으로 다시 작성된 샘플입니다. <strong>컨펌 통과 시 1,200개 전체에 동일 패턴 적용</strong>.
              먼저 한국어/영어 모두 검수해주세요.
            </p>

            {/* 언어 스위처 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 self-center">언어:</span>
              {availableLangs.map((L) => (
                <Link
                  key={L}
                  href={`/blog/seo-sample?lang=${toShortLang(L)}`}
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

          {/* SEO/GEO 적용 요소 안내 */}
          <section className="mb-10 p-5 md:p-6 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
            <h2 className="text-xl font-bold mb-3">기존 article vs SEO/GEO 최적화 — 차이점</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2 text-red-700 dark:text-red-400">기존 article (50건)</h3>
                <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                  <li>📝 짧은 title (20~40자)</li>
                  <li>📝 일반적인 summary</li>
                  <li>📝 8개 컨텐츠 키만 (title/summary/mission/action/science/deep_dive/reference/emoji)</li>
                  <li>❌ meta_description 부재</li>
                  <li>❌ TL;DR / Key stats / FAQ / 비교표 부재</li>
                  <li>❌ Expert review / Last updated 부재</li>
                  <li>📝 본문 800~1,500자</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400">SEO/GEO 최적화 (신규 2건)</h3>
                <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                  <li>✅ Long-tail title 50~70자 (검색 의도 매칭)</li>
                  <li>✅ Meta description 150~160자 (CTR 최적화)</li>
                  <li>✅ TL;DR — AI가 발췌하는 첫 청크</li>
                  <li>✅ Key stats — 숫자+출처 (GEO 인용 친화)</li>
                  <li>✅ 비교 표 — 구조화 데이터 (entity-rich)</li>
                  <li>✅ FAQ schema → Google PAA 타겟</li>
                  <li>✅ Expert review (E-E-A-T) + Last updated</li>
                  <li>✅ 본문 2,500~3,500자 + H2/H3 구조</li>
                  <li>✅ 권위 출처 인용 (저자/연도/저널)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2개 샘플 카드 */}
          <section>
            <h2 className="text-xl font-bold mb-4">컨펌 대상 샘플 2건</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {samples.map((article) => {
                const resolved = resolveContent(article, lang);
                if (!resolved) return null;
                const c = resolved.content;
                const blocks = c.deep_dive?.blocks ?? [];

                return (
                  <div
                    key={article.article_id}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-900 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl">{c.category_emoji}</span>
                      <div>
                        <div className="text-xs font-mono font-semibold uppercase text-gray-500">
                          {article.type} · {article.category}
                        </div>
                        <div className="text-xs text-gray-500">Last updated: {c.last_updated}</div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg md:text-xl mb-3 leading-tight">
                      {c.title}
                    </h3>

                    {/* Meta description */}
                    {c.meta_description && (
                      <div className="mb-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          META DESCRIPTION ({c.meta_description.length}자)
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {c.meta_description}
                        </p>
                      </div>
                    )}

                    {/* TL;DR */}
                    {c.tldr && (
                      <div className="mb-3 p-3 rounded-lg border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-sm">
                        <div className="text-xs font-bold text-primary-800 dark:text-primary-400 mb-1">
                          TL;DR (GEO 첫 청크)
                        </div>
                        <p className="text-gray-900 dark:text-gray-100">{c.tldr}</p>
                      </div>
                    )}

                    {/* SEO/GEO 적용 요소 체크리스트 */}
                    <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono">
                      <div>{c.meta_description ? '✅' : '⚪'} meta_description</div>
                      <div>{c.tldr ? '✅' : '⚪'} tldr</div>
                      <div>{c.primary_keyword ? '✅' : '⚪'} primary_keyword</div>
                      <div>{c.secondary_keywords?.length ? `✅ secondary (${c.secondary_keywords.length})` : '⚪ secondary'}</div>
                      <div>{c.key_stats?.length ? `✅ key_stats (${c.key_stats.length})` : '⚪ key_stats'}</div>
                      <div>{c.comparison_table ? `✅ table (${c.comparison_table.rows.length}r)` : '⚪ table'}</div>
                      <div>{c.faq?.length ? `✅ faq (${c.faq.length}q)` : '⚪ faq'}</div>
                      <div>{c.expert_review ? '✅' : '⚪'} expert_review</div>
                      <div>{c.last_updated ? '✅' : '⚪'} last_updated</div>
                      <div>{blocks.length ? `✅ deep_dive (${blocks.length}b)` : '⚪ deep_dive'}</div>
                    </div>

                    {/* Primary keyword + Secondary */}
                    {c.primary_keyword && (
                      <div className="mb-4 text-xs">
                        <div>
                          <span className="font-semibold">primary:</span>{' '}
                          <code className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-300">
                            {c.primary_keyword}
                          </code>
                        </div>
                        {c.secondary_keywords && (
                          <div className="mt-1.5">
                            <span className="font-semibold">secondary:</span>{' '}
                            {c.secondary_keywords.map((k, i) => (
                              <code key={i} className="inline-block mr-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px]">
                                {k}
                              </code>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 상세 보기 */}
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
            <h2 className="text-xl font-bold mb-4">컨펌 가이드 (각 article에서 확인할 것)</h2>
            <ol className="space-y-3 text-sm md:text-base text-gray-800 dark:text-gray-200 list-decimal list-inside">
              <li>
                <strong>Title</strong>: long-tail keyword가 자연스럽게 포함되어 있고, 50~70자인가?
              </li>
              <li>
                <strong>Meta description</strong>: 150~160자, 검색 결과 스니펫에 보일 때 CTR이 나올 만한 문장인가?
              </li>
              <li>
                <strong>TL;DR</strong>: AI(ChatGPT/Perplexity)가 발췌해도 이 한 문장만으로 핵심 답변이 되는가?
              </li>
              <li>
                <strong>Key stats</strong>: 숫자가 정확하고 출처(저널/연도)가 명확한가?
              </li>
              <li>
                <strong>비교 표</strong>: 사용자가 "X vs Y" 검색 시 즉시 답변이 되는 구조인가?
              </li>
              <li>
                <strong>FAQ</strong>: Google "People Also Ask" 에 나올 만한 실제 질문들인가? 답변이 단락 1개로 완결되는가?
              </li>
              <li>
                <strong>본문 깊이</strong>: 다른 블로그에서 못 보는 디테일이 들어가 있는가? (depth signal)
              </li>
              <li>
                <strong>출처 권위</strong>: NEJM, JAMA, JISSN 등 권위 저널 인용이 있는가? (E-E-A-T)
              </li>
              <li>
                <strong>컴플라이언스</strong>: "진단/measured/InBody" 0건, 의료 가이드는 처방의 상의 권유 명시?
              </li>
              <li>
                <strong>한국어 자연스러움</strong>: 한국어 버전이 직역체 아니라 한국 독자에게 자연스럽게 읽히는가?
              </li>
            </ol>

            <div className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-900 border border-emerald-300 dark:border-emerald-800">
              <h3 className="font-bold mb-2">컨펌 후 다음 단계</h3>
              <ul className="text-sm space-y-1.5 text-gray-700 dark:text-gray-300">
                <li><strong>✅ Go</strong> — 1,200개 전체에 동일 SEO/GEO 패턴 적용. 자동화 파이프라인 작성 (각 article의 8개 필드 + 6개 SEO/GEO 필드 채우는 LLM 프롬프트 + Django webhook 동기화).</li>
                <li><strong>🔄 부분 수정</strong> — 특정 요소 (예: TL;DR 더 짧게, FAQ 개수 조정, 비교 표 컬럼 변경) 알려주시면 즉시 보강 후 재컨펌.</li>
                <li><strong>❌ No-go</strong> — 완전히 다른 방향이 필요하면 어떤 방향인지 알려주세요.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
