import Link from 'next/link';
import { getAllArticles, resolveContent } from '@/lib/articles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';

// PRD §8.1 — S-004 404 페이지: 추천 article 6개 + 카테고리 홈 링크.
export default function NotFound() {
  const recommended = getAllArticles()
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="en_us" />
      <main className="flex-1 mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">🔍</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Page Not Found</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link href="/blog?lang=en" className="btn-primary">
            ← Back to Blog
          </Link>
        </div>
        <h2 className="text-xl font-bold mb-4">You might like these</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {recommended.map((a) => (
            <ArticleCard key={a.article_id} article={a} lang="en_us" />
          ))}
        </div>
      </main>
      <Footer lang="en_us" />
    </div>
  );
}
