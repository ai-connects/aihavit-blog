/**
 * /blog/sample — Type별 검수 페이지 (사용자 시각 검수용)
 *
 * 5종 type (guide/tip/challenge/science/reference) 샘플을 한 페이지에 모아
 * 어떤 article이든 ArticleEntity 8개 컨텐츠 키가 모두 정상 렌더링되는지 확인.
 */

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSampleArticlesByType, resolveContent } from '@/lib/articles';
import { SAMPLE_TYPES } from '@/data/sample-by-type';
import { toShortLang, type LangKey, toFullLang, SUPPORTED_LANGS, FALLBACK_LANG } from '@/lib/i18n';

export const metadata = {
  title: 'Article Type Sample — HAVIT Blog Prototype 검수',
  description: '5종 article type별 샘플 비교 페이지 (검수용, noindex)',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { lang?: string };
}

function typeColor(type: string): string {
  return (
    {
      guide: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
      tip: 'border-amber-500 bg-amber-50 dark:bg-amber-900/20',
      challenge: 'border-rose-500 bg-rose-50 dark:bg-rose-900/20',
      science: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
      reference: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    }[type] ?? 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
  );
}

export default function SampleByTypePage({ searchParams }: Props) {
  const lang: LangKey = toFullLang(searchParams.lang ?? 'en');
  const short = toShortLang(lang);
  const samples = getSampleArticlesByType();
  const availableLangs: LangKey[] = ['en_us', 'ko_kr', 'ja_jp'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} availableLangs={availableLangs} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          {/* Page header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-300 mb-4">
              🔍 검수 페이지 (noindex)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Article Type별 샘플 검수
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              5종 article type 각각의 샘플 1건씩 (총 5건). 어떤 type이든 ArticleEntity 8개 컨텐츠 키
              (title / summary / mission / action / science / deep_dive / reference / category_emoji)가
              완전히 렌더링되는지 비교 가능합니다. 모든 샘플은 ko_kr / en_us / ja_jp 풀 시드.
            </p>

            {/* 언어 스위처 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 self-center">언어:</span>
              {availableLangs.map((L) => (
                <Link
                  key={L}
                  href={`/blog/sample?lang=${toShortLang(L)}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    L === lang
                      ? 'bg-primary-500 text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {L === 'en_us' ? '🇺🇸 English' : L === 'ko_kr' ? '🇰🇷 한국어' : '🇯🇵 日本語'}
                </Link>
              ))}
            </div>
          </div>

          {/* Type 개요 표 */}
          <section className="mb-10 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">5종 Type 개요</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-semibold">Type</th>
                  <th className="text-left py-2 px-3 font-semibold">설명</th>
                  <th className="text-left py-2 px-3 font-semibold">강조 섹션</th>
                  <th className="text-left py-2 px-3 font-semibold">샘플</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_TYPES.map((t) => {
                  const sample = samples.find((s) => s.type === t.key);
                  const resolved = sample ? resolveContent(sample, lang) : null;
                  return (
                    <tr key={t.key} className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-3">
                        <span className="font-mono font-semibold">{t.emoji} {t.label}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{t.desc}</td>
                      <td className="py-3 px-3 text-xs text-gray-600 dark:text-gray-400">
                        {t.key === 'guide' && 'action.parts (다단)'}
                        {t.key === 'tip' && 'summary + mission'}
                        {t.key === 'challenge' && 'mission + action'}
                        {t.key === 'science' && 'science + deep_dive'}
                        {t.key === 'reference' && 'deep_dive (다수) + reference'}
                      </td>
                      <td className="py-3 px-3">
                        {sample && resolved && (
                          <Link
                            href={`/blog/${short}/${sample.slug}`}
                            className="inline-flex items-center gap-1 text-primary-700 dark:text-primary-400 hover:underline font-medium"
                          >
                            {resolved.content.title.slice(0, 40)}… →
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* 5개 샘플 카드 + 섹션 체크리스트 */}
          <section>
            <h2 className="text-xl font-bold mb-4">샘플 5건 — 섹션 렌더링 체크리스트</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              각 카드의 ✅ 표시는 해당 컨텐츠 키가 실제로 데이터를 가지고 있고 렌더링됨을 의미합니다. ⚪는 데이터 없음(렌더링 건너뜀).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {samples.map((article) => {
                const resolved = resolveContent(article, lang);
                if (!resolved) return null;
                const c = resolved.content;
                const blocks = c.deep_dive?.blocks ?? [];
                const tcheck = (v: unknown) => (v ? '✅' : '⚪');
                return (
                  <div
                    key={article.article_id}
                    className={`border-l-4 ${typeColor(article.type)} rounded-r-lg p-5 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden>{c.category_emoji}</span>
                        <span className="text-xs font-mono font-semibold uppercase text-gray-600 dark:text-gray-400">
                          {article.type}
                        </span>
                      </div>
                      {resolved.fallback && (
                        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">
                          EN fallback
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                      {c.summary}
                    </p>

                    {/* 체크리스트 */}
                    <div className="text-xs space-y-1 mb-4">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono">
                        <div>{tcheck(c.title)} title</div>
                        <div>{tcheck(c.summary)} summary</div>
                        <div>{tcheck(c.mission)} mission</div>
                        <div>
                          {c.action?.parts?.length
                            ? `✅ action (${c.action.parts.length}p${c.action.type ? `/${c.action.type}` : ''})`
                            : '⚪ action'}
                        </div>
                        <div>{tcheck(c.science?.question || c.science?.mechanism)} science</div>
                        <div>
                          {c.deep_dive?.enabled && blocks.length > 0
                            ? `✅ deep_dive (${blocks.length})`
                            : '⚪ deep_dive'}
                        </div>
                        <div>{tcheck(c.reference?.text || c.reference?.source)} reference</div>
                        <div>{tcheck(c.category_emoji)} emoji</div>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <Link
                      href={`/blog/${short}/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline"
                    >
                      상세 페이지 열기 →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 사용자 액션 가이드 */}
          <section className="mt-12 p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
            <h2 className="text-xl font-bold mb-3">검수 가이드</h2>
            <ol className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>
                위 5개 카드 각각의 <strong>상세 페이지 열기</strong> 링크를 클릭하여 type별 article이
                완전히 표시되는지 확인.
              </li>
              <li>
                각 상세 페이지에서 <strong>🔍 메타 정보 (검수용)</strong> 패널을 열어 8개 컨텐츠 키
                렌더링 체크리스트 확인.
              </li>
              <li>
                <strong>한국어 / English / 日本語</strong> 3개 언어 모두 동일하게 표시되는지 위 언어
                스위처로 전환하며 검증.
              </li>
              <li>
                Chrome DevTools Device toolbar로 <strong>320 / 768 / 1024 / 1440</strong> 4 breakpoint
                반응형 확인.
              </li>
              <li>
                특정 type/section에서 문제 발견 시 알려주시면 즉시 수정. 만족하면 go 판단 →
                developer 에이전트로 진입.
              </li>
            </ol>
          </section>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
