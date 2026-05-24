/**
 * Google Analytics 4 — cross-domain tracking enabled.
 *
 * 환경 변수: NEXT_PUBLIC_GA_ID (예: G-XXXXXXXXXX)
 *   값이 없으면 렌더링 안 함 (개발 환경 안전).
 *
 * Cross-domain: aihavit.com ↔ blog.aihavit.com 세션 연속성 보장.
 */

import Script from 'next/script';

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            linker: {
              domains: ['aihavit.com', 'www.aihavit.com', 'blog.aihavit.com', 'app.aihavit.com', 'aiconnects.me', 'www.aiconnects.me']
            }
          });
        `}
      </Script>
    </>
  );
}
