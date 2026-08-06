import Link from 'next/link';
import { type LangKey, toShortLang } from '@/lib/i18n';
import { localizedCategory } from '@/lib/category-labels';
import { ALL_CATEGORIES } from '@/lib/categories';

// BLOG_AUTHORITY v1.0.0 (PRD §5.2.3 / §16.2 F-07 옵션 A) — 인라인 i18n.
// lib/i18n.ts 미변경 (INV-010, P0-#2 회피). 6 lang 자체포함.
const FOOTER_I18N: Record<string, { aiTransparency: string }> = {
  en: { aiTransparency: 'AI-assisted research, human-reviewed editorial.' },
  ko: { aiTransparency: 'AI 보조 리서치, 사람이 검토한 콘텐츠.' },
  ja: { aiTransparency: 'AI支援リサーチ、人間による編集レビュー。' },
  zh: { aiTransparency: 'AI辅助研究，人工编辑审核。' },
  'zh-tw': { aiTransparency: 'AI輔助研究，人工編輯審核。' },
  es: { aiTransparency: 'Investigación asistida por IA, edición revisada por humanos.' },
  'pt-br': { aiTransparency: 'Pesquisa assistida por IA, edição revisada por humanos.' },
  id: { aiTransparency: 'Riset dibantu AI, editorial diperiksa manusia.' },
  de: { aiTransparency: 'KI-gestützte Recherche, menschliche Redaktion.' },
  fr: { aiTransparency: 'Recherche assistée par IA, édition révisée par des humains.' },
};

function pickFooterI18n(shortLang: string): { aiTransparency: string } {
  return FOOTER_I18N[shortLang] ?? FOOTER_I18N.en;
}

// SEO crawl-path: sitewide links to the article archive + category hubs so every
// article is ≤2 clicks from any page (fixes GSC "Discovered — currently not indexed").
const LABEL_TOPICS: Record<string, string> = {
  en: 'Topics', ko: '주제', ja: 'トピック', zh: '主题', 'zh-tw': '主題', es: 'Temas',
  'pt-br': 'Tópicos', id: 'Topik', de: 'Themen', fr: 'Thèmes',
};
const LABEL_ALL_ARTICLES: Record<string, string> = {
  en: 'All articles', ko: '전체 아티클', ja: '全記事', zh: '全部文章', 'zh-tw': '全部文章',
  es: 'Todos los artículos', 'pt-br': 'Todos os artigos', id: 'Semua artikel',
  de: 'Alle Artikel', fr: 'Tous les articles',
};

export default function Footer({ lang }: { lang: LangKey }) {
  const shortLang = toShortLang(lang);
  const i18n = pickFooterI18n(shortLang);
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-bold text-2xl mb-3 tracking-tight">HAVIT</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              AI-powered wellness companion for habits, sleep, nutrition, and movement.
            </p>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Product</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://app.aihavit.com/" target="_blank" rel="noopener" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">📱 App</a></li>
              <li><Link href={`/${shortLang}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">📝 Blog</Link></li>
              <li><Link href={`/${shortLang}/articles`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">🗂 {LABEL_ALL_ARTICLES[shortLang] ?? LABEL_ALL_ARTICLES.en}</Link></li>
              <li><Link href="/rss.xml" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">📡 RSS</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">{LABEL_TOPICS[shortLang] ?? LABEL_TOPICS.en}</div>
            <ul className="space-y-2.5 text-sm">
              {ALL_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${shortLang}/category/${c.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {localizedCategory(c.value, shortLang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Company</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://www.aiconnects.me" target="_blank" rel="noopener" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">AI Connect</a></li>
              {/* BLOG_AUTHORITY v1.0.0 (PRD §16.2 / INV-004 / INV-011) — About + Editorial Policy 신규 link */}
              <li><Link href={`/${shortLang}/about`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link href={`/${shortLang}/editorial-policy`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Editorial Policy</Link></li>
              <li><a href="mailto:havit@aihavit.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="https://aihavit.com/privacy.html" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy</a></li>
              <li><a href="https://aihavit.com/terms.html" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        {/* BLOG_AUTHORITY v1.0.0 (PRD §5.2.3 / §16.2 F-07 옵션 A / INV-005) — AI transparency link to editorial policy */}
        <p className="mt-12 text-xs text-gray-500 text-center">
          <Link
            href={`/${shortLang}/editorial-policy`}
            className="hover:text-primary-600 dark:hover:text-primary-400 underline-offset-2 hover:underline transition-colors"
          >
            {i18n.aiTransparency}
          </Link>
        </p>
        <div className="mt-3 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500">
          © 2026 AI Connect Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
