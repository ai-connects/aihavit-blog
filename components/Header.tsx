'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { type LangKey, toShortLang, LANG_NATIVE, SUPPORTED_LANGS, t } from '@/lib/i18n';

interface Props {
  lang: LangKey;
  currentSlug?: string | null;
  currentCategorySlug?: string | null;
  availableLangs?: LangKey[];
}

export default function Header({ lang, currentSlug, currentCategorySlug, availableLangs }: Props) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : systemDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    }
  }

  function langHref(target: LangKey): string {
    const short = toShortLang(target);
    if (currentSlug) return `/${short}/${currentSlug}`;
    if (currentCategorySlug) return `/${short}/c/${currentCategorySlug}`;
    return `/${short}`;
  }

  const shortLang = toShortLang(lang);
  const isContentAvailable = (k: LangKey) => (availableLangs ? availableLangs.includes(k) : true);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* ← HAVIT main site link */}
          <a
            href={process.env.NEXT_PUBLIC_MAIN_URL ?? 'https://aihavit.com'}
            className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label="HAVIT main site"
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">HAVIT</span>
          </a>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <Link href={`/${shortLang}`} className="flex items-center gap-2" aria-label="HAVIT Blog Home">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center text-gray-900 font-bold">H</div>
            <span className="font-bold text-lg hidden sm:inline">HAVIT</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">{t(lang, 'blog')}</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link href={`/${shortLang}`} className="btn-ghost">{t(lang, 'home')}</Link>
          <a href="https://app.aihavit.com/" target="_blank" rel="noopener" className="btn-ghost">📱 App</a>
        </nav>

        <div className="flex items-center gap-1">
          {/* Language selector S-008 — PRD §16.4 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label={t(lang, 'language')}
            >
              <span aria-hidden>🌐</span>
              <span className="ml-1 hidden sm:inline text-sm">{LANG_NATIVE[lang]}</span>
            </button>
            {open && (
              <div
                className="absolute right-0 mt-2 w-72 max-h-[60vh] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-1"
                role="listbox"
              >
                <div className="px-3 py-2 text-xs text-gray-500">
                  {t(lang, 'language')}
                </div>
                {SUPPORTED_LANGS.map((k) => {
                  const has = isContentAvailable(k);
                  return (
                    <Link
                      key={k}
                      href={langHref(k)}
                      onClick={() => setOpen(false)}
                      className={`flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        k === lang ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : ''
                      }`}
                      role="option"
                      aria-selected={k === lang}
                    >
                      <span className="text-sm">{LANG_NATIVE[k]}</span>
                      <span className="text-xs text-gray-400">
                        {has ? '✓' : '↪ en'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dark mode toggle S-007 */}
          <button
            type="button"
            onClick={toggleDark}
            className="btn-ghost"
            aria-label={t(lang, 'darkMode')}
            title={t(lang, 'darkMode')}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMobileMenu((v) => !v)}
            className="btn-ghost md:hidden"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-2">
          <a href={process.env.NEXT_PUBLIC_MAIN_URL ?? 'https://aihavit.com'} className="py-2 text-gray-600 dark:text-gray-400">← HAVIT</a>
          <Link href={`/${shortLang}`} className="py-2">{t(lang, 'home')}</Link>
          <a href="https://app.aihavit.com/" target="_blank" rel="noopener" className="py-2">📱 App</a>
        </div>
      )}
    </header>
  );
}
