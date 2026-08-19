#!/usr/bin/env node
/**
 * tokens.json → 각 앱의 :root 생성 구간을 다시 쓴다. 몇 번 돌려도 결과가 같다.
 *
 * Usage: node packages/design/generate.mjs
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { TARGETS, renderBlock } from './targets.mjs'
import { ROOT, loadTokens, findBlock, readTarget } from './lib.mjs'

const tokens = loadTokens()
let changed = 0

for (const t of TARGETS) {
  const src = readTarget(t.file)
  const block = findBlock(src)
  if (!block) {
    console.error(`❌ ${t.file}: 생성 마커가 없다.`)
    console.error('   :root 안에 아래 두 줄을 넣고 그 사이를 비워두세요.')
    console.error('     /* HAVIT-TOKENS:BEGIN */')
    console.error('     /* HAVIT-TOKENS:END */')
    process.exit(1)
  }

  const next = renderBlock(tokens, t.map, t.indent) + '\n'
  if (next === block.body) {
    console.log(`  변화없음  ${t.file}`)
    continue
  }
  writeFileSync(resolve(ROOT, t.file), src.slice(0, block.bodyStart) + next + src.slice(block.bodyEnd))
  changed++
  console.log(`  갱신      ${t.file}`)
}

console.log(`\n대상 ${TARGETS.length}개 · 갱신 ${changed}개 · 토큰 ${Object.keys(tokens).length}개`)
