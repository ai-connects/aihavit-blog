/**
 * Generate src/i18n/footer-articles.json from the blog repo.
 *
 * The homepage links into blog.aihavit.com, but the article titles live in the
 * blog's own data/articles/*.json. Rather than hand-copying 36 links × 4
 * languages of labels (which would drift the moment a title is edited), this
 * reads the blog repo once and bakes a small JSON the Vite i18n plugin renders.
 *
 * The cluster definition is the blog's lib/footer-links.ts — parsed here so
 * there is one source of truth for *which* articles are promoted, on both sites.
 *
 * Usage:  node scripts/build-footer-articles.mjs [path-to-blog-app]
 *
 * Default resolves to the sibling app in this monorepo (apps/blog). Before the
 * two repos merged this pointed at a checkout that had to sit next to this one;
 * an override argument is still accepted for one-off runs.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const BLOG = process.argv[2] ?? resolve(HERE, '../../blog')

/** Blog languages that are actually served; everything else 410s over there. */
const BLOG_LANGS = ['en', 'ko', 'ja', 'zh-tw']
const LANG_TO_DATA = { en: 'en', ko: 'ko', ja: 'ja', 'zh-tw': 'zh-TW' }

const src = readFileSync(resolve(BLOG, 'lib/footer-links.ts'), 'utf-8')
const groups = []
for (const m of src.matchAll(/key:\s*'([a-zA-Z0-9]+)',\s*slugs:\s*\[([\s\S]*?)\]/g)) {
  const key = m[1]
  const slugs = [...m[2].matchAll(/'([a-z0-9-]{12,})'/g)].map((s) => s[1])
  if (slugs.length) groups.push({ key, slugs })
}
if (!groups.length) throw new Error('no groups parsed from blog lib/footer-links.ts')

/** Same rule the blog footer uses: cut at the first separator, budget by display width. */
const width = (t) =>
  [...t].reduce(
    (n, ch) =>
      n + (/[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠]/.test(ch) ? 2 : 1),
    0,
  )
function shortLabel(title) {
  const MAX = 46
  for (const sep of [': ', '：', ' — ', ' – ', ' - ', '—', '? ', '？', ', ']) {
    const i = title.indexOf(sep)
    if (i > 5) {
      const head = title.slice(0, i).trim()
      if (width(head) <= MAX) return head
    }
  }
  if (width(title) <= MAX) return title
  let out = ''
  for (const ch of title) {
    if (width(out + ch) > MAX - 1) break
    out += ch
  }
  return `${out.trimEnd()}…`
}

let missing = 0
const out = groups.map((g) => ({
  key: g.key,
  links: g.slugs
    .map((slug) => {
      const p = resolve(BLOG, 'data/articles', `${slug}.json`)
      if (!existsSync(p)) {
        missing++
        console.warn(`  ! missing article: ${slug}`)
        return null
      }
      const a = JSON.parse(readFileSync(p, 'utf-8'))
      const labels = {}
      for (const lang of BLOG_LANGS) {
        const t = a.langs?.[LANG_TO_DATA[lang]]?.title
        if (t) labels[lang] = shortLabel(t)
      }
      return { slug, labels }
    })
    .filter(Boolean),
}))

const dest = resolve(HERE, '../src/i18n/footer-articles.json')
writeFileSync(dest, `${JSON.stringify({ blogLangs: BLOG_LANGS, groups: out }, null, 2)}\n`)
console.log(
  `wrote ${dest.split('/').slice(-3).join('/')} — ${out.length} groups, ` +
    `${out.reduce((n, g) => n + g.links.length, 0)} links, ${missing} missing`,
)
