/**
 * /blog/g/[slug] — 파이프라인이 자동 생성한 article 렌더링 라우트.
 *
 * data/articles/{slug}.json 을 동적으로 읽어서 batch-2와 동일한 UI로 표시.
 * 검수 + 결과 확인용. production에서는 generated/curated 통합 처리.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Batch2ArticleDetail from '@/components/Batch2ArticleDetail';
import { type LangKey, toFullLang } from '@/lib/i18n';
import type { Batch2Article } from '@/data/seo-batch-2-articles';

interface Props {
  params: { slug: string };
  searchParams: { lang?: string };
}

async function loadGenerated(slug: string): Promise<Batch2Article | null> {
  try {
    const filePath = path.resolve(process.cwd(), 'data/articles', `${slug}.json`);
    const text = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(text);
    // GeneratedArticle 형식을 Batch2Article로 매핑
    return {
      article_id: data.article_id,
      slug: data.slug,
      category: data.category,
      category_emoji: data.category_emoji,
      type: data.type,
      reading_time_min: data.reading_time_min,
      primary_keyword_en: data.primary_keyword_en,
      primary_keyword_ko: data.primary_keyword_ko,
      en: data.langs.en,
      ko: data.langs.ko,
      ja: data.langs.ja,
      zh: data.langs.zh,
      es: data.langs.es,
    } as Batch2Article;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: Props) {
  const article = await loadGenerated(params.slug);
  if (!article) return { title: 'Not Found — HAVIT' };
  const lang = (searchParams.lang ?? 'ko') === 'en' ? 'en' : 'ko';
  const content = (article as any)[lang] || article.ko;
  return {
    title: content.title + ' — HAVIT',
    description: content.meta_description,
    robots: { index: false, follow: false }, // generated content는 검수 전 noindex
  };
}

export default async function GeneratedDetailPage({ params, searchParams }: Props) {
  const article = await loadGenerated(params.slug);
  if (!article) notFound();
  const langParam = searchParams.lang ?? 'ko';
  const validLangs = ['en', 'ko', 'ja', 'zh-CN', 'zh-TW', 'es'];
  const lang: any = validLangs.includes(langParam) ? langParam : 'ko';
  const content = (article as any)[lang] || article.ko;
  const fullLang: LangKey = toFullLang(lang === 'ja' ? 'ja' : lang.startsWith('zh') ? 'zh' : lang === 'es' ? 'es' : lang);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr']} />
      <main className="flex-1">
        {/* Generated 라벨 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-900">
          <div className="mx-auto max-w-3xl px-4 py-2 text-sm text-yellow-900 dark:text-yellow-300">
            🤖 <strong>Auto-generated article</strong> (검수 전, noindex). 사용 가능 언어: {Object.keys(article).filter((k) => ['en', 'ko', 'ja', 'zh', 'es'].includes(k) && (article as any)[k]).join(', ')}
          </div>
        </div>
        {/* 언어 스위처 */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-3xl px-4 py-2 flex gap-2 text-sm">
            <span className="text-gray-500 mr-2">언어:</span>
            {(['ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'es'] as const).map((L) => {
              const has = !!(article as any)[L];
              return (
                <a
                  key={L}
                  href={`/blog/g/${article.slug}?lang=${L}`}
                  className={`px-2.5 py-1 rounded ${
                    L === lang
                      ? 'bg-primary-500 text-gray-900 font-semibold'
                      : has
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 line-through'
                  }`}
                  aria-disabled={!has}
                >
                  {L}
                </a>
              );
            })}
          </div>
        </div>
        <Batch2ArticleDetail article={article} content={content} lang={lang as any} />
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
