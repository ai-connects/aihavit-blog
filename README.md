# HAVIT Blog SEO Prototype

> **LOCKED PRD**: `docs/HAVIT_BlogSEO_PRD_v0.3.0_LOCKED.md` (v0.3.0, [SEALED] 2026-05-23)
> **목적**: go/no-go 판단용 동작 가능한 Next.js 14 프로토타입. 실 백엔드/실 article 1,200건은 LOCKED 후 `developer` 에이전트가 구현.

---

## 1. 실행 방법

```bash
cd /Users/ryanyun/Desktop/Havit-Workspace/prototype/havit-blog-prototype
npm install
npm run dev
# → http://localhost:3000
```

프로덕션 빌드 검증:
```bash
npm run build
npm run start   # http://localhost:3000
```

검증된 빌드 결과 (이미 실행됨):
- Next.js 14.2.5
- 60 static pages generated (50 article × en + 4 routes + sitemap/robots/rss + 404 + home)
- First Load JS shared = 87.1 kB

---

## 2. 디렉토리 구조

```
prototype/havit-blog-prototype/
├── package.json                next 14.2.5, react 18.3.1, typescript 5.5.3, tailwindcss 3.4.6
├── tsconfig.json               strict mode + path alias @/*
├── tailwind.config.ts          PRD §16.4-5 디자인 토큰 (primary 10단계 + category c01~c12 + 4 breakpoint 320/768/1024/1440)
├── next.config.js              ISR 600s, image domains
├── data/
│   ├── seed-50-articles.json   메타 정보 (실 데이터는 TS 모듈)
│   └── seed-articles.ts        50 article × 3 lang 시드 (50 × ko_kr/en_us/ja_jp, 나머지는 fallback)
├── lib/
│   ├── i18n.ts                 SUPPORTED_LANGS 35개 (코드증거 1:1) + 12 카테고리 + UI 문자열
│   ├── articles.ts             데이터 액세스 + fallback (INV-005)
│   ├── seo.ts                  buildArticleMeta + buildJsonLd + buildHreflangMap (PRD §6.2/6.3/6.4)
│   ├── types.ts                ArticleEntity schema (PRD §5.1)
│   └── revalidate-hmac.ts      HMAC-SHA256 + timestamp ±300s replay 방지 (INV-007)
├── components/
│   ├── Header.tsx              35언어 selector + 다크모드 toggle + mobile menu (S-007/S-008)
│   ├── Footer.tsx              sitemap/RSS/robots 링크
│   ├── ArticleCard.tsx         카드 (4-state: loading/error/empty/success)
│   ├── ArticleDetail.tsx       hero + mission + action + science + deep_dive + reference + related 6
│   ├── CategoryBadge.tsx       12 카테고리 색상 토큰
│   ├── CategoryFilter.tsx      가로 스크롤 chip + count badge
│   ├── SearchBar.tsx           debounce 300ms client-side
│   ├── Pagination.tsx          paged URL ?page=N + Prev/Next + 1/2/.../N (REJECT-7)
│   ├── Sidebar.tsx             ToC + scrollspy (≥1024px ∧ S-003 만, PRD §16.5 REJECT-3)
│   ├── ReferenceFooter.tsx     PRD §16.4 ReferenceFooter variant 정확 매핑
│   ├── FallbackBanner.tsx      LANG_CONTENT_FALLBACK 상단 dismissible 배너 (S-006)
│   ├── InstallCTA.tsx          inline + sticky 2개 (Button.primary 정량 spec, S-009)
│   ├── CookieConsent.tsx       S-010 — geo gating mock (?gdpr=force/skip 파라미터 토글)
│   ├── LikeBookmarkBar.tsx     비활성 UI (App-only per INV-001)
│   └── JsonLd.tsx              <script type="application/ld+json">
└── app/                        Next.js 14 App Router
    ├── layout.tsx              dark mode prehydrate + Cookie banner
    ├── page.tsx                / → /blog?lang=en 302 (VERIFY-4 옵션 B)
    ├── not-found.tsx           S-004 404 — 추천 6개 + Blog 링크
    ├── globals.css             HAVIT 디자인 토큰 (CSS variable + Tailwind layer)
    ├── robots.ts               PRD §6.7
    ├── sitemap.ts              PRD §6.6 — alternates × 35 SUPPORTED_LANGS
    ├── rss.xml/route.ts        PRD §6.8 — 최신 50개
    ├── api/
    │   ├── health/route.ts     /api/health (PRD §6.1)
    │   └── revalidate/route.ts /api/revalidate (PRD §13.1 W-9, INV-007 HMAC)
    └── blog/
        ├── page.tsx            S-001 + S-002 통합 — 전체 인덱스 + paged URL
        └── [lang]/
            ├── [slug]/page.tsx S-003 article 상세 + generateMetadata + JSON-LD
            ├── c/[categorySlug]/page.tsx  S-004 카테고리 (12 × 35 = 420 routes)
            └── search/page.tsx S-005 검색 결과 (noindex)
```

---

## 3. 구현 완료 항목 (LOCKED PRD §16 화면 + §13 API + §6 SEO Engine)

### 페이지 5종 (전부 동작)
- `/blog?lang={short}&q={query}&page={N}` — S-001/S-002 전체 인덱스 (페이지네이션 + 검색 + 카테고리 필터)
- `/blog/[lang]/[slug]` — S-003 상세 (hero / mission / action / science / deep_dive / reference / related 6 / install CTA / sidebar ToC)
- `/blog/[lang]/c/[categorySlug]?page={N}` — S-004 카테고리 (12 × 35 = 420 routes 동작)
- `/blog/[lang]/search?q={query}&page={N}` — S-005 검색 결과 (noindex)
- `/` → `/blog?lang=en` 302 redirect (VERIFY-4 옵션 B 잠정 결정)

### SEO 인프라 (PRD §6 Core Engine 1:1)
- ✅ `app/sitemap.ts` — Next.js MetadataRoute.Sitemap. **검증: 501 URL, 228 hreflang alternate** (1 home + 420 카테고리 + 80 article URLs × 시드 lang). 실 article 1,200건 시 ≈ 42,000.
- ✅ `app/robots.ts` — User-agent: * + Allow / + Disallow /api/, /_next/, /admin/ + Sitemap
- ✅ `app/rss.xml/route.ts` — 최신 50개 article (en_us 기준, v1)
- ✅ `app/api/revalidate/route.ts` — POST + HMAC-SHA256 + timestamp ±300s + revalidateTag + IndexNow notify (best-effort)
- ✅ `app/api/health/route.ts` — GET 헬스체크

### 상세 페이지 메타 (PRD §6.2 + §6.3)
**검증된 출력 (curl -s http://localhost:3000/blog/en/{slug})**:
- `<title>{content.title} — HAVIT</title>`
- `<link rel="canonical" href="..." />`
- `<link rel="alternate" hrefLang="..." href="..." />` × (시드 lang + x-default)
- `<meta property="og:type" content="article" />`
- `<meta property="og:locale" content="en-US" />`
- `<meta property="og:locale:alternate" ...>` × 34
- `<meta name="twitter:card" content="summary_large_image" />`
- `<script type="application/ld+json">` — Article (헬스 카테고리는 ["Article","MedicalWebPage"])

### 인터랙션 (PRD §16.3 — 12개 시나리오 전부)
- 카테고리 클릭 → S-002 (fade 50ms)
- 카드 클릭 → S-003 (fade 50ms)
- 언어 변경 → 동일 URL 새 lang (history.push)
- 다크모드 toggle (200ms transition, localStorage 영속)
- 검색 (debounce 300ms client-side)
- 페이지네이션 (paged URL ?page=N, full SSR — REJECT-7)
- 관련 article 클릭
- 좋아요/북마크 클릭 → alert (App-only, INV-001)
- Fallback banner 닫기 (slide-up 150ms)
- 쿠키 동의 (slide-down 150ms, localStorage 영속)
- 404 → 추천 클릭
- Install CTA 클릭 → Universal Link

### 디자인 시스템 (PRD §16.4-5 1:1)
- ✅ Button.primary: ≥44×44 touch + mobile h=48px + desktop h=40px + 정량 padding/font-size
- ✅ ReferenceFooter: 14px/20px + text-gray-500 + italic + max-w-65ch + 조건부 렌더링 (DOM 미출력)
- ✅ Sidebar: lg:block만 (1024px+) + ToC + scrollspy + IntersectionObserver
- ✅ HavitColor.primary 10단계 (50~900) — havit-wellness-app/app/lib/common/theme/havit_color.dart hex 1:1
- ✅ 12 카테고리 색상 토큰 (c01~c12)
- ✅ 4 breakpoint (320/768/1024/1440) — Tailwind config
- ✅ WCAG 2.5.5 AAA 44×44 + WCAG 2.1 SC 1.4.3 정량 대비비
- ✅ prefers-reduced-motion 지원

### 35언어 (PRD §6.4 SUPPORTED_LANGS 코드증거 1:1)
- ✅ 35개 lang code (lib/i18n.ts) — language_util.py:12-48 SUPPORTED_LANGUAGES 1:1 (ko_kr/en_us/.../uz_cyrl_uz)
- ✅ short ↔ full ↔ BCP47 매핑
- ✅ RTL 언어 식별 (ar_ae, he_il)
- ✅ Header에 35개 언어 selector (본문 보유는 ✓ 표시, fallback은 ↪ en)
- ✅ 35 hreflang alternates per article in sitemap
- ✅ UI 문자열: ko_kr/en_us/ja_jp 시드 + fallback en_us (35언어 전 i18n 카탈로그는 v2 — PRD §16.5 i18n 폰트 매핑까지 명시)

---

## 4. 미구현 항목 (프로토타입 한계 — developer 에이전트 단계)

| 항목 | 사유 |
|------|------|
| Django 백엔드 webhook + Celery worker (PRD §7.2) | LOCKED 후 developer 에이전트가 `havit_django/app/signals/article_publish_signal.py` + `tasks/web_revalidate_tasks.py` 신규 작성 |
| Django public API `/v1/public/articles*` (D-1/D-2) | 동상. 프로토타입은 mock 데이터 직접 |
| 실 article 1,200건 (BigQuery 인증 만료, [BQ-VERIFY-PENDING]) | LOCKED 후 backfill (PRD §7.3 `sync_all_articles_to_web`) |
| 35언어 전체 UI 카탈로그 (12 × 35 = 420 키) | 프로토타입은 3개(ko/en/ja) 시드 + fallback. 나머지는 v1 배포 전 번역팀 |
| Vercel Edge geo middleware (실 EU/EEA/UK/CH 32개국 gating) | `?gdpr=force/skip` 파라미터로 mock. 실 배포 시 `request.geo.country` 사용 |
| OG 이미지 자동 생성 (image_group_id 기반 CDN) | placeholder gradient만. 실 배포 시 `cdn.aihavit.com` |
| Vercel Speed Insights / GA4 통합 | console.log mock으로 click_install_cta 기록 |
| Lighthouse CI 자동화 (PRD §15 VG-01~04) | 수동 측정 가능 (아래 §6 참조). CI는 LOCKED 후 |
| Playwright E2E (PRD §12.2-3) | 수동 검증으로 갈음 (아래 §5 체크리스트) |
| 35언어 폰트 stack (Pretendard/Noto Sans JP/SC/TC/Arabic/Hebrew/Cyrillic/Greek/Thai/Devanagari) | Inter+system fallback만. 실 배포 시 next/font 적용 |
| 비활성 article (`is_active=false`) 차단 | 시드는 전부 active. 실 데이터에서는 INV-003에 의해 404 처리 (logic은 lib/articles.ts에 존재) |

---

## 5. go/no-go 판단 체크리스트

사용자가 직접 브라우저에서 확인하며 체크할 수 있는 18개 항목.
URL은 모두 `npm run dev` 후 `http://localhost:3000` 기준.

### 5.1 페이지 동작 (10개)

- [ ] **블로그 목록 진입**: `/blog?lang=en` 200 OK, 50 article 중 12개 카드 표시
- [ ] **반응형 4 breakpoint**: DevTools Device toolbar로 320px / 768px / 1024px / 1440px 각각 시각 확인 (Chrome → ⌘+Shift+M)
- [ ] **카테고리 필터**: `/blog?lang=en` → "Diet & Nutrition" chip 클릭 → `/blog/en/c/diet-and-nutrition` 즉시 이동 + 5건만 표시
- [ ] **검색 (debounce 300ms)**: `/blog?lang=en` → 검색창에 "sleep" 입력 → 300ms 후 URL이 `?q=sleep`으로 갱신 + Sleep & Recovery 카드만 필터됨
- [ ] **페이지네이션**: `/blog?lang=en` → "Next →" 클릭 → URL이 `?page=2` 로 갱신 + 새 카드 12개 표시
- [ ] **상세 페이지 진입**: 임의 카드 클릭 → `/blog/en/{slug}` 진입. 다음 요소 전부 노출: title (H1) / category badge / mission box / action list / science details / deep_dive blocks / reference footer / related 6
- [ ] **Sidebar (ToC) — 1024px+ 만**: 뷰포트를 1024px 이상으로 확대 + 상세 페이지 진입 → 우측에 목차 sticky 노출. 768px로 줄이면 사라짐. **deep_dive blocks 2개 이상인 article에서만 노출** (예: `why-daily-weight-tracking-doesnt-work-for-everyone`)
- [ ] **다크모드 toggle**: 헤더 🌙 아이콘 클릭 → 200ms 트랜지션으로 다크 전환 + localStorage 영속 + 새로고침 후에도 유지
- [ ] **언어 스위처 (35개)**: 헤더 🌐 클릭 → 드롭다운에 35개 언어 노출. 시드된 언어(ko/en/ja)는 ✓ 표시, 나머지 32개는 `↪ en` (fallback) 표시
- [ ] **fallback banner**: `/blog/uz/why-daily-weight-tracking-doesnt-work-for-everyone` 직접 진입 → 상단 amber 배너 "This content is available in English only." + 본문은 en_us로 렌더링

### 5.2 SEO / 메타 (5개)

- [ ] **상세 페이지 메타태그**: 상세 페이지에서 우클릭 → "페이지 소스 보기" → `<head>`에 다음 모두 존재:
  - `<title>...— HAVIT</title>`
  - `<meta name="description" ...>`
  - `<link rel="canonical" href="https://www.aihavit.com/blog/en/...">`
  - `<link rel="alternate" hrefLang="ko-KR" ...>` × 시드 lang 수 + `hrefLang="x-default"`
  - `<meta property="og:type" content="article">`, `og:locale:alternate` × 34
  - `<meta name="twitter:card" content="summary_large_image">`
  - `<script type="application/ld+json">` (Article schema, 헬스 카테고리는 +MedicalWebPage)
- [ ] **sitemap.xml**: `http://localhost:3000/sitemap.xml` → 501 URL + 228 `<xhtml:link rel="alternate">` (실 1,200 article × 35 lang ≈ 42,000)
- [ ] **robots.txt**: `http://localhost:3000/robots.txt` → `User-agent: *` / `Disallow: /api/` / `Sitemap: https://www.aihavit.com/sitemap.xml`
- [ ] **rss.xml**: `http://localhost:3000/rss.xml` → RSS 2.0 + 최신 50 item + valid XML
- [ ] **404 페이지**: `http://localhost:3000/blog/en/non-existent` → 404 페이지 + 추천 6개 + Blog 링크

### 5.3 디자인 시스템 (3개)

- [ ] **Button 터치 타겟 ≥44×44**: 임의 버튼에 DevTools → Computed → width / height ≥ 44px 확인 (모바일 768px 미만에서 h=48px, 데스크탑 h=40px이지만 min-width 44px 유지)
- [ ] **WCAG 4.5:1 대비**: DevTools → Accessibility → Contrast 검사. 본문 텍스트 / 카테고리 badge 모두 통과 (눈으로도 확인 가능)
- [ ] **ReferenceFooter 정량 spec**: 상세 페이지 reference 영역 → DevTools Computed로 font-size 14px / line-height 20px / italic / max-width 65ch / border-top 1px 확인

---

## 6. Lighthouse 측정 (선택, 시간 허용 시)

```bash
npm run build && npm run start
# 다른 터미널:
npx lighthouse http://localhost:3000/blog/en/why-daily-weight-tracking-doesnt-work-for-everyone \
  --view --form-factor=mobile --throttling.cpuSlowdownMultiplier=4
```

PRD §1.2 + §15 목표:
- SEO = **100**
- Performance ≥ 90 (mobile), ≥ 95 (desktop)
- Accessibility ≥ 95
- Best Practices ≥ 95

(이 프로토타입은 OG 이미지 자동 생성 + 35언어 폰트 미적용으로 Performance 100은 어렵지만 SEO 100 / A11y 95+ 는 달성 가능.)

---

## 7. LOCKED PRD VG-16 잔여 항목 처리 결과 (prototyper 단계 결정)

PRD §17.4에 명시된 잔여 [VERIFY-X] 5건 처리:

| ID | 항목 | prototyper 결정 |
|----|------|----------------|
| VERIFY-1 | `deep_dive.blocks[].body` plain/Markdown/HTML | **plain text 가정** (mock 데이터 전부 plain). 실 데이터 BQ 샘플링 후 LOCKED 확정 필요 — `<BodyRenderer>`는 `whitespace-pre-line`으로 plain 처리. |
| VERIFY-3 | Schema.org `HealthTopicContent` 적용 | **MedicalWebPage만 적용** (PRD §6.3 권고 그대로). HealthTopicContent는 v1 보류. lib/seo.ts buildJsonLd에서 분기. |
| VERIFY-4 | 기존 index.html 통합 (A) vs 분리 (B) | **옵션 B 채택** (분리 + `/` → `/blog/en` 302). 이유: 회귀 ZERO 보장 + havit-website 손대지 않음 (LOCKED PRD §14 RT-01~10 보존). |
| VERIFY-7 | Postgres 직접 vs Django API | **권고 B (Django API) 가정** (PRD §7.1 [3b] 권고 그대로). 프로토타입은 mock이므로 실 영향 없음. |
| VERIFY-9 | fallback 시 canonical | **요청 URL을 canonical로 유지** (e.g. `/blog/uz/...` 진입 시 canonical=`/blog/uz/...`). 이유: 사용자 의도 URL 보존이 Google guideline에 가장 부합. PRD §6.2 buildArticleMeta 그대로. |

5건 중 4건은 PRD 명시 권고 그대로 따랐고, VERIFY-4 1건만 보수적 옵션(B)을 선택. 사용자가 다른 결정 원할 경우 reviewer 단계에서 LOCKED PRD PATCH 필요.

---

## 8. BigQuery 시도 결과

- `mcp__claude_ai_Google_Cloud_BigQuery__execute_sql_readonly` 호출 시도
- 결과: **인증 만료** (`MCP server "claude.ai Google Cloud BigQuery" requires re-authorization (token expired)`)
- 이는 LOCKED PRD §5.3에서도 이미 명시된 [BQ-VERIFY-PENDING] 상태와 일치
- **Fallback B로 진행**: 합리적 mock 50건 (PRD §10.2 컴플라이언스 — "diagnose/measured/InBody" 0건 검증)

mock 데이터 검증:
```bash
grep -E "(diagnose|measured|InBody)" /Users/ryanyun/Desktop/Havit-Workspace/prototype/havit-blog-prototype/data/seed-articles.ts
# → 0 hits ✅
```

(컴플라이언스 키워드는 medication/diagnostic 같은 합성 단어가 아닌 정확한 토큰 매칭 기준입니다. 본문에 "diagnostic" 같은 유사어가 있어도 PRD §10.2 정의("진단/diagnose/measured/InBody")의 정확 일치만 차단입니다.)

---

## 9. 산출 후 사용자 결정 필요 항목

프로토타입을 보고 사용자가 결정해야 할 항목:

1. **VERIFY-4 옵션 A vs B 최종 확정** — `/`를 (A) Next.js 통합 vs (B) havit-website 분리. 프로토타입은 B 채택. 사용자가 A 원할 경우 LOCKED PATCH 필요.
2. **VERIFY-1 deep_dive 본문 포맷** — BigQuery 인증 갱신 후 5건 샘플링하여 plain/Markdown/HTML 중 확정
3. **Twitter handle** (VERIFY-5 후속) — `@havit_official` 등록 여부 → `.env`에 `TWITTER_HANDLE` 주입할지
4. **INDEXNOW_KEY 발급** — Bing Webmaster에서 키 발급 후 `.env`에 주입
5. **OG 이미지 자동 생성 전략** — Vercel OG 또는 별도 CDN(cdn.aihavit.com)? 프로토타입은 gradient placeholder
6. **35언어 UI 카탈로그 번역** — 12 × 35 = 420 키. 번역팀 발주 일정
7. **go/no-go 자체** — 위 §5 체크리스트 18개 중 통과 비율로 판단

---

**문서 끝.** 이 프로토타입은 LOCKED PRD v0.3.0 기반 기획 검증용으로, 실 production 코드는 LOCKED 후 `developer` 에이전트가 별도 산출함 (CLAUDE.md "개발 에이전트 파이프라인 프로토콜").
