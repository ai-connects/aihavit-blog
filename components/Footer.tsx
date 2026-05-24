import Link from 'next/link';
import { type LangKey, toShortLang } from '@/lib/i18n';

export default function Footer({ lang }: { lang: LangKey }) {
  const shortLang = toShortLang(lang);
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-lg mb-2">HAVIT</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-prose">
              Wellness 12 카테고리 · 35 언어 · SEO-friendly SSR + ISR. PRD v0.3.0 LOCKED 기반 프로토타입.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3">Resources</div>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/blog?lang=${shortLang}`} className="hover:underline">Blog</Link></li>
              <li><Link href="/sitemap.xml" className="hover:underline">Sitemap</Link></li>
              <li><Link href="/rss.xml" className="hover:underline">RSS</Link></li>
              <li><Link href="/robots.txt" className="hover:underline">robots.txt</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:underline">Privacy</a></li>
              <li><a href="/terms" className="hover:underline">Terms</a></li>
              <li><a href="https://www.aihavit.com" className="hover:underline">www.aihavit.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
          © 2026 HAVIT · Prototype — not production.
        </div>
      </div>
    </footer>
  );
}
