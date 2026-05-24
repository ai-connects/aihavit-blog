/**
 * Batch2ArticleDetail — 자연스러움 강화판 article 상세 렌더링.
 * markdown 본문 + 14 SEO/GEO 필드.
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import type { Batch2Article, Batch2LangContent } from '@/data/seo-batch-2-articles';

interface Props {
  article: Batch2Article;
  content: Batch2LangContent;
  lang: 'en' | 'ko' | 'ja' | 'zh' | 'zh-CN' | 'zh-TW' | 'es';
}

export default function Batch2ArticleDetail({ article, content, lang }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
      {/* Hero */}
      <header className="mb-8">
        <Link
          href={`/blog/seo-batch-2?lang=${lang}`}
          className="inline-block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 mb-4"
        >
          ← {lang === 'ko' ? 'Batch #2 목록으로' : 'Back to Batch #2'}
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-3xl">{article.category_emoji}</span>
          <span className="text-xs font-mono uppercase text-gray-600 dark:text-gray-400">
            {article.type} · {article.category}
          </span>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-500">{article.reading_time_min} min read</span>
        </div>
        <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-4">
          {content.title}
        </h1>

        {/* TL;DR */}
        <div className="mb-5 p-4 rounded-xl border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20">
          <div className="text-xs font-bold uppercase tracking-wider text-primary-800 dark:text-primary-400 mb-1.5">
            TL;DR
          </div>
          <p className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
            {content.tldr}
          </p>
        </div>

        {content.last_updated && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            🕓 {lang === 'ko' ? '업데이트' : 'Updated'}: <strong>{content.last_updated}</strong>
          </div>
        )}
      </header>

      {/* Markdown body */}
      <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.body_md}</ReactMarkdown>
      </div>

      {/* Key stats */}
      {content.key_stats && content.key_stats.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">📊 {lang === 'ko' ? '핵심 통계' : 'Key Stats'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.key_stats.map((s, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-1">{s.value}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1.5">{s.label}</div>
                {s.source && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 italic">{s.source}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparison table */}
      {content.comparison_table && (
        <section className="mt-12">
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
                      <td key={j} className="px-3 py-2.5 text-gray-700 dark:text-gray-300">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {content.comparison_table.caption && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">{content.comparison_table.caption}</p>
          )}
        </section>
      )}

      {/* FAQ */}
      {content.faq && content.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">❓ {lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}</h2>
          <div className="space-y-3">
            {content.faq.map((q, i) => (
              <details key={i} className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <summary className="cursor-pointer font-semibold list-none flex items-start justify-between gap-3">
                  <span>{q.question}</span>
                  <span aria-hidden className="text-gray-400 group-open:rotate-180 transition-transform mt-0.5">▼</span>
                </summary>
                <div className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{q.answer}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {content.references && content.references.length > 0 && (
        <section className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            {lang === 'ko' ? '참고 자료' : 'References'}
          </h3>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            {content.references.map((r, i) => (
              <li key={i} className="italic">
                {r.title}{r.source && <span className="text-gray-500"> — {r.source}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Reviewer */}
      {content.reviewer && (
        <section className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">{lang === 'ko' ? '검토' : 'Reviewer note'}:</strong>{' '}
          {content.reviewer}
        </section>
      )}
    </article>
  );
}
