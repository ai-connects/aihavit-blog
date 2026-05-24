/**
 * /{lang}/{slug} — article 상세 페이지 (batch-2 + generated 통합).
 *
 * 우선 BATCH2_ARTICLES (hand-curated) 조회 → 없으면 data/articles/{slug}.json (auto-generated).
 */

import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Batch2ArticleDetail from '@/components/Batch2ArticleDetail';
import { BATCH2_ARTICLES, type Batch2Article } from '@/data/seo-batch-2-articles';
import { toFullLang, type LangKey } from '@/lib/i18n';

const PRIMARY_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;
type ShortLang = (typeof PRIMARY_LANGS)[number];
const LANG_MAP_TO_CONTENT_KEY: Record<ShortLang, string> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh-CN',
  'zh-tw': 'zh-TW',
  es: 'es',
};

interface Props {
  params: { lang: string; slug: string };
}

async function loadGenerated(slug: string): Promise<Batch2Article | null> {
  try {
    const filePath = path.resolve(process.cwd(), 'data/articles', `${slug}.json`);
    const text = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(text);
    return {
      article_id: data.article_id,
      slug: data.slug,
      category: data.category,
      category_emoji: data.category_emoji,
      type: data.type,
      reading_time_min: data.reading_time_min,
      primary_keyword_en: data.primary_keyword_en,
      primary_keyword_ko: data.primary_keyword_ko,
      en: data.langs?.en,
      ko: data.langs?.ko,
      ja: data.langs?.ja,
      'zh-CN': data.langs?.['zh-CN'] ?? data.langs?.zh,
      'zh-TW': data.langs?.['zh-TW'],
      es: data.langs?.es,
    } as any;
  } catch {
    return null;
  }
}

async function loadArticle(slug: string): Promise<Batch2Article | null> {
  const curated = BATCH2_ARTICLES.find((a) => a.slug === slug);
  if (curated) return curated;
  return loadGenerated(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!PRIMARY_LANGS.includes(params.lang as any)) return { title: 'Not Found — HAVIT Blog' };
  const article = await loadArticle(params.slug);
  if (!article) return { title: 'Not Found — HAVIT Blog' };
  const contentKey = LANG_MAP_TO_CONTENT_KEY[params.lang as ShortLang];
  const content = (article as any)[contentKey] || article.ko || article.en;
  if (!content) return { title: 'Not Found — HAVIT Blog' };
  return {
    title: `${content.title} — HAVIT Blog`,
    description: content.meta_description,
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}/${params.slug}`,
      languages: Object.fromEntries(
        PRIMARY_LANGS.filter((l) => (article as any)[LANG_MAP_TO_CONTENT_KEY[l]])
          .map((l) => [l, `https://blog.aihavit.com/${l}/${params.slug}`])
      ),
    },
    openGraph: {
      title: content.title,
      description: content.meta_description,
      type: 'article',
      url: `https://blog.aihavit.com/${params.lang}/${params.slug}`,
    },
  };
}

export default async function LangArticlePage({ params }: Props) {
  if (!PRIMARY_LANGS.includes(params.lang as any)) notFound();
  const article = await loadArticle(params.slug);
  if (!article) notFound();

  const contentKey = LANG_MAP_TO_CONTENT_KEY[params.lang as ShortLang];
  const content = (article as any)[contentKey] || article.ko || article.en;
  if (!content) notFound();

  const fullLang: LangKey = toFullLang(params.lang.replace('-tw', ''));
  const detailLang = (contentKey === 'zh-CN' || contentKey === 'zh-TW') ? 'zh' : (contentKey as any);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr', 'ja_jp', 'zh_cn', 'zh_tw', 'es_es']} />
      <main className="flex-1">
        {/* 5-lang switcher */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-3xl px-4 py-2 flex flex-wrap gap-2 text-sm">
            <span className="text-gray-500 mr-2 self-center">언어:</span>
            {PRIMARY_LANGS.map((L) => {
              const has = !!(article as any)[LANG_MAP_TO_CONTENT_KEY[L]];
              const labels = { ko: '한국어', en: 'English', ja: '日本語', zh: '简体中文', 'zh-tw': '繁體中文', es: 'Español' } as const;
              return (
                <a
                  key={L}
                  href={`/${L}/${params.slug}`}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    L === params.lang
                      ? 'bg-primary-500 text-gray-900 font-semibold'
                      : has
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 line-through pointer-events-none'
                  }`}
                  aria-disabled={!has}
                >
                  {labels[L]}
                </a>
              );
            })}
          </div>
        </div>

        <Batch2ArticleDetail article={article} content={content} lang={detailLang} />
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
