'use client';

import { useState } from 'react';
import { type LangKey, t } from '@/lib/i18n';

interface Props {
  lang: LangKey;
}

// PRD §8 LANG_CONTENT_FALLBACK + §16.3 슬라이드업 150ms
export default function FallbackBanner({ lang }: Props) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="bg-amber-100 dark:bg-amber-900/40 border-b border-amber-300 dark:border-amber-700">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <p className="text-sm text-amber-900 dark:text-amber-200">
          ⚠️ {t(lang, 'fallbackBanner')}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="text-amber-900 dark:text-amber-200 hover:opacity-80 px-2 py-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
