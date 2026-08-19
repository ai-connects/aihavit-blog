#!/usr/bin/env node
/**
 * 브랜드 토큰이 두 스타일시트 사이에서 갈라지지 않게 막는다.
 *
 * src/style.css 가 SSOT 다. public/css/legal.css 는 사본을 들고 있는데, 이건
 * 게으름이 아니라 구조적 제약이다 — 법적 고지 6개 페이지는 public/ 의 정적
 * HTML 이라 Vite 파이프라인을 타지 않고, 따라서 해시가 붙는 번들을 <link> 할
 * 방법이 없다.
 *
 * 사본이 존재하는 이상 갈라지는 건 시간문제다. 실제로 이 검사를 넣기 전까지
 * 법적 고지 페이지는 accent #BEFF00 에 다크 배경이었고 메인은 #d4ff50 라이트
 * 였다. 브랜드 라임색이 두 종류로 갈라진 채 라이브였다.
 *
 * 그래서 값이 어긋나면 빌드를 세운다. 조용히 다른 색을 서빙하느니 멈춘다.
 *
 * Usage: node scripts/check-token-parity.mjs   (npm run build 가 먼저 호출)
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SSOT = resolve(HERE, '../src/style.css')
const COPY = resolve(HERE, '../public/css/legal.css')

/** 두 파일이 반드시 일치시켜야 하는 토큰. legal.css 에서 안 쓰는 건 뺀다. */
const SHARED = [
  '--color-primary',
  '--color-black',
  '--color-white',
  '--color-grey-3',
  '--color-grey-60',
  '--color-grey-80',
  '--color-grey-100',
  '--color-section-grey',
  '--tint-lime',
  '--tint-blue',
  '--tint-sky',
  '--tint-pale',
  '--white-90',
  '--white-60',
  '--white-40',
  '--container-width',
]

/** `:root` 안의 선언만 읽는다 — 다른 셀렉터의 지역 재정의에 속지 않기 위해. */
function readRootTokens(file) {
  const css = readFileSync(file, 'utf-8')
  const start = css.indexOf(':root')
  if (start < 0) throw new Error(`${file}: :root 블록이 없다`)
  const open = css.indexOf('{', start)
  const close = css.indexOf('}', open)
  if (open < 0 || close < 0) throw new Error(`${file}: :root 블록이 닫히지 않았다`)

  const out = new Map()
  for (const m of css.slice(open + 1, close).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    out.set(m[1], m[2].trim().replace(/\s+/g, ' ').toLowerCase())
  }
  return out
}

const ssot = readRootTokens(SSOT)
const copy = readRootTokens(COPY)

const problems = []
for (const name of SHARED) {
  const a = ssot.get(name)
  const b = copy.get(name)
  if (a === undefined) problems.push(`${name}: src/style.css 에 없음 (SSOT 에서 사라졌다면 SHARED 목록도 줄여야 한다)`)
  else if (b === undefined) problems.push(`${name}: public/css/legal.css 에 없음`)
  else if (a !== b) problems.push(`${name}: src=${a} vs legal=${b}`)
}

if (problems.length) {
  console.error('❌ 브랜드 토큰이 갈라졌다 (src/style.css ↔ public/css/legal.css)\n')
  for (const p of problems) console.error('   ' + p)
  console.error('\n   두 파일의 :root 를 같은 값으로 맞추세요.')
  process.exit(1)
}

console.log(`토큰 정합 OK — ${SHARED.length}개 일치 (src/style.css ↔ public/css/legal.css)`)
