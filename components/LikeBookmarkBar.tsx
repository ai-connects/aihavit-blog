'use client';

import { type LangKey, t } from '@/lib/i18n';

/**
 * PRD §1.3 — Web에서 좋아요/북마크는 App-only (INV-001).
 * UI는 노출하지만 비활성. 클릭 시 안내.
 */
export default function LikeBookmarkBar({ lang }: { lang: LangKey }) {
  function disabledClick() {
    alert(`${t(lang, 'disabled')}\n\nPRD §1.3 Non-Goals — Web is read-only (INV-001).`);
  }
  return (
    <div className="flex items-center gap-2 mt-6">
      <button
        type="button"
        onClick={disabledClick}
        className="inline-flex items-center gap-2 min-h-[44px] px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
        aria-disabled="true"
        title={t(lang, 'disabled')}
      >
        ❤️ {t(lang, 'like')} <span className="text-xs">{t(lang, 'disabled')}</span>
      </button>
      <button
        type="button"
        onClick={disabledClick}
        className="inline-flex items-center gap-2 min-h-[44px] px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
        aria-disabled="true"
        title={t(lang, 'disabled')}
      >
        🔖 {t(lang, 'bookmark')} <span className="text-xs">{t(lang, 'disabled')}</span>
      </button>
    </div>
  );
}
