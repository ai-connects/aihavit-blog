import { redirect } from 'next/navigation';

/** 기존 /blog 진입 → 신규 /ko 구조로 영구 redirect */
export default function BlogIndexRedirect({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams.lang ?? 'ko';
  redirect(`/${lang}`);
}
