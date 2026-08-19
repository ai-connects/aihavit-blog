/**
 * 어느 파일의 어느 구간이 tokens.json 에서 파생되는지의 정의.
 *
 * generate.mjs(쓰기)와 check.mjs(검사)가 이 한 곳을 공유한다 — 생성 규칙과
 * 검사 규칙이 갈라지면 가드가 통과하는데 결과물은 틀린 상황이 생긴다.
 *
 * 이름을 앱마다 다르게 두는 이유:
 *   apps/web  은 --color-* / --tint-*   (149곳 사용)
 *   apps/blog 은 --hv-*                 (170곳 사용)
 * 한쪽으로 통일하려면 300곳 넘게 손봐야 하는데, 얻는 건 "이름이 같다"뿐이다.
 * 값이 한 곳에서 나오면 갈라질 수 없으므로 이름 통일은 실익이 없다. 그래서
 * 이름은 그대로 두고 출처만 하나로 모은다.
 */

/** 이 마커 사이가 생성 구간이다. 바깥은 사람이 쓴다. */
export const BEGIN = 'HAVIT-TOKENS:BEGIN'
export const END = 'HAVIT-TOKENS:END'

/** apps/web 이 쓰는 이름 (tokens.json 키 → CSS 변수명) */
const WEB = {
  primary: '--color-primary',
  black: '--color-black',
  white: '--color-white',
  'grey-3': '--color-grey-3',
  'grey-60': '--color-grey-60',
  'grey-80': '--color-grey-80',
  'grey-100': '--color-grey-100',
  'section-grey': '--color-section-grey',
  'tint-lime': '--tint-lime',
  'tint-blue': '--tint-blue',
  'tint-sky': '--tint-sky',
  'tint-pale': '--tint-pale',
  'white-90': '--white-90',
  'white-60': '--white-60',
  'white-40': '--white-40',
  container: '--container-width',
}

/** apps/blog 이 쓰는 이름. white-90/60/40 은 블로그에 어두운 면이 없어 안 쓴다. */
const BLOG = {
  primary: '--hv-primary',
  'primary-shadow': '--hv-primary-shadow',
  black: '--hv-black',
  white: '--hv-white',
  'grey-3': '--hv-grey-3',
  'grey-60': '--hv-grey-60',
  'grey-80': '--hv-grey-80',
  'grey-100': '--hv-grey-100',
  'section-grey': '--hv-section-grey',
  'tint-lime': '--hv-tint-lime',
  'tint-blue': '--hv-tint-blue',
  'tint-sky': '--hv-tint-sky',
  'tint-pale': '--hv-tint-pale',
  container: '--hv-container',
}

export const TARGETS = [
  { file: 'apps/web/src/style.css', map: WEB, indent: '  ' },
  { file: 'apps/web/public/css/legal.css', map: WEB, indent: '  ' },
  { file: 'apps/blog/app/globals.css', map: BLOG, indent: '    ' },
]

/**
 * tailwind.config.ts 의 primary 스케일은 생성하지 않는다 — 600~900 은 흰 배경
 * 대비를 맞추려고 손으로 고른 어두운 올리브라 원시 토큰에서 파생되지 않는다.
 * 대신 브랜드 값과 겹치는 세 단계만 대조한다.
 */
export const TAILWIND = {
  file: 'apps/blog/tailwind.config.ts',
  expect: [
    { step: 100, token: 'tint-pale' },
    { step: 300, token: 'tint-lime' },
    { step: 500, token: 'primary' },
  ],
}

/** 생성 구간의 본문을 만든다. */
export function renderBlock(tokens, map, indent) {
  return Object.entries(map)
    .map(([key, name]) => {
      if (!(key in tokens)) throw new Error(`tokens.json 에 '${key}' 가 없다`)
      return `${indent}${name}: ${tokens[key]};`
    })
    .join('\n')
}
