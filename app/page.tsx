import { redirect } from 'next/navigation';

/**
 * PRD §6.1 — `/` 처리:
 * VERIFY-4: 기존 havit-website/index.html (A) 통합 vs (B) 분리 — reviewer 단계 잔여.
 * 프로토타입에서는 (B) 분리 + /blog 진입점 제공: / → /blog/en 으로 302.
 */
export default function HomePage() {
  redirect('/blog?lang=en');
}
