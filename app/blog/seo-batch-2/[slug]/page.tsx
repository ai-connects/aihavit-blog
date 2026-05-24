import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Batch2ArticleDetail from '@/components/Batch2ArticleDetail';
import { BATCH2_ARTICLES } from '@/data/seo-batch-2-articles';
import { type LangKey, toFullLang } from '@/lib/i18n';

interface Props {
  params: { slug: string };
  searchParams: { lang?: string };
}

export function generateStaticParams() {
  return BATCH2_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const article = BATCH2_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Not Found — HAVIT' };
  const lang: 'en' | 'ko' = (searchParams.lang ?? 'ko') === 'en' ? 'en' : 'ko';
  const content = article[lang] || article.ko;
  return {
    title: content.title + ' — HAVIT',
    description: content.meta_description,
    robots: { index: false, follow: false },
  };
}

export default function Batch2DetailPage({ params, searchParams }: Props) {
  const article = BATCH2_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();
  const lang: 'en' | 'ko' = (searchParams.lang ?? 'ko') === 'en' ? 'en' : 'ko';
  const content = article[lang] || article.ko;
  const fullLang: LangKey = toFullLang(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr']} />
      <main className="flex-1">
        <Batch2ArticleDetail article={article} content={content} lang={lang} />
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
