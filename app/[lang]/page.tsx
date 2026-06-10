import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCardV2 from '@/components/ArticleCardV2';
import { listArticlesForLang, getAllArticles, resolveContent, isLangIndexable } from '@/lib/articles-v2';
import { localizedCategory } from '@/lib/category-labels';
import { toFullLang } from '@/lib/i18n';
import { categorySlug } from '@/lib/categories';
import { BRAND_SAME_AS } from '@/lib/team';

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

const LABEL_LANGUAGES: Record<RouteLang, string> = {
  ko: '언어', en: 'languages', ja: '言語', zh: '语言', 'zh-tw': '語言', es: 'idiomas',
  'pt-br': 'idiomas', id: 'bahasa', de: 'Sprachen', fr: 'langues',
};

const LABEL_BY_AI_CONNECT: Record<RouteLang, string> = {
  ko: 'AI Connect Inc. 발행', en: 'Published by AI Connect Inc.',
  ja: 'AI Connect Inc. 発行', zh: '由 AI Connect Inc. 出版', 'zh-tw': '由 AI Connect Inc. 出版',
  es: 'Publicado por AI Connect Inc.', 'pt-br': 'Publicado por AI Connect Inc.',
  id: 'Diterbitkan oleh AI Connect Inc.', de: 'Herausgegeben von AI Connect Inc.',
  fr: 'Publié par AI Connect Inc.',
};

const OG_IMAGE_URL = 'https://blog.aihavit.com/havit-logo.png';

const HOME_TITLE: Record<RouteLang, string> = {
  ko: 'HAVIT 블로그 — 과학 기반 웰니스 가이드',
  en: 'HAVIT Blog — Science-Backed Wellness Guides',
  ja: 'HAVIT ブログ — 科学的根拠に基づくウェルネスガイド',
  zh: 'HAVIT 博客 — 科学循证健康指南',
  'zh-tw': 'HAVIT 部落格 — 科學循證健康指南',
  es: 'HAVIT Blog — Guías de Bienestar Basadas en Ciencia',
  'pt-br': 'HAVIT Blog — Guias de Bem-Estar com Base Científica',
  id: 'HAVIT Blog — Panduan Kesehatan Berbasis Sains',
  de: 'HAVIT Blog — Wissenschaftlich fundierte Wellness-Guides',
  fr: 'HAVIT Blog — Guides Bien-Être Fondés sur la Science',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) return { title: 'Not Found — HAVIT Blog' };
  const lang = params.lang as RouteLang;
  const title = HOME_TITLE[lang];
  const description = HERO_TAGLINE[lang];
  const url = `https://blog.aihavit.com/${lang}`;
  return {
    title,
    description,
    // SEO staging — index only priority langs first (PRIORITY_INDEX_LANGS).
    robots: isLangIndexable(lang)
      ? { index: true, follow: true }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        ROUTE_LANGS.filter(isLangIndexable).map((l) => [l, `https://blog.aihavit.com/${l}`]),
      ),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'HAVIT Blog',
      url,
      locale: lang,
      images: [{ url: OG_IMAGE_URL, width: 1600, height: 753, alt: 'HAVIT Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
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

  // SEO v1.3 — WebSite + Organization JSON-LD on home page (sitelinks search
  // box + Knowledge Graph signals). Single object as @graph for compactness.
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://blog.aihavit.com/#website',
        url: 'https://blog.aihavit.com/',
        name: 'HAVIT Blog',
        description: HERO_TAGLINE[shortLang as RouteLang],
        inLanguage: shortLang,
        publisher: { '@id': 'https://blog.aihavit.com/#publisher' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `https://blog.aihavit.com/${shortLang}?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://blog.aihavit.com/#publisher',
        name: 'AI Connect Inc.',
        url: 'https://www.aiconnects.me',
        logo: {
          '@type': 'ImageObject',
          url: 'https://blog.aihavit.com/havit-logo.png',
          width: 1600,
          height: 753,
        },
        sameAs: BRAND_SAME_AS,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl leading-tight mb-3">
            HAVIT <span className="text-primary-600 dark:text-primary-400">Blog</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-prose mb-3">
            {HERO_TAGLINE[shortLang as RouteLang]}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            {LABEL_BY_AI_CONNECT[shortLang as RouteLang]} · {allArticles.length.toLocaleString()}+ {LABEL_ITEMS[shortLang as RouteLang]} · 10 {LABEL_LANGUAGES[shortLang as RouteLang]}
          </p>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
          />

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
            {/* SEO crawl-path: category chips link to indexable /category/<slug> hubs
                (was an in-page ?cat= filter, which Google does not treat as a page). */}
            {categories.map(([cat, info]) => (
              <Link
                key={cat}
                href={`${basePath}/category/${categorySlug(cat)}`}
                className="px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {info.emoji && <span aria-hidden className="mr-1">{info.emoji}</span>}
                {localizedCategory(cat, shortLang)} ({info.count})
              </Link>
            ))}
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
