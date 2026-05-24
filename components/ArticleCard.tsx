import Link from 'next/link';
import type { Article } from '@/lib/types';
import { type LangKey, toShortLang, t } from '@/lib/i18n';
import { resolveContent } from '@/lib/articles';
import CategoryBadge from './CategoryBadge';

interface Props {
  article: Article;
  lang: LangKey;
  featured?: boolean;
}

export default function ArticleCard({ article, lang, featured = false }: Props) {
  const resolved = resolveContent(article, lang);
  if (!resolved) return null;
  const { content, fallback } = resolved;
  const short = toShortLang(lang);
  const publishedDate = new Date(article.published_at);
  const minRead = Math.max(2, Math.round((content.deep_dive?.blocks ?? []).reduce((sum, b) => sum + b.body.length, 0) / 1200));

  return (
    <Link
      href={`/blog/${short}/${article.slug}`}
      className={`article-card group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      aria-label={content.title}
    >
      {/* image placeholder — gradient fallback (PRD: image_group_id 기반 OG) */}
      <div
        className="aspect-video w-full"
        style={{
          background: `linear-gradient(135deg, ${categoryGradient(article.category)[0]}, ${categoryGradient(article.category)[1]})`,
        }}
        aria-hidden
      >
        <div className="h-full w-full flex items-center justify-center text-5xl md:text-6xl">
          {content.category_emoji ?? '✨'}
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={article.category} emoji={content.category_emoji} lang={lang} asLink={false} />
          {fallback && (
            <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
              EN fallback
            </span>
          )}
        </div>
        <h3 className={`font-bold leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
          {content.title}
        </h3>
        {content.summary && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {content.summary}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
          <time dateTime={article.published_at}>
            {publishedDate.toLocaleDateString(lang.replace('_', '-'), {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{minRead} {t(lang, 'minRead')}</span>
        </div>
      </div>
    </Link>
  );
}

function categoryGradient(category: string): [string, string] {
  const map: Record<string, [string, string]> = {
    'Tracking & Insights': ['#7C3AED', '#A78BFA'],
    'Mindset & Motivation': ['#F59E0B', '#FCD34D'],
    'Weight & Metabolism': ['#EF4444', '#FCA5A5'],
    'Lifestyle Habits': ['#10B981', '#6EE7B7'],
    'Personalized Strategies': ['#3B82F6', '#93C5FD'],
    'Situational Tips': ['#EC4899', '#F9A8D4'],
    'Diet & Nutrition': ['#84CC16', '#BEF264'],
    'Hydration & Beverages': ['#06B6D4', '#67E8F9'],
    'Health & Conditions': ['#F97316', '#FDBA74'],
    'Medication Guide': ['#A855F7', '#D8B4FE'],
    'Sleep & Recovery': ['#6366F1', '#A5B4FC'],
    'Exercise & Activity': ['#14B8A6', '#5EEAD4'],
  };
  return map[category] ?? ['#CDF246', '#ABD033'];
}
