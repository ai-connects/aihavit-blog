/**
 * PRD §7.2 + INV-007 HMAC 검증 (timing-safe compare).
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? '';
const MAX_AGE_SECONDS = 300; // PRD §7.2 [6] replay 방지 ±300s

export interface RevalidatePayload {
  article_id: string;
  slug: string;
  old_slug?: string | null;
  action: 'update' | 'delete';
  languages?: string[];
  category?: string;
  old_category?: string | null;
  timestamp: string;
}

export interface HmacVerifyResult {
  ok: boolean;
  reason?: 'no-secret' | 'no-signature' | 'no-timestamp' | 'bad-signature' | 'replay' | 'bad-body';
}

export function computeSignature(rawBody: string): string {
  return createHmac('sha256', REVALIDATE_SECRET).update(rawBody).digest('hex');
}

export function verifyHmac(
  rawBody: string,
  signatureHeader: string | null,
  timestampHeader: string | null
): HmacVerifyResult {
  if (!REVALIDATE_SECRET) return { ok: false, reason: 'no-secret' };
  if (!signatureHeader) return { ok: false, reason: 'no-signature' };
  if (!timestampHeader) return { ok: false, reason: 'no-timestamp' };
  // timestamp 검증
  const tsNum = parseInt(timestampHeader, 10);
  if (!Number.isFinite(tsNum)) return { ok: false, reason: 'replay' };
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - tsNum) > MAX_AGE_SECONDS) {
    return { ok: false, reason: 'replay' };
  }
  // HMAC 검증 (timing-safe)
  const expected = computeSignature(rawBody);
  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(signatureHeader, 'hex');
    if (a.length !== b.length) return { ok: false, reason: 'bad-signature' };
    if (!timingSafeEqual(a, b)) return { ok: false, reason: 'bad-signature' };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'bad-signature' };
  }
}
