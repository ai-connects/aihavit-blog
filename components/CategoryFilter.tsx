'use client';

import Link from 'next/link';
import { type LangKey, toShortLang, CATEGORIES } from '@/lib/i18n';
import { CATEGORY_COLORS } from './CategoryBadge';

interface Props {
  lang: LangKey;
  activeSlug?: string | null;
  emojis?: Record<string, string>;
  counts?: Record<string, number>;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  c01: '📊', c02: '🔁', c03: '⚖️', c04: '🌙',
  c05: '🦉', c06: '🍽️', c07: '🍗', c08: '💧',
  c09: '🩸', c10: '💊', c11: '😴', c12: '🏃',
};

export default function CategoryFilter({ lang, activeSlug, counts }: Props) {
  const short = toShortLang(lang);
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible">
      <Link
        href={`/blog?lang=${short}`}
        className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
          !activeSlug
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((c) => {
        const isActive = activeSlug === c.slug;
        const color = CATEGORY_COLORS[c.id];
        const count = counts?.[c.slug] ?? 0;
        return (
          <Link
            key={c.id}
            href={`/blog/${short}/c/${c.slug}`}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              isActive
                ? 'text-white border-transparent'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            style={isActive ? { backgroundColor: color } : { color }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span aria-hidden>{CATEGORY_EMOJIS[c.id]}</span>
            <span>{c.value}</span>
            {count > 0 && (
              <span className={`text-xs ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
