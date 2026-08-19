import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEPRECATED_ROUTE_LANGS } from '@/lib/i18n';

// SEO: 비타겟(폐기) 언어 경로는 HTTP 410(Gone)으로 응답한다.
// 타겟 = 미국/일본/한국/대만(en/ja/ko/zh-tw). 나머지 6개 언어(de/fr/es/id/pt-br/zh)는
// noindex(200)로 두면 Googlebot이 ~6,200개 URL을 영구히 재크롤하며 크롤 예산을 낭비한다.
// 410은 "영구 삭제"를 알려 재크롤을 끊고 색인에서 빠르게 제거 → 예산이 타겟으로 회수된다.
// 폐기 언어 집합은 lib/i18n.ts 의 DEPRECATED_ROUTE_LANGS(SSOT)를 따른다.
const GONE_LANGS = new Set(DEPRECATED_ROUTE_LANGS.map((l) => l.toLowerCase()));

const GONE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex"><title>410 Gone</title></head>
<body style="font-family:system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem;text-align:center">
<h1>410 — Gone</h1>
<p>This language edition is no longer available. Visit the English edition instead.</p>
<p><a href="/en">HAVIT Blog (English)</a></p>
</body></html>`;

export function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split('/')[1]?.toLowerCase() ?? '';
  if (GONE_LANGS.has(firstSegment)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex',
        // 410은 재검증 없이 캐시돼도 무방 — 폐기 상태는 안정적.
        'cache-control': 'public, max-age=3600',
      },
    });
  }
  return NextResponse.next();
}

// _next 내부·정적 에셋·robots/sitemap·api 는 건드리지 않는다(첫 세그먼트가 언어일 때만 매칭).
export const config = {
  matcher: ['/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
