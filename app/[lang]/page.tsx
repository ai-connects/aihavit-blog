import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import { searchArticles, getCategoryStats } from '@/lib/articles';
import { toFullLang, type LangKey, t, SUPPORTED_LANGS, toShortLang } from '@/lib/i18n';

export const revalidate = 600;

// 5 primary user-facing langs (KO/EN/JA/ZH-CN/ZH-TW/ES) — extend as content scales
const PRIMARY_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;

export function generateStaticParams() {
  return PRIMARY_LANGS.map((lang) => ({ lang }));
}

interface Props {
  params: { lang: string };
  searchParams: { q?: string; page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!PRIMARY_LANGS.includes(params.lang as any)) return { title: 'Not Found — HAVIT Blog' };
  const fullLang = toFullLang(params.lang);
  const title = 'HAVIT Blog — Science-backed wellness guidance';
  return {
    title,
    description: 'Wellness, nutrition, sleep, movement guides across 35 languages.',
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}`,
      languages: Object.fromEntries(PRIMARY_LANGS.map((l) => [l, `https://blog.aihavit.com/${l}`])),
    },
    openGraph: { title, type: 'website', siteName: 'HAVIT Blog', url: `https://blog.aihavit.com/${params.lang}` },
  };
}

export default function LangBlogIndexPage({ params, searchParams }: Props) {
  if (!PRIMARY_LANGS.includes(params.lang as any)) notFound();
  const lang: LangKey = toFullLang(params.lang);
  const page = parseInt(searchParams.page ?? '1', 10) || 1;
  const query = searchParams.q ?? '';
  const result = searchArticles({ query, lang, page, pageSize: 12 });
  const stats = getCategoryStats();
  const basePath = `/${params.lang}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl leading-tight mb-3">
            HAVIT <span className="text-primary-600 dark:text-primary-400">Blog</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-6">
            Science-backed habit guidance · 12 categories · 35 languages.
          </p>
          <div className="max-w-2xl mb-6">
            <SearchBar lang={lang} initialQuery={query} basePath={basePath} />
          </div>
          <CategoryFilter lang={lang} counts={stats} />
        </section>

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
              {result.articles.map((a) => (
                <ArticleCard key={a.article_id} article={a} lang={lang} featured={false} basePath={basePath} />
              ))}
            </div>
          )}
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            basePath={basePath}
            query={{ q: query }}
            lang={lang}
          />
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
