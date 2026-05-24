import { redirect } from 'next/navigation';

/** / → /ko (default Korean) */
export default function HomePage() {
  redirect('/ko');
}
