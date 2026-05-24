import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { searchArticles, getCategoryStats } from '@/lib/articles';
import { categoryBySlug, type LangKey, toFullLang, toShortLang, t } from '@/lib/i18n';
import { buildCategoryMeta } from '@/lib/seo';

export const revalidate = 600;

interface Props {
  params: { lang: string; categorySlug: string };
  searchParams: { q?: string; page?: string };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const cat = categoryBySlug(params.categorySlug);
  if (!cat) return { title: 'Not Found — HAVIT' };
  const lang = toFullLang(params.lang);
  const page = parseInt(searchParams.page ?? '1', 10) || 1;
  return buildCategoryMeta(cat.value, lang, page);
}

export default function CategoryPage({ params, searchParams }: Props) {
  const cat = categoryBySlug(params.categorySlug);
  if (!cat) notFound();
  const lang: LangKey = toFullLang(params.lang);
  const page = parseInt(searchParams.page ?? '1', 10) || 1;
  const query = searchParams.q ?? '';
  const result = searchArticles({ query, category: params.categorySlug, lang, page, pageSize: 12 });
  const stats = getCategoryStats();
  const short = toShortLang(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} currentCategorySlug={params.categorySlug} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
            <a href={`/blog?lang=${short}`} className="hover:underline">Blog</a>
            <span aria-hidden> / </span>
            <span className="text-gray-900 dark:text-gray-100">{cat.value}</span>
          </nav>

          <h1 className="font-bold text-3xl md:text-5xl mb-3">{cat.value}</h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-6">
            {result.total} articles in this category.
          </p>
          <div className="max-w-2xl mb-6">
            <SearchBar lang={lang} initialQuery={query} basePath={`/blog/${short}/c/${params.categorySlug}`} />
          </div>
          <CategoryFilter lang={lang} activeSlug={params.categorySlug} counts={stats} />
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
          {result.articles.length === 0 ? (
            <div className="p-12 text-center text-gray-500 rounded-2xl border border-gray-200 dark:border-gray-800">
              {t(lang, 'noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {result.articles.map((a) => (
                <ArticleCard key={a.article_id} article={a} lang={lang} />
              ))}
            </div>
          )}
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            basePath={`/blog/${short}/c/${params.categorySlug}`}
            query={{ q: query }}
            lang={lang}
          />
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
