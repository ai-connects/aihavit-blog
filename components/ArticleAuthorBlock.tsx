/**
 * ArticleAuthorBlock — author / reviewer byline (PRD §5.2.1 / §16.2 / INV-001).
 *
 * Render: <header> 내 last_updated 다음 (ArticleView §7.3).
 * i18n: 인라인 const AUTHOR_I18N (6 lang 자체포함, lib/i18n.ts 미사용 — INV-010, P0-#2).
 * a11y: <address> 시맨틱 태그 (§16.5).
 */

import Link from 'next/link';
import type { ArticleV2 } from '@/lib/articles-v2';

interface Props {
  article: ArticleV2;
  shortLang: string;
}

// PRD §16.2 — 인라인 i18n (lib/i18n.ts 미사용). 6 lang 자체포함.
const AUTHOR_I18N: Record<string, { by: string; reviewedBy: string }> = {
  en: { by: 'By', reviewedBy: 'Reviewed by' },
  ko: { by: '작성', reviewedBy: '검토' },
  ja: { by: '執筆', reviewedBy: '監修' },
  zh: { by: '撰写', reviewedBy: '审核' },
  'zh-tw': { by: '撰寫', reviewedBy: '審核' },
  es: { by: 'Por', reviewedBy: 'Revisado por' },
  'pt-br': { by: 'Por', reviewedBy: 'Revisado por' },
  id: { by: 'Oleh', reviewedBy: 'Diperiksa oleh' },
  de: { by: 'Von', reviewedBy: 'Geprüft von' },
  fr: { by: 'Par', reviewedBy: 'Vérifié par' },
};

function pickLabels(shortLang: string): { by: string; reviewedBy: string } {
  return AUTHOR_I18N[shortLang] ?? AUTHOR_I18N.en;
}

export default function ArticleAuthorBlock({ article, shortLang }: Props) {
  const labels = pickLabels(shortLang);
  // PRD §5.2.1 default 주입으로 author/reviewer 항상 존재 (E-001 빌드 단계 차단).
  const author = article.author;
  const reviewer = article.reviewer;
  if (!author || !reviewer) return null;

  return (
    <address
      className="not-italic flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 mb-3"
      aria-label="Article authorship"
    >
      <span>
        {labels.by}{' '}
        <Link
          href={`/${shortLang}/about`}
          className="font-medium text-gray-700 hover:text-primary-600 underline-offset-2 hover:underline"
        >
          {author.name}
        </Link>
      </span>
      <span aria-hidden className="text-gray-400">
        ·
      </span>
      <span>
        {labels.reviewedBy}{' '}
        <Link
          href={`/${shortLang}/editorial-policy`}
          className="font-medium text-gray-700 hover:text-primary-600 underline-offset-2 hover:underline"
        >
          {reviewer.name}
        </Link>
        {reviewer.credential && (
          <span className="text-gray-500"> · {reviewer.credential}</span>
        )}
      </span>
    </address>
  );
}
