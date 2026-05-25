/**
 * GET /{lang}/about — About HAVIT Blog (PRD §13.2.1 / INV-004 / VG-05).
 *
 * SSG: 6 lang × 1 = 6 정적 페이지.
 * 필수 본문 요소 (VG-05): (1) publisher (AI Connect Inc.) (2) mission (3) contact.
 * 인라인 i18n: 본 페이지 내부 const ABOUT_I18N 자체포함 (lib/i18n.ts 미사용 — INV-010).
 * JSON-LD: AboutPage schema (PRD §6.3 T3).
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toFullLang } from '@/lib/i18n';

const ROUTE_LANGS = ['ko', 'en', 'ja', 'zh', 'zh-tw', 'es'] as const;
type RouteLang = (typeof ROUTE_LANGS)[number];

interface Props {
  params: { lang: string };
}

export function generateStaticParams() {
  return ROUTE_LANGS.map((lang) => ({ lang }));
}

const SITE = 'https://blog.aihavit.com';
const CONTACT_EMAIL = 'help@aiconnects.me';
const PUBLISHER_NAME = 'AI Connect Inc.';
const PUBLISHER_URL = 'https://www.aiconnects.me';

interface AboutI18n {
  title: string;
  metaDescription: string;
  heading: string;
  sectionPublisherHeading: string;
  sectionPublisherBody: string;
  sectionMissionHeading: string;
  sectionMissionBody: string;
  sectionContactHeading: string;
  sectionContactBody: string;
  contactLabel: string;
  publisherLabel: string;
}

const ABOUT_I18N: Record<RouteLang, AboutI18n> = {
  en: {
    title: 'About HAVIT Blog',
    metaDescription:
      'HAVIT Blog is published by AI Connect Inc. We share AI-assisted, human-reviewed wellness research on habits, sleep, nutrition, and movement.',
    heading: 'About HAVIT Blog',
    sectionPublisherHeading: 'Publisher',
    sectionPublisherBody:
      'HAVIT Blog is published by AI Connect Inc., a Seoul-based company building AI-powered wellness products. AI Connect Inc. is the sole legal entity responsible for content published on this site, including editorial decisions, fact-checking workflows, and reader-facing communications.',
    sectionMissionHeading: 'Our Mission',
    sectionMissionBody:
      'We believe everyone deserves access to clear, evidence-based wellness information — without the marketing noise of supplement industries or the gatekeeping of paywalls. HAVIT Blog translates peer-reviewed research and clinical guidelines into actionable, multilingual content for habits, sleep, nutrition, hydration, and movement. Every article passes through AI-assisted research and human editorial review before publishing.',
    sectionContactHeading: 'Contact',
    sectionContactBody:
      'For corrections, partnership inquiries, or feedback on any article, please email our editorial team. We respond to verified concerns within 7 business days and update articles publicly when warranted.',
    contactLabel: 'Email',
    publisherLabel: 'Published by',
  },
  ko: {
    title: 'HAVIT 블로그 소개',
    metaDescription:
      'HAVIT 블로그는 AI Connect Inc.가 발행합니다. AI 보조 리서치와 사람의 편집 검토를 거친 습관·수면·영양·운동 관련 웰니스 콘텐츠를 제공합니다.',
    heading: 'HAVIT 블로그 소개',
    sectionPublisherHeading: '발행 주체',
    sectionPublisherBody:
      'HAVIT 블로그는 서울 소재 AI 웰니스 제품 회사 AI Connect Inc.가 발행합니다. AI Connect Inc.는 본 사이트에 게시되는 모든 콘텐츠 — 편집 결정, 사실 확인 워크플로, 독자 응대 — 에 대한 단일 법적 책임 주체입니다.',
    sectionMissionHeading: '미션',
    sectionMissionBody:
      '저희는 보충제 산업의 마케팅 잡음이나 유료 결제 장벽 없이, 명확하고 근거 기반인 웰니스 정보를 누구나 접할 수 있어야 한다고 믿습니다. HAVIT 블로그는 동료 검토 연구와 임상 가이드라인을 습관·수면·영양·수분·운동 관련 실천 가능한 다국어 콘텐츠로 번역합니다. 모든 글은 게시 전 AI 보조 리서치와 사람 편집 검토를 거칩니다.',
    sectionContactHeading: '문의',
    sectionContactBody:
      '글에 대한 정정 요청, 파트너십 문의, 피드백은 편집팀 이메일로 보내주세요. 확인된 사안에 대해 영업일 기준 7일 이내 회신하며, 필요 시 글을 공개 업데이트합니다.',
    contactLabel: '이메일',
    publisherLabel: '발행',
  },
  ja: {
    title: 'HAVITブログについて',
    metaDescription:
      'HAVITブログはAI Connect Inc.が発行しています。AI支援リサーチと人間による編集レビューを経た、習慣・睡眠・栄養・運動に関するウェルネスコンテンツをお届けします。',
    heading: 'HAVITブログについて',
    sectionPublisherHeading: '発行元',
    sectionPublisherBody:
      'HAVITブログは、ソウルを拠点とするAIウェルネス製品企業AI Connect Inc.が発行しています。AI Connect Inc.は、本サイトに掲載されるすべてのコンテンツ（編集判断、ファクトチェックのワークフロー、読者対応を含む）に対する唯一の法的責任主体です。',
    sectionMissionHeading: 'ミッション',
    sectionMissionBody:
      'サプリメント業界のマーケティングノイズや有料の障壁なしに、誰もが明確でエビデンスに基づくウェルネス情報にアクセスできるべきだと信じています。HAVITブログは、査読付き研究と臨床ガイドラインを、習慣・睡眠・栄養・水分・運動に関する実行可能な多言語コンテンツに翻訳します。すべての記事は公開前にAI支援リサーチと人間による編集レビューを経ます。',
    sectionContactHeading: 'お問い合わせ',
    sectionContactBody:
      '記事の訂正依頼、パートナーシップに関するお問い合わせ、ご意見は編集チームまでメールでお寄せください。確認された案件には営業日7日以内に返信し、必要に応じて記事を公開更新します。',
    contactLabel: 'メール',
    publisherLabel: '発行',
  },
  zh: {
    title: '关于 HAVIT 博客',
    metaDescription:
      'HAVIT 博客由 AI Connect Inc. 发行。我们分享经过 AI 辅助研究和人工编辑审核的习惯、睡眠、营养和运动相关健康内容。',
    heading: '关于 HAVIT 博客',
    sectionPublisherHeading: '发行方',
    sectionPublisherBody:
      'HAVIT 博客由总部位于首尔的 AI 健康产品公司 AI Connect Inc. 发行。AI Connect Inc. 是本网站发布的所有内容（包括编辑决策、事实核查流程和读者沟通）的唯一法律责任主体。',
    sectionMissionHeading: '我们的使命',
    sectionMissionBody:
      '我们相信，每个人都应该能够获得清晰、基于证据的健康信息——不受补品行业营销噪音或付费墙的限制。HAVIT 博客将同行评审研究和临床指南转化为可执行的多语言内容，涵盖习惯、睡眠、营养、水合和运动。每篇文章在发布前都经过 AI 辅助研究和人工编辑审核。',
    sectionContactHeading: '联系方式',
    sectionContactBody:
      '如需更正、合作咨询或对任何文章的反馈，请发送邮件至我们的编辑团队。我们会在 7 个工作日内回复经核实的问题，并在必要时公开更新文章。',
    contactLabel: '邮箱',
    publisherLabel: '发行方',
  },
  'zh-tw': {
    title: '關於 HAVIT 部落格',
    metaDescription:
      'HAVIT 部落格由 AI Connect Inc. 發行。我們分享經過 AI 輔助研究和人工編輯審核的習慣、睡眠、營養和運動相關健康內容。',
    heading: '關於 HAVIT 部落格',
    sectionPublisherHeading: '發行方',
    sectionPublisherBody:
      'HAVIT 部落格由總部位於首爾的 AI 健康產品公司 AI Connect Inc. 發行。AI Connect Inc. 是本網站發布的所有內容（包括編輯決策、事實查核流程和讀者溝通）的唯一法律責任主體。',
    sectionMissionHeading: '我們的使命',
    sectionMissionBody:
      '我們相信，每個人都應該能夠獲得清晰、基於證據的健康資訊——不受補品產業行銷噪音或付費牆的限制。HAVIT 部落格將同行評審研究和臨床指南轉化為可執行的多語言內容，涵蓋習慣、睡眠、營養、水合和運動。每篇文章在發布前都經過 AI 輔助研究和人工編輯審核。',
    sectionContactHeading: '聯絡方式',
    sectionContactBody:
      '如需更正、合作諮詢或對任何文章的回饋，請寄送電子郵件至我們的編輯團隊。我們會在 7 個工作日內回覆經查證的問題，並在必要時公開更新文章。',
    contactLabel: '電子郵件',
    publisherLabel: '發行方',
  },
  es: {
    title: 'Acerca de HAVIT Blog',
    metaDescription:
      'HAVIT Blog es publicado por AI Connect Inc. Compartimos investigación de bienestar asistida por IA y revisada por humanos sobre hábitos, sueño, nutrición y movimiento.',
    heading: 'Acerca de HAVIT Blog',
    sectionPublisherHeading: 'Editorial',
    sectionPublisherBody:
      'HAVIT Blog es publicado por AI Connect Inc., una empresa con sede en Seúl que desarrolla productos de bienestar impulsados por IA. AI Connect Inc. es la única entidad legal responsable del contenido publicado en este sitio, incluidas las decisiones editoriales, los flujos de verificación de hechos y las comunicaciones con los lectores.',
    sectionMissionHeading: 'Nuestra Misión',
    sectionMissionBody:
      'Creemos que todos merecen acceso a información clara y basada en evidencia sobre bienestar — sin el ruido de marketing de las industrias de suplementos ni las barreras de pago. HAVIT Blog traduce investigaciones revisadas por pares y guías clínicas en contenido multilingüe y accionable sobre hábitos, sueño, nutrición, hidratación y movimiento. Cada artículo pasa por investigación asistida por IA y revisión editorial humana antes de su publicación.',
    sectionContactHeading: 'Contacto',
    sectionContactBody:
      'Para correcciones, consultas de asociación o comentarios sobre cualquier artículo, envíe un correo a nuestro equipo editorial. Respondemos a inquietudes verificadas en 7 días hábiles y actualizamos artículos públicamente cuando corresponde.',
    contactLabel: 'Correo',
    publisherLabel: 'Publicado por',
  },
};

export function generateMetadata({ params }: Props): Metadata {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) return { title: 'Not Found — HAVIT Blog' };
  const i18n = ABOUT_I18N[params.lang as RouteLang];
  return {
    title: `${i18n.title} — HAVIT Blog`,
    description: i18n.metaDescription,
    alternates: {
      canonical: `${SITE}/${params.lang}/about`,
      languages: Object.fromEntries(ROUTE_LANGS.map((l) => [l, `${SITE}/${l}/about`])),
    },
    openGraph: {
      title: i18n.title,
      description: i18n.metaDescription,
      type: 'website',
      url: `${SITE}/${params.lang}/about`,
    },
  };
}

interface AboutPageJsonLd {
  '@context': 'https://schema.org';
  '@type': 'AboutPage';
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo: { '@type': 'ImageObject'; url: string };
  };
}

function buildAboutJsonLd(lang: RouteLang, i18n: AboutI18n): AboutPageJsonLd {
  const fullLang = toFullLang(lang === 'zh-tw' ? 'zh-tw' : lang === 'zh' ? 'zh-cn' : lang);
  // toBcp47 inline
  const bcp = fullLang === 'uz_cyrl_uz'
    ? 'uz-Cyrl-UZ'
    : `${fullLang.split('_')[0]}-${fullLang.split('_')[1].toUpperCase()}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: i18n.title,
    description: i18n.metaDescription,
    url: `${SITE}/${lang}/about`,
    inLanguage: bcp,
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER_NAME,
      url: PUBLISHER_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/havit-logo.png`,
      },
    },
  };
}

export default function AboutPage({ params }: Props) {
  if (!ROUTE_LANGS.includes(params.lang as RouteLang)) notFound();
  const lang = params.lang as RouteLang;
  const i18n = ABOUT_I18N[lang];
  const fullLang = toFullLang(lang === 'zh-tw' ? 'zh-tw' : lang === 'zh' ? 'zh-cn' : lang);
  const jsonLd = buildAboutJsonLd(lang, i18n);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={fullLang} availableLangs={['en_us', 'ko_kr', 'ja_jp', 'zh_cn', 'zh_tw', 'es_es']} />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
          <header className="mb-8">
            <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl leading-tight mb-4">
              {i18n.heading}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {i18n.publisherLabel}: <strong className="text-gray-700 dark:text-gray-300">{PUBLISHER_NAME}</strong>
              {' · '}
              <a
                href={PUBLISHER_URL}
                target="_blank"
                rel="noopener"
                className="hover:text-primary-600 dark:hover:text-primary-400 underline-offset-2 hover:underline"
              >
                {PUBLISHER_URL.replace('https://', '')}
              </a>
            </p>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>{i18n.sectionPublisherHeading}</h2>
            <p>{i18n.sectionPublisherBody}</p>

            <h2>{i18n.sectionMissionHeading}</h2>
            <p>{i18n.sectionMissionBody}</p>

            <h2>{i18n.sectionContactHeading}</h2>
            <p>{i18n.sectionContactBody}</p>
            <p>
              <strong>{i18n.contactLabel}:</strong>{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          {/* PRD §6.3 T3 — AboutPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </article>
      </main>
      <Footer lang={fullLang} />
    </div>
  );
}
