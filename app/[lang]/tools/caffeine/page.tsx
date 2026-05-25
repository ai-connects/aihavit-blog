import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaffeineCalculator from '@/components/tools/CaffeineCalculator';
import { CAFFEINE_LABELS, type ToolLang } from '@/lib/tool-labels';
import { toFullLang } from '@/lib/i18n';

const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;
interface Props { params: { lang: string } }

export function generateStaticParams() { return ROUTE_LANGS.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!ROUTE_LANGS.includes(params.lang as ToolLang)) return { title: 'Not Found' };
  const L = CAFFEINE_LABELS[params.lang as ToolLang];
  return {
    title: `${L.pageTitle} — HAVIT`,
    description: L.pageIntro,
    alternates: {
      canonical: `https://blog.aihavit.com/${params.lang}/tools/caffeine`,
      languages: Object.fromEntries(ROUTE_LANGS.map((l) => [l, `https://blog.aihavit.com/${l}/tools/caffeine`])),
    },
    openGraph: { title: L.pageTitle, description: L.pageIntro, type: 'website', url: `https://blog.aihavit.com/${params.lang}/tools/caffeine` },
  };
}

export default function CaffeinePage({ params }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as ToolLang)) notFound();
  const lang = params.lang as ToolLang;
  const fullLang = toFullLang(lang === 'zh-tw' ? 'zh-tw' : lang === 'zh' ? 'zh-cn' : lang);
  const L = CAFFEINE_LABELS[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 md:px-6 py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-3">{L.pageTitle}</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{L.pageIntro}</p>
        </header>
        <CaffeineCalculator labels={L} lang={lang} />
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-3">{L.aboutHeader}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{L.aboutBody}</p>
        </section>
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
