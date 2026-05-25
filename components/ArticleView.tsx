import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ArticleV2, ArticleV2LangContent } from '@/lib/articles-v2';
import InstallCTA from './InstallCTA';
import { toFullLang } from '@/lib/i18n';
// BLOG_AUTHORITY v1.0.0 (PRD §7.3) — 3 신규 import (기존 import 무변경)
import ArticleAuthorBlock from './ArticleAuthorBlock';
import MedicalDisclaimer from './MedicalDisclaimer';
import MedicalArticleJsonLd from './MedicalArticleJsonLd';

interface Props {
  article: ArticleV2;
  content: ArticleV2LangContent;
  shortLang: string;
  fallback: boolean;
}

const L: Record<string, Record<string, string>> = {
  back: { en: '← Back to Blog', ko: '← 블로그로 돌아가기', ja: '← ブログに戻る', zh: '← 返回博客', 'zh-tw': '← 返回網誌', es: '← Volver al blog' },
  tldr: { en: 'TL;DR', ko: '한 줄 요약', ja: '要約', zh: '一句话总结', 'zh-tw': '一句話總結', es: 'En resumen' },
  updated: { en: 'Updated', ko: '업데이트', ja: '更新', zh: '更新', 'zh-tw': '更新', es: 'Actualizado' },
  minRead: { en: 'min read', ko: '분 분량', ja: '分で読める', zh: '分钟阅读', 'zh-tw': '分鐘閱讀', es: 'min de lectura' },
  keyStats: { en: 'Key Stats', ko: '핵심 통계', ja: '主要統計', zh: '关键统计', 'zh-tw': '關鍵統計', es: 'Datos clave' },
  faq: { en: 'Frequently Asked Questions', ko: '자주 묻는 질문', ja: 'よくある質問', zh: '常见问题', 'zh-tw': '常見問題', es: 'Preguntas frecuentes' },
  references: { en: 'References', ko: '참고 자료', ja: '参考資料', zh: '参考资料', 'zh-tw': '參考資料', es: 'Referencias' },
  fallbackBanner: { en: 'Showing English (translation pending for your language).', ko: '영문판을 표시 중입니다 (해당 언어 번역 예정).', ja: '英語版を表示中（翻訳予定）.', zh: '正在显示英文版（翻译中）.', 'zh-tw': '正在顯示英文版（翻譯中）.', es: 'Mostrando inglés (traducción pendiente).' },
};

function label(key: string, shortLang: string): string {
  return L[key]?.[shortLang] ?? L[key]?.en ?? '';
}

export default function ArticleView({ article, content, shortLang, fallback }: Props) {
  const langKey = toFullLang(shortLang === 'zh' ? 'zh-cn' : shortLang);
  const references = Array.isArray(content.references) ? content.references : null;

  return (
    <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8">
        <Link
          href={`/${shortLang}`}
          className="inline-block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 mb-4"
        >
          {label('back', shortLang)}
        </Link>

        {fallback && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm text-amber-900 dark:text-amber-200">
            {label('fallbackBanner', shortLang)}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {article.category_emoji && <span className="text-3xl">{article.category_emoji}</span>}
          <span className="text-xs font-mono uppercase text-gray-600 dark:text-gray-400">
            {article.category}
          </span>
          {article.reading_time_min && (
            <>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs text-gray-500">{article.reading_time_min} {label('minRead', shortLang)}</span>
            </>
          )}
        </div>

        <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-4">
          {content.title}
        </h1>

        {content.tldr && (
          <div className="mb-5 p-4 rounded-xl border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-800 dark:text-primary-400 mb-1.5">
              {label('tldr', shortLang)}
            </div>
            <p className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
              {content.tldr}
            </p>
          </div>
        )}

        {content.last_updated && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            🕓 {label('updated', shortLang)}: <strong>{content.last_updated}</strong>
          </div>
        )}

        {/* BLOG_AUTHORITY v1.0.0 (PRD §7.3 Step 3a) — author/reviewer byline */}
        <div className="mt-3">
          <ArticleAuthorBlock article={article} shortLang={shortLang} />
        </div>
      </header>

      {/* BLOG_AUTHORITY v1.0.0 (PRD §7.3 Step 3b) — Medical disclaimer banner before body */}
      <MedicalDisclaimer shortLang={shortLang} />

      <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.body_md}</ReactMarkdown>
      </div>

      {/* Inline CTA — after main body */}
      <div className="mt-12">
        <InstallCTA lang={langKey} articleId={article.article_id} variant="inline" />
      </div>

      {content.key_stats && content.key_stats.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">📊 {label('keyStats', shortLang)}</h2>
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

      {content.faq && content.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">❓ {label('faq', shortLang)}</h2>
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

      {references && references.length > 0 && (
        <section className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
            {label('references', shortLang)}
          </h3>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            {references.map((r: any, i) => {
              const refTitle = r.title ?? r.text ?? '';
              const refSource = r.source ?? '';
              const refUrl = r.url ?? null;
              const display = refSource ? `${refTitle} — ${refSource}` : refTitle;
              return (
                <li key={i} className="italic">
                  {refUrl ? (
                    <a href={refUrl} target="_blank" rel="noopener" className="hover:underline">{display}</a>
                  ) : (
                    display
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Sticky CTA — mobile only */}
      <InstallCTA lang={langKey} articleId={article.article_id} variant="sticky" />

      {/* BLOG_AUTHORITY v1.0.0 (PRD §7.3 Step 3e) — JSON-LD schema injection */}
      <MedicalArticleJsonLd article={article} content={content} shortLang={shortLang} />
    </article>
  );
}
