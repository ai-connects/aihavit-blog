import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BmrCalculator from '@/components/tools/BmrCalculator';
import { BMR_LABELS, type ToolLang, toToolLang } from '@/lib/tool-labels';
import { toFullLang } from '@/lib/i18n';

const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es', 'pt-br', 'id', 'de', 'fr'] as const;

interface Props {
  params: { lang: string };
}

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as ToolLang)) return { title: 'Not Found' };
  const L = BMR_LABELS[toToolLang(params.lang)];
  return {
    title: `${L.pageTitle} — HAVIT`,
    description: L.pageIntro,
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}/tools/bmr`,
      languages: Object.fromEntries(ROUTE_LANGS.map((l) => [l, `https://blog.aihavit.com/${l}/tools/bmr`])),
    },
    openGraph: {
      title: L.pageTitle,
      description: L.pageIntro,
      type: 'website',
      url: `https://blog.aihavit.com/${params.lang}/tools/bmr`,
      siteName: 'HAVIT Blog',
      locale: params.lang,
      images: [{ url: 'https://blog.aihavit.com/havit-logo.png', width: 1600, height: 753, alt: 'HAVIT Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: L.pageTitle,
      description: L.pageIntro,
      images: ['https://blog.aihavit.com/havit-logo.png'],
    },
  };
}

export default function BmrPage({ params }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as ToolLang)) notFound();
  const lang = toToolLang(params.lang);
  const fullLang = toFullLang(lang === 'zh-tw' ? 'zh-tw' : lang === 'zh' ? 'zh-cn' : lang);
  const L = BMR_LABELS[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 md:px-6 py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-3">
            {L.pageTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {L.pageIntro}
          </p>
        </header>

        <BmrCalculator labels={L} lang={lang} />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-3">{L.aboutHeader}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{L.aboutBody}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">{L.formulaHeader}</h2>
          <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm whitespace-pre-wrap font-mono leading-relaxed">{L.formulaBody}</pre>
        </section>
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
