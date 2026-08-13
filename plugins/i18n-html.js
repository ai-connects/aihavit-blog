import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const I18N_DIR = resolve(HERE, '../src/i18n')

/**
 * Locales served by this site.
 *
 * Deliberately the same four the blog serves (lib/i18n.ts INDEXABLE_ROUTE_LANGS
 * over on aihavit-blog-fresh). The blog returns HTTP 410 for its other six
 * language paths to claw back crawl budget on a young domain, so publishing
 * more languages here would work against that. Promote in waves: add the locale
 * on both sides, add a translation JSON, done — hreflang and the switcher pick
 * it up automatically.
 */
export const DEFAULT_LOCALE = 'en'
export const LOCALES = ['en', 'ko', 'ja', 'zh-tw']

export const LOCALE_META = {
  en: { htmlLang: 'en', hreflang: 'en', native: 'English' },
  ko: { htmlLang: 'ko', hreflang: 'ko', native: '한국어' },
  ja: { htmlLang: 'ja', hreflang: 'ja', native: '日本語' },
  'zh-tw': { htmlLang: 'zh-Hant-TW', hreflang: 'zh-Hant', native: '繁體中文' },
}

const SITE = 'https://www.aihavit.com'

function loadDict(locale) {
  return JSON.parse(readFileSync(resolve(I18N_DIR, `${locale}.json`), 'utf-8'))
}

/** Absolute site URL for a locale's home page. */
export function localeUrl(locale) {
  return locale === DEFAULT_LOCALE ? `${SITE}/` : `${SITE}/${locale}/`
}

/**
 * Swap every `data-i18n` element's inner HTML for the localized string.
 *
 * Values may contain inline markup (`<br>`, the underline `<span>`, the mailto
 * link), which is why this replaces innerHTML wholesale rather than text only —
 * translations carry their own markup. Only leaf elements are keyed (see the
 * instrumentation in index.html), so the non-greedy match cannot swallow a
 * nested element of the same tag.
 */
function translateBody(html, dict) {
  let missing = 0
  const out = html.replace(
    /<([a-z0-9]+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi,
    (whole, tag, attrs, key, inner) => {
      const value = dict[key]
      if (value === undefined) {
        missing++
        return whole
      }
      return `<${tag}${attrs}>${value}</${tag}>`
    },
  )
  return { html: out, missing }
}

/** Rewrite <html lang>, <title>, meta description, canonical + hreflang set. */
function translateHead(html, locale, dict) {
  const meta = LOCALE_META[locale]
  html = html.replace(/<html\b[^>]*\blang="[^"]*"/i, `<html lang="${meta.htmlLang}"`)

  if (dict.__title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${dict.__title}</title>`)
  }
  if (dict.__description) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${dict.__description}" />`,
    )
  }

  // Strip any previously-injected block so re-runs stay idempotent.
  html = html.replace(/\s*<!-- i18n:alternates -->[\s\S]*?<!-- \/i18n:alternates -->/i, '')

  const links = [
    `    <link rel="canonical" href="${localeUrl(locale)}" />`,
    ...LOCALES.map(
      (l) =>
        `    <link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${localeUrl(l)}" />`,
    ),
    `    <link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE)}" />`,
  ].join('\n')

  return html.replace(
    /<\/head>/i,
    `    <!-- i18n:alternates -->\n${links}\n    <!-- /i18n:alternates -->\n  </head>`,
  )
}

/** Root-relative asset paths already work from /<locale>/, so nothing to rewrite. */
export function renderLocale(baseHtml, locale) {
  const dict = locale === DEFAULT_LOCALE ? {} : loadDict(locale)
  const { html, missing } = locale === DEFAULT_LOCALE
    ? { html: baseHtml, missing: 0 }
    : translateBody(baseHtml, dict)
  return { html: translateHead(html, locale, dict), missing }
}

export default function i18nHtml() {
  return {
    name: 'havit-i18n-html',
    enforce: 'post',

    /** Dev: serve /ko/, /ja/, /zh-tw/ from the same source index.html. */
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const m = /^\/([a-z-]+)\/?(?:\?|$)/.exec(req.url || '')
        const locale = m && m[1]
        if (!locale || !LOCALES.includes(locale) || locale === DEFAULT_LOCALE) return next()
        try {
          const raw = readFileSync(resolve(HERE, '../index.html'), 'utf-8')
          const transformed = await server.transformIndexHtml(`/${locale}/`, raw)
          const { html, missing } = renderLocale(transformed, locale)
          if (missing) server.config.logger.warn(`[i18n] ${locale}: ${missing} missing keys`)
          res.setHeader('Content-Type', 'text/html')
          res.end(html)
        } catch (e) {
          next(e)
        }
      })
    },

    /** Build: emit one extra HTML file per non-default locale. */
    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (!index) return
      const base = typeof index.source === 'string' ? index.source : index.source.toString()

      // The default locale still needs canonical + hreflang injected.
      const root = renderLocale(base, DEFAULT_LOCALE)
      index.source = root.html

      for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue
        const { html, missing } = renderLocale(base, locale)
        if (missing) this.warn(`[i18n] ${locale}: ${missing} keys missing from src/i18n/${locale}.json`)
        this.emitFile({ type: 'asset', fileName: `${locale}/index.html`, source: html })
      }
    },
  }
}

/** Sanity helper for scripts: which locale JSON files exist. */
export function availableLocales() {
  return readdirSync(I18N_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
}
