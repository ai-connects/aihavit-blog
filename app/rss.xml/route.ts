import { NextResponse } from 'next/server';
import { getAllArticles, resolveContent } from '@/lib/articles';

const SITE = 'https://www.aihavit.com';

/**
 * PRD §6.8 — RSS 최신 50개 article (en_us 기준 v1).
 */
export const revalidate = 600;

export function GET() {
  const items = getAllArticles()
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 50)
    .map((a) => {
      const r = resolveContent(a, 'en_us');
      if (!r) return null;
      const url = `${SITE}/blog/en/${a.slug}`;
      return `
    <item>
      <title><![CDATA[${escapeXml(r.content.title)}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description><![CDATA[${escapeXml(r.content.summary ?? '')}]]></description>
    </item>`;
    })
    .filter(Boolean)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HAVIT Blog</title>
    <link>${SITE}</link>
    <description>Wellness, science, and habit guidance from HAVIT.</description>
    <language>en-US</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c] ?? c);
}
