import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleView from '@/components/ArticleView';
import { getArticleBySlug, resolveContent, getAllArticles, PRIMARY_LANGS } from '@/lib/articles-v2';
import { toFullLang } from '@/lib/i18n';

const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;
type RouteLang = (typeof ROUTE_LANGS)[number];

interface Props {
  params: { lang: string; slug: string };
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const a of getAllArticles()) {
    for (const lang of ROUTE_LANGS) {
      const r = resolveContent(a, lang);
      if (r && !r.fallback) params.push({ lang, slug: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) return { title: 'Not Found — HAVIT Blog' };
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found — HAVIT Blog' };
  const r = resolveContent(article, params.lang);
  if (!r) return { title: 'Not Found — HAVIT Blog' };
  const { content } = r;
  return {
    title: `${content.title} — HAVIT Blog`,
    description: content.meta_description ?? content.tldr ?? undefined,
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}/${params.slug}`,
      languages: Object.fromEntries(
        ROUTE_LANGS.filter((l) => {
          const rr = resolveContent(article, l);
          return rr && !rr.fallback;
        }).map((l) => [l, `https://blog.aihavit.com/${l}/${params.slug}`]),
      ),
    },
    openGraph: {
      title: content.title,
      description: content.meta_description ?? content.tldr ?? undefined,
      type: 'article',
      url: `https://blog.aihavit.com/${params.lang}/${params.slug}`,
    },
  };
}

const LANG_LABELS: Record<RouteLang, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '简体中文',
  'zh-tw': '繁體中文',
  es: 'Español',
};

const LANG_SWITCHER_LABEL: Record<RouteLang, string> = {
  ko: '언어',
  en: 'Language',
  ja: '言語',
  zh: '语言',
  'zh-tw': '語言',
  es: 'Idioma',
};

export default function ArticlePage({ params }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) notFound();
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const r = resolveContent(article, params.lang);
  if (!r) notFound();

  const fullLang = toFullLang(params.lang === 'zh-tw' ? 'zh-tw' : params.lang === 'zh' ? 'zh-cn' : params.lang);

  const availability: Record<RouteLang, boolean> = {
    ko: false, en: false, ja: false, zh: false, 'zh-tw': false, es: false,
  };
  for (const l of ROUTE_LANGS) {
    const rr = resolveContent(article, l);
    availability[l] = !!(rr && !rr.fallback);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr', 'ja_jp', 'zh_cn', 'zh_tw', 'es_es']} />
      <main className="flex-1">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-3xl px-4 py-2 flex flex-wrap gap-2 text-sm">
            <span className="text-gray-500 mr-2 self-center">{LANG_SWITCHER_LABEL[params.lang as RouteLang]}:</span>
            {ROUTE_LANGS.map((L) => (
              <a
                key={L}
                href={`/${L}/${params.slug}`}
                className={`px-2.5 py-1 rounded transition-colors ${
                  L === params.lang
                    ? 'bg-primary-500 text-gray-900 font-semibold'
                    : availability[L]
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-400 line-through pointer-events-none'
                }`}
                aria-disabled={!availability[L]}
              >
                {LANG_LABELS[L]}
              </a>
            ))}
          </div>
        </div>

        <ArticleView article={article} content={r.content} shortLang={params.lang} fallback={r.fallback} />
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
