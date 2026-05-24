/**
 * PRD §5.1 + §5.1.1 Schema (havit_django ArticleEntity 코드증거 1:1).
 */

import type { LangKey } from './i18n';

export interface ArticleContent {
  category_emoji?: string | null;
  title: string;
  summary?: string | null;
  mission?: string | null;
  action?: {
    section_title?: string | null;
    type?: string | null;
    parts?: Array<{
      part_number: number;
      title: string;
      items?: string[];
    }>;
  } | null;
  science?: {
    question?: string | null;
    mechanism?: string | null;
  } | null;
  deep_dive?: {
    enabled?: boolean;
    blocks?: Array<{
      title: string;
      body: string;
    }>;
  } | null;
  reference?: {
    text?: string | null;
    source?: string | null;
  } | null;

  /* ===== SEO/GEO 최적화 필드 (Phase 3 신규) ===== */

  /** Meta description (150~160자). SEO — search snippet + CTR. */
  meta_description?: string | null;

  /** TL;DR (50~100자). GEO — AI가 첫 청크로 발췌하기 좋은 1문장 답변. */
  tldr?: string | null;

  /** SEO 타겟 primary keyword (long-tail 권장). */
  primary_keyword?: string | null;

  /** secondary/LSI keywords. */
  secondary_keywords?: string[] | null;

  /** FAQ schema → Google PAA(People Also Ask) 타겟. */
  faq?: Array<{ question: string; answer: string }> | null;

  /** 핵심 통계 (GEO — 숫자 인용 친화). source 명시 필수. */
  key_stats?: Array<{ label: string; value: string; source?: string }> | null;

  /** 비교 표 (구조화 데이터 — GEO entity 친화). */
  comparison_table?: {
    title: string;
    headers: string[];
    rows: string[][];
    caption?: string;
  } | null;

  /** Recency signal (ISO 8601 YYYY-MM-DD). */
  last_updated?: string | null;

  /** E-E-A-T — 전문가 리뷰어 정보. */
  expert_review?: {
    reviewer_name: string;
    credentials: string;
    reviewed_at: string;
  } | null;
}

export interface Article {
  article_id: string;                   // F1
  type: string;                          // F2
  category: string;                      // F3
  slug: string;                          // N1
  image_group_id?: string | null;        // F8
  is_active: boolean;                    // F9
  solution_codes: string;                // F4
  target_s_types: string[];              // F5
  target_m_types: string[];              // F6
  target_l_problems: string[];           // F7
  published_at: string;                  // N2 (ISO 8601)
  updated_at: string;                    // F11
  // 35개 lang JSONField — 시드는 3개만, 나머지는 null (fallback)
  langs: Partial<Record<LangKey, ArticleContent | null | undefined>>;
}
