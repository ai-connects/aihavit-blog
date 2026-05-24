'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { type LangKey, t, toShortLang } from '@/lib/i18n';

interface Props {
  lang: LangKey;
  initialQuery?: string;
  basePath?: string;
}

export default function SearchBar({ lang, initialQuery = '', basePath }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(initialQuery);
  const debounceRef = useRef<number | null>(null);
  const short = toShortLang(lang);
  const target = basePath ?? `/blog/${short}/search`;

  // PRD §16.3 — client-side debounce 300ms
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const next = new URLSearchParams(params?.toString() ?? '');
      if (value) next.set('q', value);
      else next.delete('q');
      next.delete('page');
      router.replace(`${target}?${next.toString()}`);
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t(lang, 'searchPlaceholder')}
        className="w-full h-12 md:h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={t(lang, 'search')}
      />
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden
      >
        🔍
      </span>
    </div>
  );
}
