import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { verifyHmac } from '@/lib/revalidate-hmac';

/**
 * PRD §7.2 + §13.1 W-9 — /api/revalidate.
 * INV-007: HMAC-SHA256. timestamp ±300s replay 방지.
 */
export async function POST(req: NextRequest) {
  const sig = req.headers.get('x-revalidate-signature');
  const ts = req.headers.get('x-revalidate-timestamp');
  const rawBody = await req.text();
  const verify = verifyHmac(rawBody, sig, ts);
  if (!verify.ok) {
    return NextResponse.json({ error: verify.reason }, { status: 401 });
  }

  let payload: { article_id?: string; slug?: string; old_slug?: string | null; action?: 'update' | 'delete'; category?: string; old_category?: string | null; languages?: string[] };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'bad-body' }, { status: 400 });
  }
  if (!payload.article_id || !payload.slug || !payload.action) {
    return NextResponse.json({ error: 'bad-body' }, { status: 400 });
  }

  const tags: string[] = [`article:${payload.article_id}`];
  if (payload.category) tags.push(`category:${payload.category}`);
  if (payload.old_category) tags.push(`category:${payload.old_category}`);
  tags.push('sitemap', 'rss');

  for (const tag of tags) revalidateTag(tag);
  revalidatePath('/blog');
  if (payload.slug) revalidatePath(`/blog/[lang]/${payload.slug}`, 'page');

  // PRD §7.2 [6] IndexNow notify (mock — best-effort)
  let indexnow_notified = false;
  if (process.env.INDEXNOW_KEY) {
    try {
      await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'www.aihavit.com',
          key: process.env.INDEXNOW_KEY,
          keyLocation: `https://www.aihavit.com/${process.env.INDEXNOW_KEY}.txt`,
          urlList: [`https://www.aihavit.com/blog/en/${payload.slug}`],
        }),
        signal: AbortSignal.timeout(5000),
      });
      indexnow_notified = true;
    } catch {
      // silent skip + metric (mock)
    }
  }

  return NextResponse.json({ revalidated: true, tags, indexnow_notified });
}
