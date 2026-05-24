import { type LangKey, t } from '@/lib/i18n';

interface Props {
  text?: string | null;
  source?: string | null;
  lang: LangKey;
}

/**
 * PRD §16.4 ReferenceFooter variant:
 * font-size 14px, line-height 20px, color text-gray-500 (#6b7280, dark:text-gray-400),
 * padding-top 16px, border-top 1px solid border-gray-200, italic, max-width 65ch.
 * Schema.org citation 마크업 (cite element).
 * 조건부 렌더링 hidden_when=`article.reference IS NULL OR article.reference = ""` (DOM 미출력).
 */
export default function ReferenceFooter({ text, source, lang }: Props) {
  if (!text && !source) return null; // 조건부 렌더링
  return (
    <footer className="reference-footer mt-10 not-italic">
      <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2 not-italic">
        📚 {t(lang, 'reference')}
      </h4>
      {text && <p className="italic">{text}</p>}
      {source && (
        <p className="mt-1 italic">
          <cite className="not-italic font-medium">{source}</cite>
        </p>
      )}
    </footer>
  );
}
