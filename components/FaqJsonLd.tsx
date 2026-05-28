/**
 * FaqJsonLd — Schema.org FAQPage JSON-LD injection.
 *
 * Google rich-result eligibility: FAQ rich snippet shows the first 2-3 Q&A
 * directly in search results. Significantly higher CTR for articles with
 * structured FAQ sections.
 *
 * Only renders when content.faq has ≥ 1 entries. Multiple FAQPage on a single
 * page is fine per schema.org spec but most sites use one. We add this as a
 * *second* JSON-LD block alongside MedicalArticleJsonLd (which is Article/MedicalWebPage).
 */

import type { ArticleV2LangContent } from '@/lib/articles-v2';

interface Props {
  content: ArticleV2LangContent;
}

function stripMarkdown(text: string): string {
  // Lightweight markdown stripping for clean answer text in schema
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

export default function FaqJsonLd({ content }: Props) {
  const faq = Array.isArray(content.faq) ? content.faq : [];
  if (faq.length === 0) return null;

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: stripMarkdown(item.question ?? ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripMarkdown(item.answer ?? ''),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
