import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCardV2 from '@/components/ArticleCardV2';
import { listArticlesForLang, getAllArticles, resolveContent } from '@/lib/articles-v2';
import { localizedCategory } from '@/lib/category-labels';
import { toFullLang } from '@/lib/i18n';

export const revalidate = 600;

const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es', 'pt-br', 'id', 'de', 'fr'] as const;
type RouteLang = (typeof ROUTE_LANGS)[number];

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

interface Props {
  params: { lang: string };
  searchParams: { q?: string; cat?: string; page?: string };
}

const HERO_TAGLINE: Record<RouteLang, string> = {
  ko: '습관, 수면, 영양, 운동에 관한 과학 기반 가이드.',
  en: 'Science-backed guides on habits, sleep, nutrition, and movement.',
  ja: '習慣・睡眠・栄養・運動に関する科学的根拠ベースのガイド。',
  zh: '关于习惯、睡眠、营养和运动的科学指南。',
  'zh-tw': '關於習慣、睡眠、營養和運動的科學指南。',
  es: 'Guías basadas en ciencia sobre hábitos, sueño, nutrición y movimiento.',
  'pt-br': 'Guias baseados em ciência sobre hábitos, sono, nutrição e movimento.',
  id: 'Panduan berbasis sains tentang kebiasaan, tidur, nutrisi, dan gerakan.',
  de: 'Wissenschaftlich fundierte Guides zu Gewohnheiten, Schlaf, Ernährung und Bewegung.',
  fr: 'Guides fondés sur la science pour les habitudes, le sommeil, la nutrition et le mouvement.',
};

const SEARCH_PLACEHOLDER: Record<RouteLang, string> = {
  ko: '검색...', en: 'Search...', ja: '検索...', zh: '搜索...', 'zh-tw': '搜尋...', es: 'Buscar...',
  'pt-br': 'Buscar...', id: 'Cari...', de: 'Suchen...', fr: 'Rechercher...',
};

const LABEL_ALL: Record<RouteLang, string> = {
  ko: '전체', en: 'All', ja: 'すべて', zh: '全部', 'zh-tw': '全部', es: 'Todo',
  'pt-br': 'Tudo', id: 'Semua', de: 'Alle', fr: 'Tout',
};

const LABEL_LATEST: Record<RouteLang, string> = {
  ko: '최신', en: 'Latest', ja: '最新', zh: '最新', 'zh-tw': '最新', es: 'Recientes',
  'pt-br': 'Recentes', id: 'Terbaru', de: 'Neueste', fr: 'Récents',
};

const LABEL_NO_RESULTS: Record<RouteLang, string> = {
  ko: '검색 결과가 없습니다.', en: 'No results found.', ja: '結果が見つかりません.', zh: '没有找到结果.', 'zh-tw': '沒有找到結果.', es: 'No se encontraron resultados.',
  'pt-br': 'Nenhum resultado.', id: 'Tidak ada hasil.', de: 'Keine Ergebnisse.', fr: 'Aucun résultat.',
};

const LABEL_ITEMS: Record<RouteLang, string> = {
  ko: '건', en: 'articles', ja: '件', zh: '篇', 'zh-tw': '篇', es: 'artículos',
  'pt-br': 'artigos', id: 'artikel', de: 'Artikel', fr: 'articles',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) return { title: 'Not Found — HAVIT Blog' };
  const title = 'HAVIT Blog — Science-backed wellness guidance';
  return {
    title,
    description: HERO_TAGLINE[params.lang as RouteLang],
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}`,
      languages: Object.fromEntries(ROUTE_LANGS.map((l) => [l, `https://blog.aihavit.com/${l}`])),
    },
    openGraph: { title, type: 'website', siteName: 'HAVIT Blog', url: `https://blog.aihavit.com/${params.lang}` },
  };
}

const PAGE_SIZE = 12;

export default function BlogIndexPage({ params, searchParams }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) notFound();
  const shortLang = params.lang;
  const lang = toFullLang(shortLang === 'zh-tw' ? 'zh-tw' : shortLang === 'zh' ? 'zh-cn' : shortLang);
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1);
  const query = (searchParams.q ?? '').trim().toLowerCase();
  const category = searchParams.cat ?? '';

  let items = listArticlesForLang(shortLang);
  if (category) items = items.filter((i) => i.category === category);
  if (query) {
    items = items.filter((i) =>
      i.title.toLowerCase().includes(query) ||
      (i.tldr ?? '').toLowerCase().includes(query) ||
      (i.meta_description ?? '').toLowerCase().includes(query),
    );
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = items.slice(start, start + PAGE_SIZE);

  const allArticles = getAllArticles();
  const categoryCounts = new Map<string, { count: number; emoji?: string }>();
  for (const a of allArticles) {
    const r = resolveContent(a, shortLang);
    if (!r) continue;
    const prev = categoryCounts.get(a.category) ?? { count: 0, emoji: a.category_emoji };
    categoryCounts.set(a.category, { count: prev.count + 1, emoji: a.category_emoji ?? prev.emoji });
  }
  const categories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1].count - a[1].count);

  const basePath = `/${shortLang}`;

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('cat', category);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl leading-tight mb-3">
            HAVIT <span className="text-primary-600 dark:text-primary-400">Blog</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-6">
            {HERO_TAGLINE[shortLang as RouteLang]}
          </p>

          <form className="max-w-2xl mb-6" method="get" action={basePath}>
            <div className="relative">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder={SEARCH_PLACEHOLDER[shortLang as RouteLang]}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {category && <input type="hidden" name="cat" value={category} />}
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                aria-label="Search"
              >🔍</button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 mb-2">
            <Link
              href={query ? `${basePath}?q=${encodeURIComponent(query)}` : basePath}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                !category
                  ? 'bg-primary-500 text-gray-900 border-primary-500 font-semibold'
                  : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {LABEL_ALL[shortLang as RouteLang]} ({allArticles.length})
            </Link>
            {categories.map(([cat, info]) => {
              const qs = new URLSearchParams();
              if (query) qs.set('q', query);
              qs.set('cat', cat);
              return (
                <Link
                  key={cat}
                  href={`${basePath}?${qs.toString()}`}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    category === cat
                      ? 'bg-primary-500 text-gray-900 border-primary-500 font-semibold'
                      : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {info.emoji && <span aria-hidden className="mr-1">{info.emoji}</span>}
                  {localizedCategory(cat, shortLang)} ({info.count})
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {query
                ? `"${query}" — ${total} ${LABEL_ITEMS[shortLang as RouteLang]}`
                : `${LABEL_LATEST[shortLang as RouteLang]} · ${total} ${LABEL_ITEMS[shortLang as RouteLang]}`}
            </h2>
          </div>
          {pageItems.length === 0 ? (
            <div className="p-12 text-center text-gray-500 rounded-2xl border border-gray-200 dark:border-gray-800">
              {LABEL_NO_RESULTS[shortLang as RouteLang]}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {pageItems.map((item) => (
                <ArticleCardV2 key={item.slug} item={item} shortLang={shortLang} featured={false} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              {safePage > 1 && (
                <Link href={pageHref(safePage - 1)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">‹</Link>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {safePage} / {totalPages}
              </span>
              {safePage < totalPages && (
                <Link href={pageHref(safePage + 1)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">›</Link>
              )}
            </nav>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
