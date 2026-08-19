/** generate.mjs 와 check.mjs 가 공유하는 읽기/추출 로직. */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BEGIN, END } from './targets.mjs'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

export function loadTokens() {
  const raw = JSON.parse(readFileSync(resolve(ROOT, 'packages/design/tokens.json'), 'utf-8'))
  if (!raw.tokens || !Object.keys(raw.tokens).length) throw new Error('tokens.json 이 비었다')
  return raw.tokens
}

/**
 * 마커 사이 구간을 찾는다. 없으면 null — 호출부가 "마커를 심어라" 라고
 * 안내할 수 있게 예외 대신 null 을 준다.
 */
export function findBlock(source) {
  const b = source.indexOf(BEGIN)
  const e = source.indexOf(END)
  if (b < 0 || e < 0) return null
  if (e < b) throw new Error('END 마커가 BEGIN 보다 앞에 있다')

  // 마커는 주석 안에 있다. 본문은 BEGIN 주석의 다음 줄부터 END 주석 줄 앞까지.
  const bodyStart = source.indexOf('\n', b) + 1
  const bodyEnd = source.lastIndexOf('\n', e) + 1
  return { bodyStart, bodyEnd, body: source.slice(bodyStart, bodyEnd) }
}

/** 생성 구간 안의 `--name: value;` 선언을 뽑는다. */
export function parseDecls(body) {
  const out = new Map()
  for (const m of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    out.set(m[1], m[2].trim().replace(/\s+/g, ' '))
  }
  return out
}

export function readTarget(file) {
  return readFileSync(resolve(ROOT, file), 'utf-8')
}
