'use client';

import { type LangKey, t } from '@/lib/i18n';

interface Props {
  lang: LangKey;
  articleId: string;
  variant?: 'inline' | 'sticky';
}

/**
 * PRD §16.2 — Button.primary 정량 spec.
 * inline: 화면당 1개. sticky: mobile only (md:hidden), 화면당 1개. 합계 ≤ 2.
 */
export default function InstallCTA({ lang, articleId, variant = 'inline' }: Props) {
  const universalLink = 'https://app.aihavit.com/';

  function handleClick() {
    // PRD §10.3 GA4 click_install_cta — mock
    if (typeof window !== 'undefined') {
      console.log('[mock] GA4 click_install_cta', {
        lang, article_id: articleId, variant,
      });
    }
  }

  if (variant === 'sticky') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur border-t border-gray-200">
        <a
          href={universalLink}
          onClick={handleClick}
          className="btn-primary w-full"
        >
          📱 {t(lang, 'installCta')}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-gray-900 max-w-prose">
      <div className="font-bold text-2xl mb-2">{t(lang, 'installCta')}</div>
      <p className="text-gray-800 mb-5 max-w-prose">{t(lang, 'installCtaSub')}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={universalLink}
          onClick={handleClick}
          className="inline-flex items-center justify-center min-h-[48px] md:min-h-[40px] px-5 rounded-lg bg-gray-900 text-white font-semibold text-base md:text-sm"
        >
          📱 App Store / Play Store
        </a>
      </div>
    </div>
  );
}
