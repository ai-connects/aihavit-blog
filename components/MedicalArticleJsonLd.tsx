/**
 * MedicalArticleJsonLd — JSON-LD schema injection (PRD §6.3 / INV-003).
 *
 * 분기 (PRD §6.1):
 *   - YMYL category → T1 payload (@type: ["Article", "MedicalWebPage"] + specialty)
 *   - non-YMYL category → T2 payload (@type: "Article", specialty 없음, reviewedBy 유지)
 *
 * 위치: ArticleView 맨 끝 (§7.3 — </article> 직전, InstallCTA sticky 다음).
 * 출력: <script type="application/ld+json">{JSON}</script> (invisible).
 *
 * YMYL set SSOT: lib/articles-v2.ts:YMYL_CATEGORIES_V2 (10개) 재활용 (§6.4).
 *   — 인라인 자체포함 패턴은 lib/i18n.ts 미사용을 위한 것이므로
 *     articles-v2.ts import는 허용 (P0-#2 lib/i18n.ts 미변경 요건 충족).
 */

import type { ArticleV2, ArticleV2LangContent } from '@/lib/articles-v2';
import { isYmylCategory } from '@/lib/articles-v2';
import { toBcp47, toFullLang } from '@/lib/i18n';

interface Props {
  article: ArticleV2;
  content: ArticleV2LangContent;
  shortLang: string;
}

const SITE = 'https://blog.aihavit.com';

// PRD §6.4 publisher 상수 (기존 components/Footer.tsx 표기와 일관).
const PUBLISHER = {
  '@type': 'Organization',
  name: 'AI Connect Inc.',
  url: 'https://www.aiconnects.me',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/havit-logo.png`,
  },
} as const;

const OG_IMAGE = `${SITE}/og-default.png`;

interface JsonLdPayload {
  '@context': 'https://schema.org';
  '@type': string | string[];
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
  articleSection: string;
  author: { '@type': string; name: string; url: string };
  reviewedBy: { '@type': string; name: string; url: string };
  lastReviewed: string;
  publisher: typeof PUBLISHER;
  specialty?: { '@type': 'MedicalSpecialty'; name: string };
}

function buildPayload(article: ArticleV2, content: ArticleV2LangContent, shortLang: string): JsonLdPayload {
  const ymyl = isYmylCategory(article.category);
  // PRD §6.3 — author/reviewer는 loadAll() default 주입으로 항상 존재 (E-001).
  const authorName = article.author?.name ?? 'HAVIT Editorial Team';
  const reviewerName = article.reviewer?.name ?? 'HAVIT Medical Advisory';
  const authorType = article.author?.type ?? 'Organization';

  const dateModified =
    content.last_updated ?? article.updated_at ?? new Date().toISOString();
  const datePublished = article.published_at ?? dateModified;
  const lastReviewed = content.last_updated ?? dateModified;

  const fullLang = toFullLang(shortLang === 'zh-tw' ? 'zh-tw' : shortLang === 'zh' ? 'zh-cn' : shortLang);
  const inLanguage = toBcp47(fullLang);

  const payload: JsonLdPayload = {
    '@context': 'https://schema.org',
    '@type': ymyl ? ['Article', 'MedicalWebPage'] : 'Article',
    headline: content.title,
    description: content.meta_description ?? content.tldr ?? '',
    image: [OG_IMAGE],
    datePublished,
    dateModified,
    inLanguage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/${shortLang}/${article.slug}`,
    },
    articleSection: article.category,
    author: {
      '@type': authorType,
      name: authorName,
      url: `${SITE}/${shortLang}/about`,
    },
    reviewedBy: {
      '@type': 'Organization',
      name: reviewerName,
      url: `${SITE}/${shortLang}/editorial-policy`,
    },
    lastReviewed,
    publisher: PUBLISHER,
  };

  if (ymyl) {
    // PRD §6.3 T1 — specialty (YMYL 한정)
    payload.specialty = {
      '@type': 'MedicalSpecialty',
      name: 'PublicHealth',
    };
  }

  return payload;
}

export default function MedicalArticleJsonLd({ article, content, shortLang }: Props) {
  const payload = buildPayload(article, content, shortLang);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 결과는 사용자 입력 미포함 (article JSON 정적 파일 출처) — XSS 위험 없음
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
