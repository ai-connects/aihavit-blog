import Link from 'next/link';
import { type LangKey, toShortLang } from '@/lib/i18n';

// BLOG_AUTHORITY v1.0.0 (PRD §5.2.3 / §16.2 F-07 옵션 A) — 인라인 i18n.
// lib/i18n.ts 미변경 (INV-010, P0-#2 회피). 6 lang 자체포함.
const FOOTER_I18N: Record<string, { aiTransparency: string }> = {
  en: { aiTransparency: 'AI-assisted research, human-reviewed editorial.' },
  ko: { aiTransparency: 'AI 보조 리서치, 사람이 검토한 콘텐츠.' },
  ja: { aiTransparency: 'AI支援リサーチ、人間による編集レビュー。' },
  zh: { aiTransparency: 'AI辅助研究，人工编辑审核。' },
  'zh-tw': { aiTransparency: 'AI輔助研究，人工編輯審核。' },
  es: { aiTransparency: 'Investigación asistida por IA, edición revisada por humanos.' },
};

function pickFooterI18n(shortLang: string): { aiTransparency: string } {
  return FOOTER_I18N[shortLang] ?? FOOTER_I18N.en;
}

export default function Footer({ lang }: { lang: LangKey }) {
  const shortLang = toShortLang(lang);
  const i18n = pickFooterI18n(shortLang);
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
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
              <li><Link href="/rss.xml" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">📡 RSS</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Company</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://www.aiconnects.me" target="_blank" rel="noopener" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">AI Connect</a></li>
              {/* BLOG_AUTHORITY v1.0.0 (PRD §16.2 / INV-004 / INV-011) — About + Editorial Policy 신규 link */}
              <li><Link href={`/${shortLang}/about`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link href={`/${shortLang}/editorial-policy`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Editorial Policy</Link></li>
              <li><a href="mailto:help@aiconnects.me" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a></li>
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
