'use client';

import { useEffect, useState } from 'react';
import { type LangKey, t } from '@/lib/i18n';

interface Block {
  title: string;
  body: string;
}

interface Props {
  blocks: Block[];
  lang: LangKey;
}

/**
 * PRD §16.5 sidebar — ≥1024px ∧ S-003만, ToC + scrollspy.
 * v1: ToC. v2: 관련 article (보류).
 */
export default function Sidebar({ blocks, lang }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const idx = parseInt(visible[0].target.id.replace('block-', ''), 10);
          if (Number.isFinite(idx)) setActiveIdx(idx);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );
    blocks.forEach((_, i) => {
      const el = document.getElementById(`block-${i}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [blocks]);

  return (
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
        ☰ {t(lang, 'deepDive')}
      </div>
      <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-800">
        {blocks.map((b, i) => (
          <li key={i}>
            <a
              href={`#block-${i}`}
              className={`block pl-3 -ml-[2px] py-1 text-sm border-l-2 transition-colors ${
                activeIdx === i
                  ? 'border-primary-500 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {b.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
