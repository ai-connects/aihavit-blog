import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { searchArticles, getCategoryStats } from '@/lib/articles';
import { toFullLang, type LangKey, t } from '@/lib/i18n';

export const revalidate = 600; // PRD INV-011

export const metadata: Metadata = {
  title: 'HAVIT Blog — All Articles',
  description: 'Browse wellness, nutrition, sleep, and movement articles in 35 languages.',
  alternates: { canonical: 'https://www.aihavit.com/blog' },
};

interface Props {
  searchParams: { lang?: string; q?: string; page?: string };
}

/**
 * PRD §6.1 /blog — 전체 article 인덱스 + paged URL ?page=N (REJECT-7).
 * S-001 + S-002 통합 (홈 + 전체 목록).
 */
export default function BlogIndexPage({ searchParams }: Props) {
  const lang: LangKey = toFullLang(searchParams.lang ?? 'en');
  const page = parseInt(searchParams.page ?? '1', 10) || 1;
  const query = searchParams.q ?? '';
  const result = searchArticles({ query, lang, page, pageSize: 12 });
  const stats = getCategoryStats();

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        {/* Hero S-001 */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl leading-tight mb-3">
            HAVIT <span className="text-primary-600 dark:text-primary-400">Blog</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-6">
            Science-backed habit guidance · 12 categories · 35 languages.
          </p>
          <div className="max-w-2xl mb-6">
            <SearchBar lang={lang} initialQuery={query} basePath="/blog" />
          </div>
          <CategoryFilter lang={lang} counts={stats} />
        </section>

        {/* Article grid S-002 */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {query
                ? `${t(lang, 'showingResults')} "${query}" — ${result.total} ${t(lang, 'items')}`
                : `Latest · ${result.total} ${t(lang, 'items')}`}
            </h2>
          </div>
          {result.articles.length === 0 ? (
            <div className="p-12 text-center text-gray-500 rounded-2xl border border-gray-200 dark:border-gray-800">
              {t(lang, 'noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {result.articles.map((a, i) => (
                <ArticleCard key={a.article_id} article={a} lang={lang} featured={false} />
              ))}
            </div>
          )}
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            basePath="/blog"
            query={{ lang: searchParams.lang, q: query }}
            lang={lang}
          />
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
