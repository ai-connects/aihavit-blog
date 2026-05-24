import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleDetail from '@/components/ArticleDetail';
import JsonLd from '@/components/JsonLd';
import { getAllArticles, getArticleBySlug, resolveContent } from '@/lib/articles';
import { buildArticleMeta, buildJsonLd, buildFaqJsonLd } from '@/lib/seo';
import { type LangKey, toFullLang, SUPPORTED_LANGS } from '@/lib/i18n';

export const revalidate = 600;       // PRD INV-011 (10분 ISR)
export const dynamicParams = true;   // 시드되지 않은 slug도 동적 (404 fallback)

interface Props {
  params: { lang: string; slug: string };
}

export function generateStaticParams() {
  // PRD §7.4: 인기 article만 사전 빌드. 여기서는 시드 50개 × en만.
  return getAllArticles().map((a) => ({ lang: 'en', slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found — HAVIT' };
  const lang: LangKey = toFullLang(params.lang);
  const resolved = resolveContent(article, lang);
  if (!resolved) return { title: 'Not Found — HAVIT' };
  return buildArticleMeta(article, lang, resolved.content);
}

export default function ArticleDetailPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  const lang: LangKey = toFullLang(params.lang);
  const resolved = resolveContent(article, lang);
  if (!resolved) notFound();

  const jsonLd = buildJsonLd(article, lang, resolved.content);
  const faqJsonLd = buildFaqJsonLd(resolved.content);
  const availableLangs = SUPPORTED_LANGS.filter((k) => !!(article.langs[k] && article.langs[k]!.title));

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <Header
        lang={lang}
        currentSlug={article.slug}
        availableLangs={availableLangs}
      />
      <main className="flex-1">
        <ArticleDetail
          article={article}
          content={resolved.content}
          lang={lang}
          fallback={resolved.fallback}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
