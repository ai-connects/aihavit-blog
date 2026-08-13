import Link from 'next/link';
import { type LangKey, toShortLang } from '@/lib/i18n';
import { localizedCategory } from '@/lib/category-labels';
import { ALL_CATEGORIES } from '@/lib/categories';

// BLOG_AUTHORITY v1.0.0 (PRD §5.2.3 / §16.2 F-07 옵션 A) — 인라인 i18n.
// lib/i18n.ts 미변경 (INV-010, P0-#2 회피). 6 lang 자체포함.
const FOOTER_I18N: Record<string, { aiTransparency: string }> = {
  en: { aiTransparency: 'AI-assisted research, human-reviewed editorial.' },
  ko: { aiTransparency: 'AI 보조 리서치, 사람이 검토한 콘텐츠.' },
  ja: { aiTransparency: 'AI支援リサーチ、人間による編集レビュー。' },
  zh: { aiTransparency: 'AI辅助研究，人工编辑审核。' },
  'zh-tw': { aiTransparency: 'AI輔助研究，人工編輯審核。' },
  es: { aiTransparency: 'Investigación asistida por IA, edición revisada por humanos.' },
  'pt-br': { aiTransparency: 'Pesquisa assistida por IA, edição revisada por humanos.' },
  id: { aiTransparency: 'Riset dibantu AI, editorial diperiksa manusia.' },
  de: { aiTransparency: 'KI-gestützte Recherche, menschliche Redaktion.' },
  fr: { aiTransparency: 'Recherche assistée par IA, édition révisée par des humains.' },
};

function pickFooterI18n(shortLang: string): { aiTransparency: string } {
  return FOOTER_I18N[shortLang] ?? FOOTER_I18N.en;
}

// SEO crawl-path: sitewide links to the article archive + category hubs so every
// article is ≤2 clicks from any page (fixes GSC "Discovered — currently not indexed").
const LABEL_TOPICS: Record<string, string> = {
  en: 'TOPICS', ko: '주제', ja: 'トピック', zh: '主题', 'zh-tw': '主題', es: 'TEMAS',
  'pt-br': 'TÓPICOS', id: 'TOPIK', de: 'THEMEN', fr: 'THÈMES',
};
const LABEL_ALL_ARTICLES: Record<string, string> = {
  en: 'All articles', ko: '전체 아티클', ja: '全記事', zh: '全部文章', 'zh-tw': '全部文章',
  es: 'Todos los artículos', 'pt-br': 'Todos os artigos', id: 'Semua artikel',
  de: 'Alle Artikel', fr: 'Tous les articles',
};
const NOTICE: Record<string, string> = {
  en: 'HAVIT provides general wellness information and does not provide medical advice, diagnosis, or treatment.',
  ko: 'HAVIT은 일반적인 웰니스 정보를 제공하며, 의학적 조언·진단·치료를 제공하지 않습니다.',
  ja: 'HAVITは一般的なウェルネス情報を提供するものであり、医学的助言・診断・治療を提供するものではありません。',
  zh: 'HAVIT 提供一般健康信息，不提供医疗建议、诊断或治疗。',
  'zh-tw': 'HAVIT 提供一般健康資訊，不提供醫療建議、診斷或治療。',
  es: 'HAVIT ofrece información general de bienestar y no proporciona consejo médico, diagnóstico ni tratamiento.',
  'pt-br': 'A HAVIT fornece informações gerais de bem-estar e não oferece aconselhamento médico, diagnóstico ou tratamento.',
  id: 'HAVIT menyediakan informasi kesehatan umum dan tidak memberikan nasihat medis, diagnosis, atau pengobatan.',
  de: 'HAVIT bietet allgemeine Wellness-Informationen und keine medizinische Beratung, Diagnose oder Behandlung.',
  fr: 'HAVIT fournit des informations générales de bien-être et ne fournit ni conseil médical, ni diagnostic, ni traitement.',
};

const MAIN_SITE = process.env.NEXT_PUBLIC_MAIN_URL ?? 'https://aihavit.com';

export default function Footer({ lang }: { lang: LangKey }) {
  const shortLang = toShortLang(lang);
  const i18n = pickFooterI18n(shortLang);

  return (
    <footer className="hv-footer">
      <div className="hv-container">
        {/* No invert filter: the mark is a white banner holding a black
            wordmark, so inverting it would flatten it into a white blob. It
            reads as a sticker on the dark band, which is the intended use. */}
        <img
          className="mb-6"
          src="/havit-logo.png"
          alt="HAVIT"
          width={1600}
          height={753}
          style={{ height: 32, width: 'auto' }}
        />
        <p className="text-body-small" style={{ color: 'rgba(255,255,255,0.6)' }}>
          © 2026 AI Connect Inc. All Rights Reserved.
        </p>
        <p className="text-body-small hv-footer__notice" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {NOTICE[shortLang] ?? NOTICE.en}
        </p>

        <div className="hv-footer__columns">
          <div className="hv-footer__col">
            <p className="eyebrow">PRODUCT</p>
            <a href={MAIN_SITE}>HAVIT</a>
            <a href="https://app.aihavit.com/" target="_blank" rel="noopener">App</a>
            <Link href={`/${shortLang}`}>Blog</Link>
            <Link href={`/${shortLang}/tools`}>Tools</Link>
          </div>
          <div className="hv-footer__col">
            <p className="eyebrow">{LABEL_TOPICS[shortLang] ?? LABEL_TOPICS.en}</p>
            {/* All 15 categories stay in the footer — it is the sitewide crawl
                path that keeps every article ≤2 clicks from any page. Two
                columns so the list doesn't run twice as tall as its neighbours. */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              {ALL_CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/${shortLang}/category/${c.slug}`}>
                  {localizedCategory(c.value, shortLang)}
                </Link>
              ))}
            </div>
          </div>
          <div className="hv-footer__col">
            <p className="eyebrow">COMPANY</p>
            <a href="https://www.aiconnects.me" target="_blank" rel="noopener">AI Connect</a>
            <Link href={`/${shortLang}/about`}>About</Link>
            <Link href={`/${shortLang}/editorial-policy`}>Editorial Policy</Link>
            <Link href={`/${shortLang}/articles`}>{LABEL_ALL_ARTICLES[shortLang] ?? LABEL_ALL_ARTICLES.en}</Link>
            <a href="/rss.xml">RSS</a>
            <a href="mailto:havit@aihavit.com">Contact</a>
          </div>
          <div className="hv-footer__col">
            <p className="eyebrow">LEGAL</p>
            <a href={`${MAIN_SITE}/privacy.html`}>Privacy</a>
            <a href={`${MAIN_SITE}/terms.html`}>Terms</a>
            <a href={`${MAIN_SITE}/eula.html`}>EULA</a>
            <a href={`${MAIN_SITE}/refund.html`}>Refund Policy</a>
          </div>
        </div>

        {/* BLOG_AUTHORITY v1.0.0 (PRD §5.2.3 / §16.2 F-07 옵션 A / INV-005) —
            AI transparency link to editorial policy */}
        <p
          className="mt-14 pt-6 text-xs text-center"
          style={{ color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <Link href={`/${shortLang}/editorial-policy`} className="hover:underline">
            {i18n.aiTransparency}
          </Link>
        </p>
      </div>
    </footer>
  );
}
