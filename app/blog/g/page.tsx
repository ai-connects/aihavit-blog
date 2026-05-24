/**
 * /blog/g — Auto-generated articles 인덱스.
 * data/articles/*.json 파일들을 한 페이지에서 검수.
 */

import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Generated Articles — HAVIT Blog 검수',
  description: '자동 생성된 article 검수 페이지 (noindex)',
  robots: { index: false, follow: false },
};

interface GeneratedSummary {
  slug: string;
  category: string;
  category_emoji: string;
  type: string;
  langs: string[];
  ko_title?: string;
  en_title?: string;
  ko_tldr?: string;
  generated_at?: string;
  iterations?: number;
}

async function listGenerated(): Promise<GeneratedSummary[]> {
  const dir = path.resolve(process.cwd(), 'data/articles');
  try {
    const files = await fs.readdir(dir);
    const summaries: GeneratedSummary[] = [];
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const text = await fs.readFile(path.join(dir, f), 'utf-8');
      const data = JSON.parse(text);
      summaries.push({
        slug: data.slug,
        category: data.category,
        category_emoji: data.category_emoji,
        type: data.type,
        langs: Object.keys(data.langs ?? {}),
        ko_title: data.langs?.ko?.title,
        en_title: data.langs?.en?.title,
        ko_tldr: data.langs?.ko?.tldr,
        generated_at: data.generated_at,
        iterations: data.iterations?.naturalness_pass,
      });
    }
    return summaries.sort((a, b) => (b.generated_at ?? '').localeCompare(a.generated_at ?? ''));
  } catch {
    return [];
  }
}

export default async function GeneratedIndexPage() {
  const articles = await listGenerated();

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="ko_kr" availableLangs={['en_us', 'ko_kr']} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-300 mb-3">
              🤖 Auto-generated (noindex)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">자동 생성 article 검수</h1>
            <p className="text-gray-700 dark:text-gray-300">
              파이프라인이 생성한 {articles.length}건의 article. 클릭해서 검수.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500">
              아직 생성된 article이 없습니다. <br />
              <code className="text-sm">npx tsx scripts/test-single.ts</code> 또는 <code className="text-sm">npm run queue:batch</code> 실행.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((a) => (
                <div key={a.slug} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{a.category_emoji}</span>
                    <span className="text-xs font-mono uppercase text-gray-500">{a.type} · {a.category}</span>
                  </div>
                  {a.ko_title && <h3 className="font-bold text-lg mb-1 leading-tight">{a.ko_title}</h3>}
                  {a.en_title && <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">{a.en_title}</p>}
                  {a.ko_tldr && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{a.ko_tldr}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                    <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                      langs: {a.langs.join(', ')}
                    </span>
                    {a.iterations && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                        nat iter {a.iterations}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/g/${a.slug}?lang=ko`}
                    className="inline-block w-full text-center px-4 py-2 rounded-lg bg-primary-500 text-gray-900 font-semibold hover:bg-primary-600"
                  >
                    검수 →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer lang="ko_kr" />
    </div>
  );
}
