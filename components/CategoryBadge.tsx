import Link from 'next/link';
import { type LangKey, toShortLang, categoryByValue, CATEGORIES } from '@/lib/i18n';

const CATEGORY_COLORS: Record<string, string> = {
  c01: '#7C3AED', c02: '#F59E0B', c03: '#EF4444', c04: '#10B981',
  c05: '#3B82F6', c06: '#EC4899', c07: '#84CC16', c08: '#06B6D4',
  c09: '#F97316', c10: '#A855F7', c11: '#6366F1', c12: '#14B8A6',
};

interface Props {
  category: string;
  emoji?: string | null;
  lang: LangKey;
  asLink?: boolean;
}

export default function CategoryBadge({ category, emoji, lang, asLink = true }: Props) {
  const cat = categoryByValue(category);
  if (!cat) return null;
  const color = CATEGORY_COLORS[cat.id] ?? '#6b7280';
  const inner = (
    <span
      className="category-badge"
      style={{ backgroundColor: color }}
      aria-label={`Category: ${category}`}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      <span>{category}</span>
    </span>
  );
  if (!asLink) return inner;
  return (
    <Link href={`/blog/${toShortLang(lang)}/c/${cat.slug}`} className="inline-block">
      {inner}
    </Link>
  );
}

export { CATEGORY_COLORS, CATEGORIES };
