import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { searchArticles } from '@/lib/articles';
import { type LangKey, toFullLang, toShortLang, t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Search — HAVIT Blog',
  description: 'Search HAVIT wellness articles.',
  robots: { index: false, follow: true }, // 검색 결과 페이지는 noindex 권장
};

interface Props {
  params: { lang: string };
  searchParams: { q?: string; page?: string };
}

export default function SearchPage({ params, searchParams }: Props) {
  const lang: LangKey = toFullLang(params.lang);
  const page = parseInt(searchParams.page ?? '1', 10) || 1;
  const query = searchParams.q ?? '';
  const result = searchArticles({ query, lang, page, pageSize: 12 });
  const short = toShortLang(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl mb-3">🔍 {t(lang, 'search')}</h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-6">
            {query
              ? `${t(lang, 'showingResults')} "${query}" — ${result.total} ${t(lang, 'items')}`
              : t(lang, 'searchPlaceholder')}
          </p>
          <div className="max-w-2xl mb-6">
            <SearchBar lang={lang} initialQuery={query} basePath={`/blog/${short}/search`} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
          {query && result.articles.length === 0 ? (
            <div className="p-12 text-center text-gray-500 rounded-2xl border border-gray-200 dark:border-gray-800">
              {t(lang, 'noResults')}
            </div>
          ) : query ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {result.articles.map((a) => (
                  <ArticleCard key={a.article_id} article={a} lang={lang} />
                ))}
              </div>
              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                basePath={`/blog/${short}/search`}
                query={{ q: query }}
                lang={lang}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 py-12">
              Type to search 50 articles across 12 categories.
            </p>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
