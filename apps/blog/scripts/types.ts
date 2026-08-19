/**
 * Article 자동 생성 파이프라인 공유 타입.
 *
 * batch-2 검증 완료된 8-Phase 시스템:
 *   content-discoverer → seo-strategist → article-writer-en/ko
 *   → naturalness-reviewer → article-rewriter (REJECT 시)
 *   → article-reviewer → seo-tagger → localizer
 */

export type Lang = 'en' | 'ko' | 'ja' | 'zh-CN' | 'zh-TW' | 'es';

export const TARGET_LANGS: Lang[] = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'es'];

export type LocalizeLang = Exclude<Lang, 'en' | 'ko'>;

export interface ArticleSeed {
  slug: string;
  category: string;
  category_emoji: string;
  type: 'guide' | 'science' | 'tip' | 'challenge' | 'reference';
  primary_keyword_en: string;
  primary_keyword_ko: string;
  unique_angle: string;
  authoritative_sources: string[];
  source_article_id?: string; // 기존 Django article 참조 (있을 때)
  reading_time_min: number;
}

export interface LangContent {
  title: string;
  meta_description: string;
  tldr: string;
  body_md: string;
  key_stats?: Array<{ label: string; value: string; source?: string }>;
  comparison_table?: {
    title: string;
    headers: string[];
    rows: string[][];
    caption?: string;
  };
  faq?: Array<{ question: string; answer: string }>;
  references?: Array<{ title: string; source?: string }>;
  reviewer?: string;
  last_updated: string;
}

export interface GeneratedArticle {
  article_id: string;
  slug: string;
  category: string;
  category_emoji: string;
  type: ArticleSeed['type'];
  reading_time_min: number;
  primary_keyword_en: string;
  primary_keyword_ko: string;
  langs: Partial<Record<Lang, LangContent>>;
  generated_at: string;
  iterations: {
    naturalness_pass: number;
    reviewer_pass: number;
  };
}

export interface NaturalnessReview {
  passed: boolean;
  scores: Record<'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6' | 'N7' | 'N8', { pass: boolean; note: string }>;
  reject_reasons: string[];
}

export interface QueueItem {
  slug: string;
  seed?: ArticleSeed;
  source_article_id?: string;
  status: 'pending' | 'in_progress' | 'naturalness_failed' | 'reviewer_failed' | 'completed' | 'error';
  attempts: number;
  langs_completed: Lang[];
  last_error?: string;
  updated_at: string;
}

export interface QueueState {
  total: number;
  completed: number;
  in_progress: number;
  pending: number;
  failed: number;
  items: QueueItem[];
  started_at?: string;
  last_run?: string;
}
