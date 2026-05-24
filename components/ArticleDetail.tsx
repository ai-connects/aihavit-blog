import type { Article, ArticleContent } from '@/lib/types';
import { type LangKey, toShortLang, t } from '@/lib/i18n';
import CategoryBadge from './CategoryBadge';
import ArticleCard from './ArticleCard';
import InstallCTA from './InstallCTA';
import ReferenceFooter from './ReferenceFooter';
import Sidebar from './Sidebar';
import FallbackBanner from './FallbackBanner';
import { getRelatedArticles } from '@/lib/articles';
import LikeBookmarkBar from './LikeBookmarkBar';

interface Props {
  article: Article;
  content: ArticleContent;
  lang: LangKey;
  fallback: boolean;
}

/** 카테고리별 hero 그라데이션 (ArticleCard와 동기) */
function categoryGradient(category: string): [string, string] {
  const map: Record<string, [string, string]> = {
    'Tracking & Insights': ['#7C3AED', '#A78BFA'],
    'Mindset & Motivation': ['#F59E0B', '#FCD34D'],
    'Weight & Metabolism': ['#EF4444', '#FCA5A5'],
    'Lifestyle Habits': ['#10B981', '#6EE7B7'],
    'Personalized Strategies': ['#3B82F6', '#93C5FD'],
    'Situational Tips': ['#EC4899', '#F9A8D4'],
    'Diet & Nutrition': ['#84CC16', '#BEF264'],
    'Hydration & Beverages': ['#06B6D4', '#67E8F9'],
    'Health & Conditions': ['#F97316', '#FDBA74'],
    'Medication Guide': ['#A855F7', '#D8B4FE'],
    'Sleep & Recovery': ['#6366F1', '#A5B4FC'],
    'Exercise & Activity': ['#14B8A6', '#5EEAD4'],
  };
  return map[category] ?? ['#CDF246', '#ABD033'];
}

/** Article type별 배지 스타일 */
function typeBadgeStyle(type: string): { bg: string; text: string; label: string; icon: string } {
  const map: Record<string, { bg: string; text: string; label: string; icon: string }> = {
    guide: { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-800 dark:text-purple-300', label: 'Guide', icon: '🧭' },
    tip: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-800 dark:text-amber-300', label: 'Tip', icon: '💡' },
    challenge: { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-800 dark:text-rose-300', label: 'Challenge', icon: '🎯' },
    science: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-800 dark:text-blue-300', label: 'Science', icon: '🧬' },
    reference: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-800 dark:text-emerald-300', label: 'Reference', icon: '📚' },
    educational: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-300', label: 'Educational', icon: '📖' },
  };
  return map[type] ?? map.educational;
}

export default function ArticleDetail({ article, content, lang, fallback }: Props) {
  const related = getRelatedArticles(article, lang, 6);
  const blocks = content.deep_dive?.blocks ?? [];
  const tocBlocks = blocks.filter((b) => b.title);
  const showSidebar = tocBlocks.length >= 2; // PRD §16.5 sidebar 조건

  // 읽기 시간 산정 (deep_dive + action.items 합산 / 1200자 ≈ 1분)
  const totalChars =
    (content.summary?.length ?? 0) +
    (content.mission?.length ?? 0) +
    blocks.reduce((sum, b) => sum + (b.body?.length ?? 0), 0) +
    (content.action?.parts ?? []).reduce(
      (sum, p) => sum + p.title.length + (p.items ?? []).reduce((s, i) => s + i.length, 0),
      0
    );
  const minRead = Math.max(2, Math.round(totalChars / 1200));

  const typeBadge = typeBadgeStyle(article.type);
  const [gFrom, gTo] = categoryGradient(article.category);

  return (
    <>
      {fallback && <FallbackBanner lang={lang} />}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10">
        <div className={`grid gap-8 ${showSidebar ? 'lg:grid-cols-[1fr_280px]' : ''}`}>
          <article className="min-w-0">
            {/* HERO IMAGE — gradient + 큰 이모지 (Phase 2 신규) */}
            <div
              className="relative w-full aspect-[2.4/1] rounded-2xl mb-6 overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${gFrom}, ${gTo})` }}
              aria-hidden
            >
              <div className="text-7xl md:text-8xl lg:text-9xl drop-shadow-lg">
                {content.category_emoji ?? '✨'}
              </div>
              {/* type 배지 (hero overlay) */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${typeBadge.bg} ${typeBadge.text} shadow-sm`}>
                  <span aria-hidden>{typeBadge.icon}</span>
                  {typeBadge.label}
                </span>
              </div>
            </div>

            {/* hero header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <CategoryBadge
                  category={article.category}
                  emoji={content.category_emoji}
                  lang={lang}
                />
                <time
                  dateTime={article.published_at}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {new Date(article.published_at).toLocaleDateString(lang.replace('_', '-'), {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
                <span aria-hidden className="text-gray-300 dark:text-gray-700">·</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {minRead} {t(lang, 'minRead')}
                </span>
              </div>
              <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-4 max-w-prose">
                {content.title}
              </h1>

              {/* TL;DR (GEO 첫 청크) */}
              {content.tldr && (
                <div className="mb-5 p-4 rounded-xl border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 max-w-prose">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary-800 dark:text-primary-400 mb-1.5">
                    TL;DR
                  </div>
                  <p className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                    {content.tldr}
                  </p>
                </div>
              )}

              {content.summary && (
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose">
                  {content.summary}
                </p>
              )}

              {/* Expert review (E-E-A-T) + Last updated */}
              {(content.expert_review || content.last_updated) && (
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 max-w-prose">
                  {content.expert_review && (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden>✓</span>
                      <span>
                        Reviewed by <strong className="text-gray-800 dark:text-gray-200">{content.expert_review.reviewer_name}</strong>
                        <span className="text-gray-500 dark:text-gray-500"> · {content.expert_review.credentials}</span>
                      </span>
                    </span>
                  )}
                  {content.last_updated && (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden>🕓</span>
                      <span>Last updated: <strong className="text-gray-800 dark:text-gray-200">{content.last_updated}</strong></span>
                    </span>
                  )}
                </div>
              )}

              {/* LikeBookmark UI (disabled — App-only per INV-001/§1.3) */}
              <LikeBookmarkBar lang={lang} />
            </header>

            {/* Key stats (GEO 인용 통계) */}
            {content.key_stats && content.key_stats.length > 0 && (
              <section className="mb-8 max-w-prose">
                <h2 className="text-2xl font-bold mb-4">📊 Key Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.key_stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <div className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-1">
                        {s.value}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1.5">{s.label}</div>
                      {s.source && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 italic">출처: {s.source}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Comparison table */}
            {content.comparison_table && (
              <section className="mb-8 max-w-prose">
                <h2 className="text-2xl font-bold mb-4">{content.comparison_table.title}</h2>
                <div className="overflow-x-auto -mx-4 md:mx-0 rounded-xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        {content.comparison_table.headers.map((h, i) => (
                          <th key={i} className="text-left px-3 py-2.5 font-semibold whitespace-nowrap border-b border-gray-200 dark:border-gray-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparison_table.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                          {row.map((cell, j) => (
                            <td key={j} className="px-3 py-2.5 text-gray-700 dark:text-gray-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {content.comparison_table.caption && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                    {content.comparison_table.caption}
                  </p>
                )}
              </section>
            )}

            {/* mission */}
            {content.mission && (
              <section className="mb-8 p-5 md:p-6 rounded-2xl bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-800 max-w-prose">
                <div className="text-xs font-bold uppercase tracking-wider text-primary-800 dark:text-primary-400 mb-2">
                  ✨ {t(lang, 'mission')}
                </div>
                <p className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100">
                  {content.mission}
                </p>
              </section>
            )}

            {/* action */}
            {content.action && content.action.parts && content.action.parts.length > 0 && (
              <section className="mb-8 max-w-prose">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <h2 className="text-2xl font-bold">
                    {content.action.section_title ?? t(lang, 'action')}
                  </h2>
                  {content.action.type && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      action.type: {content.action.type}
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  {content.action.parts.map((part) => (
                    <div key={part.part_number} className="p-4 md:p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-500 text-gray-900 text-sm font-bold">
                          {part.part_number}
                        </span>
                        {part.title}
                      </h3>
                      {part.items && (
                        <ul className="space-y-2 ml-1">
                          {part.items.map((item, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300 flex gap-2">
                              <span aria-hidden className="text-primary-700 dark:text-primary-400 mt-1">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* science — PRD §6.5 <details> 접힘 기본 */}
            {content.science && (content.science.question || content.science.mechanism) && (
              <section className="mb-8 max-w-prose">
                <h2 className="text-2xl font-bold mb-4">🔬 {t(lang, 'science')}</h2>
                <details className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between gap-3">
                    <span>{content.science.question}</span>
                    <span aria-hidden className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  {content.science.mechanism && (
                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content.science.mechanism}
                    </p>
                  )}
                </details>
              </section>
            )}

            {/* deep_dive */}
            {content.deep_dive?.enabled && blocks.length > 0 && (
              <section className="mb-8 max-w-prose">
                <h2 className="text-2xl font-bold mb-4">📖 {t(lang, 'deepDive')}</h2>
                <div className="space-y-6">
                  {blocks.map((b, i) => (
                    <section
                      key={i}
                      id={`block-${i}`}
                      className="scroll-mt-24"
                    >
                      <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {b.body}
                      </p>
                    </section>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ (PAA 타겟) */}
            {content.faq && content.faq.length > 0 && (
              <section className="mb-8 max-w-prose" itemScope itemType="https://schema.org/FAQPage">
                <h2 className="text-2xl font-bold mb-4">❓ Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {content.faq.map((q, i) => (
                    <details
                      key={i}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                      className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                    >
                      <summary className="cursor-pointer font-semibold list-none flex items-start justify-between gap-3">
                        <span itemProp="name">{q.question}</span>
                        <span aria-hidden className="text-gray-400 group-open:rotate-180 transition-transform mt-0.5">▼</span>
                      </summary>
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                        className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed"
                      >
                        <span itemProp="text">{q.answer}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* reference footer — PRD §16.4 ReferenceFooter variant */}
            {content.reference && (content.reference.text || content.reference.source) && (
              <ReferenceFooter
                text={content.reference.text}
                source={content.reference.source}
                lang={lang}
              />
            )}

            {/* Install CTA — PRD §16.2 */}
            <InstallCTA lang={lang} articleId={article.article_id} variant="inline" />

            {/* 메타 디버그 패널 — 검수용 (Phase 2 신규) */}
            <details className="mt-8 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 max-w-prose text-sm">
              <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300 select-none">
                🔍 메타 정보 (검수용 — 일반 사용자에게는 숨김 처리 예정)
              </summary>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">article_id</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.article_id}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">type</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.type}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">slug</dt><dd className="font-mono break-all text-gray-800 dark:text-gray-200">{article.slug}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">category</dt><dd className="text-gray-800 dark:text-gray-200">{article.category}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">solution_codes</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.solution_codes}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">image_group_id</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.image_group_id ?? '—'}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">target_s_types</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.target_s_types.join(', ') || '—'}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">target_m_types</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.target_m_types.join(', ') || '—'}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">target_l_problems</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{article.target_l_problems.join(', ') || '—'}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">언어 시드</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{Object.entries(article.langs).filter(([, v]) => v && v.title).map(([k]) => k).join(', ')}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">현재 언어</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{lang}{fallback && ' (fallback ↪ en_us)'}</dd></div>
                <div className="contents"><dt className="font-medium text-gray-500 dark:text-gray-400">deep_dive blocks</dt><dd className="font-mono text-gray-800 dark:text-gray-200">{blocks.length}개</dd></div>
              </dl>
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">렌더링 체크리스트:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>{content.title ? '✅' : '❌'} title</li>
                  <li>{content.summary ? '✅' : '⚪'} summary</li>
                  <li>{content.mission ? '✅' : '⚪'} mission</li>
                  <li>{content.action?.parts?.length ? `✅ action (${content.action.parts.length} parts)` : '⚪ action'}</li>
                  <li>{content.science?.question || content.science?.mechanism ? '✅' : '⚪'} science</li>
                  <li>{content.deep_dive?.enabled && blocks.length > 0 ? `✅ deep_dive (${blocks.length} blocks)` : '⚪ deep_dive'}</li>
                  <li>{content.reference?.text || content.reference?.source ? '✅' : '⚪'} reference</li>
                  <li>{content.category_emoji ? '✅' : '⚪'} category_emoji</li>
                </ul>
              </div>
            </details>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-6">{t(lang, 'relatedArticles')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {related.map((a) => (
                    <ArticleCard key={a.article_id} article={a} lang={lang} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar — PRD §16.5 ≥1024px ∧ S-003 */}
          {showSidebar && (
            <aside className="hidden lg:block">
              <Sidebar blocks={tocBlocks} lang={lang} />
            </aside>
          )}
        </div>
      </div>

      {/* Sticky mobile install CTA */}
      <InstallCTA lang={lang} articleId={article.article_id} variant="sticky" />
    </>
  );
}
