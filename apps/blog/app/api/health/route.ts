import { NextResponse } from 'next/server';

// PRD §6.1 /api/health
export function GET() {
  return NextResponse.json({
    ok: true,
    version: '0.3.0-prototype',
    locked_prd: 'HAVIT_BlogSEO_PRD_v0.3.0_LOCKED.md',
    ts: new Date().toISOString(),
  });
}
