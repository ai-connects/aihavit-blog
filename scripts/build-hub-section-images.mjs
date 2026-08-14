#!/usr/bin/env node
/**
 * 허브 아티클의 섹션별 사진 배정.
 *
 * scripts/build-article-images.ts 는 아티클 1건에 히어로 1장을 배정한다.
 * 허브 레이아웃은 본문 중간에도 사진을 넣는데, 그때 히어로를 다시 쓰면 한 글
 * 안에서 같은 사진이 서너 번 반복된다. 여기서는 섹션 제목을 질의로 삼아
 * 카탈로그(289장)에서 서로 다른 사진을 고른다.
 *
 * 배정 규칙
 *   - 히어로로 쓰인 사진은 제외 (글 안에서 중복 금지)
 *   - 같은 글에서 이미 쓴 사진도 제외
 *   - 같은 카테고리 사진에 가산점
 *   - 사이트 전역 재사용 횟수에 감점 (몇 장이 사이트를 도배하지 않게)
 *
 * 커밋된 JSON 으로 남긴다 — 요청마다 계산하면 배포마다 그림이 바뀌어
 * og:image 와 소셜 캐시가 흔들린다(build-article-images.ts 와 같은 이유).
 *
 * Usage: node scripts/build-hub-section-images.mjs [--report]
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'

const ROOT = process.cwd()
const CSV = path.join(ROOT, 'data/article-image-catalog.csv')
const ARTICLES = path.join(ROOT, 'data/articles')
const HERO_MAP = path.join(ROOT, 'data/article-images.json')
const OUT = path.join(ROOT, 'data/hub-section-images.json')

const STOP = new Set(
  'the a an and or for to of on in with you your how what why when is are was were be been do does did this that these those it its as at by from not no can could should would will may might your my our their his her'.split(
    ' '
  )
)
const tok = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, ' ')
    .split(' ')
    .filter((t) => t.length > 1 && !STOP.has(t))

/* ── 카탈로그 ─────────────────────────────────────────────────────────────── */
const rows = readFileSync(CSV, 'utf8').split(/\r?\n/).filter(Boolean)
rows.shift()
/** file → { file, category, titles[] } — 한 사진을 여러 앱 아티클이 공유한다. */
const byFile = new Map()
for (const line of rows) {
  const first = line.indexOf(',')
  const second = line.indexOf(',', first + 1)
  const last = line.lastIndexOf(',')
  if (first < 0 || second < 0 || last <= second) continue
  const category = line.slice(first + 1, second)
  const title = line.slice(second + 1, last).replace(/^"|"$/g, '')
  const url = line.slice(last + 1)
  const file = url.split('/').pop()
  if (!file) continue
  if (!byFile.has(file)) byFile.set(file, { file, category, titles: [] })
  byFile.get(file).titles.push(title)
}
const CATALOG = [...byFile.values()].map((c) => ({
  ...c,
  tokens: new Set([...tok(c.titles.join(' ')), ...tok(c.category)]),
}))

/* ── 아티클 ───────────────────────────────────────────────────────────────── */
const heroMap = JSON.parse(readFileSync(HERO_MAP, 'utf8')).map ?? {}
const globalUse = new Map()
for (const f of Object.values(heroMap)) globalUse.set(f, (globalUse.get(f) || 0) + 1)

/** body_md 에서 h2 제목만 뽑는다(뷰의 섹션 구분과 동일 규칙). */
const sectionTitles = (md) =>
  md
    .split(/\r?\n/)
    .map((l) => l.match(/^##\s+(?!#)(.*)$/))
    .filter(Boolean)
    .map((m) => m[1].trim())

const out = {}
const report = []

for (const f of readdirSync(ARTICLES).filter((x) => x.endsWith('.json')).sort()) {
  const a = JSON.parse(readFileSync(path.join(ARTICLES, f), 'utf8'))
  if (a.layout !== 'hub') continue

  const content = a.langs?.en ?? a.langs?.ko
  if (!content?.body_md) continue

  const titles = sectionTitles(content.body_md)
  if (!titles.length) continue

  const hero = heroMap[a.slug]
  const usedInArticle = new Set(hero ? [hero] : [])
  const picks = []

  for (const title of titles) {
    const q = new Set([...tok(title), ...tok(a.primary_keyword_en || ''), ...tok(a.category)])
    let best = null
    let bestScore = -Infinity
    for (const c of CATALOG) {
      if (usedInArticle.has(c.file)) continue
      let overlap = 0
      for (const t of q) if (c.tokens.has(t)) overlap++
      let score = overlap * 3
      if (c.category === a.category) score += 2
      score -= (globalUse.get(c.file) || 0) * 0.6
      if (score > bestScore) {
        bestScore = score
        best = c
      }
    }
    if (!best) break
    usedInArticle.add(best.file)
    globalUse.set(best.file, (globalUse.get(best.file) || 0) + 1)
    picks.push(best.file)
    report.push({ slug: a.slug, title, file: best.file, score: bestScore })
  }

  out[a.slug] = picks
}

writeFileSync(
  OUT,
  JSON.stringify(
    {
      _generated: 'scripts/build-hub-section-images.mjs',
      _note: '허브 아티클 섹션별 사진. 인덱스 = body_md 의 h2 순서. 히어로와 서로 겹치지 않는다.',
      map: out,
    },
    null,
    2
  ) + '\n'
)

const total = Object.values(out).reduce((n, v) => n + v.length, 0)
const distinct = new Set(Object.values(out).flat()).size
console.log(`허브 ${Object.keys(out).length}건 · 섹션 사진 ${total}장 → 고유 ${distinct}장`)
const dupInArticle = Object.entries(out).filter(([, v]) => new Set(v).size !== v.length)
console.log(`  글 내부 중복: ${dupInArticle.length}건 ${dupInArticle.length ? '❌' : '✅'}`)
if (process.argv.includes('--report')) {
  const heavy = [...globalUse.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
  console.log('  전역 최다 재사용:', heavy.map(([f, n]) => `${f}×${n}`).join(', '))
}
