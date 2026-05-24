import Link from 'next/link';
import { type LangKey, toShortLang } from '@/lib/i18n';

export default function Footer({ lang }: { lang: LangKey }) {
  const shortLang = toShortLang(lang);
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
              <li><a href="mailto:help@aiconnects.me" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="https://aihavit.com/privacy.html" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy</a></li>
              <li><a href="https://aihavit.com/terms.html" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500">
          © 2026 AI Connect Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
