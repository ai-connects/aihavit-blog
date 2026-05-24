'use client';

import Link from 'next/link';
import { type LangKey, t } from '@/lib/i18n';

interface Props {
  page: number;
  totalPages: number;
  basePath: string;       // e.g. /blog/en or /blog/en/c/diet-and-nutrition
  query?: Record<string, string | undefined>;
  lang: LangKey;
}

export default function Pagination({ page, totalPages, basePath, query, lang }: Props) {
  if (totalPages <= 1) return null;

  function buildHref(p: number): string {
    const params = new URLSearchParams();
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v && k !== 'page') params.set(k, v);
      }
    }
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const items = pageItems(page, totalPages);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 md:gap-2 mt-8 mb-4"
    >
      {page > 1 ? (
        <Link href={buildHref(page - 1)} className="btn-secondary" rel="prev" aria-label={t(lang, 'prev')}>
          ← {t(lang, 'prev')}
        </Link>
      ) : (
        <span className="btn-secondary opacity-40 pointer-events-none">← {t(lang, 'prev')}</span>
      )}

      <div className="hidden md:flex items-center gap-1">
        {items.map((it, i) =>
          it === '...' ? (
            <span key={i} className="px-2 text-gray-500">…</span>
          ) : (
            <Link
              key={i}
              href={buildHref(it)}
              aria-current={it === page ? 'page' : undefined}
              className={`btn-ghost min-w-[44px] ${it === page ? 'bg-primary-500 text-gray-900 font-bold' : ''}`}
            >
              {it}
            </Link>
          )
        )}
      </div>

      <span className="md:hidden text-sm text-gray-500 px-2">
        {t(lang, 'page')} {page} {t(lang, 'of')} {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={buildHref(page + 1)} className="btn-secondary" rel="next" aria-label={t(lang, 'next')}>
          {t(lang, 'next')} →
        </Link>
      ) : (
        <span className="btn-secondary opacity-40 pointer-events-none">{t(lang, 'next')} →</span>
      )}
    </nav>
  );
}

function pageItems(page: number, totalPages: number): Array<number | '...'> {
  const items: Array<number | '...'> = [];
  const windowSize = 2;
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= page - windowSize && p <= page + windowSize)) {
      items.push(p);
    } else if (items[items.length - 1] !== '...') {
      items.push('...');
    }
  }
  return items;
}
