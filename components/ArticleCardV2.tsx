import Link from 'next/link';
import type { ArticleListItem } from '@/lib/articles-v2';
import { localizedCategory } from '@/lib/category-labels';

interface Props {
  item: ArticleListItem;
  shortLang: string;
  featured?: boolean;
}

const CATEGORY_GRADIENT: Record<string, [string, string]> = {
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

const MIN_READ_LABEL: Record<string, string> = {
  en: 'min read', ko: '분 분량', ja: '分で読める', zh: '分钟阅读', 'zh-tw': '分鐘閱讀', es: 'min',
};

export default function ArticleCardV2({ item, shortLang, featured = false }: Props) {
  const [c1, c2] = CATEGORY_GRADIENT[item.category] ?? ['#CDF246', '#ABD033'];
  const href = `/${shortLang}/${item.slug}`;
  const dateLocale = shortLang === 'zh-tw' ? 'zh-TW' : shortLang === 'zh' ? 'zh-CN' : shortLang;
  const publishedDate = item.updated_at ? new Date(item.updated_at) : null;
  const minReadLabel = MIN_READ_LABEL[shortLang] ?? 'min read';

  return (
    <Link
      href={href}
      className={`article-card group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      aria-label={item.title}
    >
      <div
        className="aspect-video w-full"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        aria-hidden
      >
        <div className="h-full w-full flex items-center justify-center text-5xl md:text-6xl">
          {item.category_emoji ?? '✨'}
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="category-badge"
            style={{ backgroundColor: c1 }}
            aria-label={`Category: ${item.category}`}
          >
            {item.category_emoji && <span aria-hidden>{item.category_emoji}</span>}
            <span>{localizedCategory(item.category, shortLang)}</span>
          </span>
        </div>
        <h3 className={`font-bold leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
          {item.title}
        </h3>
        {(item.tldr || item.meta_description) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {item.tldr ?? item.meta_description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
          {publishedDate && (
            <time dateTime={item.updated_at}>
              {publishedDate.toLocaleDateString(dateLocale, { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
          )}
          {item.reading_time_min && (
            <>
              <span aria-hidden>·</span>
              <span>{item.reading_time_min} {minReadLabel}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
