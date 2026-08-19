#!/usr/bin/env node
/**
 * 각 앱의 :root 가 tokens.json 과 일치하는지 검사한다. 어긋나면 exit 1.
 *
 * 두 앱의 빌드가 이걸 먼저 부른다. 브랜드 색이 갈라진 채로 배포되는 걸 막는
 * 유일한 장치다 — 실제로 이 가드가 없던 동안 법적 고지 페이지가 #BEFF00,
 * 메인이 #d4ff50 로 갈라진 채 운영됐고 아무도 몰랐다. 빌드는 초록불이었다.
 *
 * Usage: node packages/design/check.mjs
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { TARGETS, TAILWIND, renderBlock } from './targets.mjs'
import { ROOT, loadTokens, findBlock, parseDecls, readTarget } from './lib.mjs'

const tokens = loadTokens()
const problems = []

for (const t of TARGETS) {
  const block = findBlock(readTarget(t.file))
  if (!block) {
    problems.push(`${t.file}: 생성 마커(HAVIT-TOKENS:BEGIN/END)가 없다`)
    continue
  }
  const actual = parseDecls(block.body)
  const expected = parseDecls(renderBlock(tokens, t.map, t.indent))

  for (const [name, want] of expected) {
    const got = actual.get(name)
    if (got === undefined) problems.push(`${t.file}: ${name} 선언이 사라졌다`)
    else if (got.toLowerCase() !== want.toLowerCase()) problems.push(`${t.file}: ${name} = ${got} (tokens.json: ${want})`)
  }
  for (const name of actual.keys()) {
    if (!expected.has(name)) problems.push(`${t.file}: ${name} 은 생성 구간 밖에 있어야 한다 (tokens.json 에 없는 토큰)`)
  }
}

// tailwind primary 스케일 — 생성하지 않고 겹치는 세 단계만 대조한다.
{
  const src = readFileSync(resolve(ROOT, TAILWIND.file), 'utf-8')
  for (const { step, token } of TAILWIND.expect) {
    const m = src.match(new RegExp(`\\b${step}\\s*:\\s*'(#[0-9a-f]{3,8})'`, 'i'))
    if (!m) problems.push(`${TAILWIND.file}: primary.${step} 을 찾지 못했다`)
    else if (m[1].toLowerCase() !== tokens[token].toLowerCase()) {
      problems.push(`${TAILWIND.file}: primary.${step} = ${m[1]} (tokens.json '${token}': ${tokens[token]})`)
    }
  }
}

if (problems.length) {
  console.error('❌ 디자인 토큰이 SSOT(packages/design/tokens.json)와 어긋난다\n')
  for (const p of problems) console.error('   ' + p)
  console.error('\n   값을 바꾸려면 tokens.json 을 고치고 `node packages/design/generate.mjs` 를 돌리세요.')
  process.exit(1)
}

const n = TARGETS.reduce((a, t) => a + Object.keys(t.map).length, 0) + TAILWIND.expect.length
console.log(`디자인 토큰 정합 OK — ${n}개 확인 (${TARGETS.length}개 CSS + tailwind ${TAILWIND.expect.length}단계)`)
