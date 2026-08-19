# havit-web

HAVIT 의 공개 웹 자산을 한 저장소에서 관리한다.

```
apps/
├── web/    www.aihavit.com   — 마케팅 홈페이지 (Vite, 34 로케일)
└── blog/   blog.aihavit.com  — SEO 블로그 (Next.js 14 App Router)
```

두 앱은 **각자 독립적으로 빌드·배포된다.** 루트에 workspace 나 공용
`package.json` 은 두지 않았다. 스택(Vite / Next)도 의존성도 겹치지 않아서,
묶어봐야 설치만 무거워지고 한쪽 의존성 변경이 다른 쪽 빌드를 깨뜨릴 여지만
생긴다. 각 앱 디렉터리에서 `npm install && npm run build` 하면 그게 전부다.

## 왜 한 저장소인가

분리돼 있을 때 실제로 났던 문제는 하나다 — **푸터 링크의 SSOT 가 레포 경계를
넘어갔다.** 홈페이지 푸터에 싣는 아티클 목록의 원본은 블로그의
`apps/blog/lib/footer-links.ts` 이고, 홈페이지는 그걸 읽어 정적 JSON 으로
구워 쓴다. 레포가 둘일 때 이 스크립트는 "블로그 체크아웃이 옆 디렉터리에
있을 것"을 전제했고, 그 전제가 깨지면 조용히 낡은 값을 유지했다. 실제로
블로그 푸터가 36 → 48 링크로 늘어난 뒤에도 홈페이지는 36 링크를 계속
서빙하고 있었다.

한 저장소에서는 이게 상대경로 한 줄로 끝난다:

```bash
cd apps/web && node scripts/build-footer-articles.mjs   # 기본값 = ../../blog
```

## Vercel

Vercel 프로젝트는 **2개를 유지한다.** 도메인·빌드 설정·배포 이력이 서로
다르고, 하나로 합칠 실익이 없다. 각 프로젝트의 Root Directory 로 앱을
가리킨다.

| 프로젝트 | Root Directory | 도메인 |
| --- | --- | --- |
| `havit-website` | `apps/web` | www.aihavit.com |
| `aihavit-blog` | `apps/blog` | blog.aihavit.com |

각 프로젝트에서 **Skip deployments when there are no changes to the root
directory** 를 켜둘 것. 안 켜면 블로그 글 하나 고칠 때마다 홈페이지까지
다시 빌드된다.

`vercel.json` 은 각 앱 디렉터리 안에 있다 (Root Directory 기준으로 읽힌다).

두 프로젝트 모두 이 저장소를 바라본다. 예전 홈페이지 저장소
`ai-connects/havit-website` 는 아카이브됐다 — 읽기 전용으로 남아 있으니
과거 이력이 필요하면 거기서 볼 수 있지만, 거기에 푸시해도 아무것도
배포되지 않는다.

## 디자인 토큰

브랜드 색·컨테이너 폭 같은 원시 값의 SSOT 는 `packages/design/tokens.json`
하나다. 두 앱의 `:root` 는 거기서 생성된다.

```bash
vi packages/design/tokens.json
node packages/design/generate.mjs
```

각 앱의 `:root` 를 손으로 고치지 말 것 — 생성 구간(`HAVIT-TOKENS:BEGIN/END`)
안은 다음 실행 때 덮어써지고, 그 전에 두 앱의 빌드가 `packages/design/check.mjs`
로 대조해서 어긋나면 선다.

이름은 앱마다 다르다 (`--color-*` / `--hv-*`). 300곳 넘는 사용처를 개명해봐야
얻는 건 "이름이 같다"뿐이고, 값이 한 곳에서 나오면 어차피 갈라질 수 없다.

## 개발

```bash
cd apps/blog && npm install && npm run dev    # localhost:3000
cd apps/web  && npm install && npm run dev    # localhost:5173
```
