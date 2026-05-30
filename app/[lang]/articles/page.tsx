import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { listArticlesForLang } from '@/lib/articles-v2';
import { localizedCategory } from '@/lib/category-labels';
import { toFullLang } from '@/lib/i18n';
import { ALL_CATEGORIES, categorySlug } from '@/lib/categories';

export const dynamicParams = false;
export const revalidate = 600;

const SITE = 'https://blog.aihavit.com';
const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es', 'pt-br', 'id', 'de', 'fr'] as const;
type RouteLang = (typeof ROUTE_LANGS)[number];

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

interface Props {
  params: { lang: string };
}

// Inline i18n (keeps lib/i18n.ts untouched, mirrors Footer.tsx pattern).
const TITLE: Record<RouteLang, string> = {
  ko: '전체 아티클', en: 'All Articles', ja: '全記事', zh: '全部文章', 'zh-tw': '全部文章',
  es: 'Todos los artículos', 'pt-br': 'Todos os artigos', id: 'Semua Artikel',
  de: 'Alle Artikel', fr: 'Tous les articles',
};
const TAGLINE: Record<RouteLang, string> = {
  ko: '카테고리별 전체 가이드 색인.',
  en: 'Full index of every guide, by category.',
  ja: 'カテゴリー別の全ガイド索引。',
  zh: '按类别浏览所有指南索引。',
  'zh-tw': '依分類瀏覽所有指南索引。',
  es: 'Índice completo de todas las guías, por categoría.',
  'pt-br': 'Índice completo de todos os guias, por categoria.',
  id: 'Indeks lengkap semua panduan, menurut kategori.',
  de: 'Vollständiges Verzeichnis aller Guides nach Kategorie.',
  fr: 'Index complet de tous les guides, par catégorie.',
};
const LABEL_ITEMS: Record<RouteLang, string> = {
  ko: '건', en: 'articles', ja: '件', zh: '篇', 'zh-tw': '篇', es: 'artículos',
  'pt-br': 'artigos', id: 'artikel', de: 'Artikel', fr: 'articles',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) return { title: 'Not Found — HAVIT Blog' };
  const lang = params.lang as RouteLang;
  const title = `${TITLE[lang]} — HAVIT Blog`;
  const description = TAGLINE[lang];
  const url = `${SITE}/${lang}/articles`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(ROUTE_LANGS.map((l) => [l, `${SITE}/${l}/articles`])),
        'x-default': `${SITE}/en/articles`,
      },
    },
    openGraph: { title, description, type: 'website', siteName: 'HAVIT Blog', url, locale: lang },
  };
}

export default function AllArticlesPage({ params }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) notFound();
  const shortLang = params.lang;
  const lang = toFullLang(shortLang === 'zh-tw' ? 'zh-tw' : shortLang === 'zh' ? 'zh-cn' : shortLang);
  const basePath = `/${shortLang}`;

  const items = listArticlesForLang(shortLang);
  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    const arr = byCategory.get(item.category);
    if (arr) arr.push(item);
    else byCategory.set(item.category, [item]);
  }
  // Stable category order: enum order (ALL_CATEGORIES), skip empties.
  const sections = ALL_CATEGORIES
    .map((c) => ({ ...c, items: byCategory.get(c.value) ?? [] }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 md:px-6 pt-8 md:pt-12 pb-6">
          <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-3">{TITLE[shortLang as RouteLang]}</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-4">
            {TAGLINE[shortLang as RouteLang]}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {items.length} {LABEL_ITEMS[shortLang as RouteLang]}
          </p>
        </section>

        {/* Category jump nav — links to the in-page sections + category hub pages */}
        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <Link
                key={s.slug}
                href={`${basePath}/category/${s.slug}`}
                className="px-3 py-1.5 rounded-full text-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {localizedCategory(s.value, shortLang)} ({s.items.length})
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-16">
          {sections.map((s) => (
            <div key={s.slug} id={categorySlug(s.value)} className="mb-10 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Link href={`${basePath}/category/${s.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                  {localizedCategory(s.value, shortLang)}
                </Link>
                <span className="text-sm font-normal text-gray-400">({s.items.length})</span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
                {s.items.map((item) => (
                  <li key={item.slug} className="text-sm">
                    <Link
                      href={`${basePath}/${item.slug}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
