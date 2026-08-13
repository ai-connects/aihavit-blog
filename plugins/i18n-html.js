import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const I18N_DIR = resolve(HERE, '../src/i18n')

/**
 * Locales served by this site.
 *
 * SSOT is the app's own locale set (havit-wellness-app/app/assets/localization,
 * 35 ARB files). en_US is the root page and en_GB folds into it, leaving the 33
 * localized paths below.
 *
 * Note for SEO: the blog currently serves only en/ja/ko/zh-tw and 410s its other
 * language paths to concentrate crawl budget on a young domain. The homepage is
 * a single page rather than ~1k articles per language, so the thin-content risk
 * that drove that decision does not apply here in the same way — but if index
 * coverage stalls, this list is the lever to pull back.
 */
export const DEFAULT_LOCALE = 'en'

/** locale → { htmlLang, hreflang, native, dir } */
export const LOCALE_META = {
  en: { htmlLang: 'en', hreflang: 'en', native: 'English' },
  ar: { htmlLang: 'ar', hreflang: 'ar', native: 'العربية', dir: 'rtl' },
  ca: { htmlLang: 'ca', hreflang: 'ca', native: 'Català' },
  cs: { htmlLang: 'cs', hreflang: 'cs', native: 'Čeština' },
  da: { htmlLang: 'da', hreflang: 'da', native: 'Dansk' },
  de: { htmlLang: 'de', hreflang: 'de', native: 'Deutsch' },
  el: { htmlLang: 'el', hreflang: 'el', native: 'Ελληνικά' },
  es: { htmlLang: 'es', hreflang: 'es', native: 'Español' },
  fi: { htmlLang: 'fi', hreflang: 'fi', native: 'Suomi' },
  fr: { htmlLang: 'fr', hreflang: 'fr', native: 'Français' },
  he: { htmlLang: 'he', hreflang: 'he', native: 'עברית', dir: 'rtl' },
  hi: { htmlLang: 'hi', hreflang: 'hi', native: 'हिन्दी' },
  hr: { htmlLang: 'hr', hreflang: 'hr', native: 'Hrvatski' },
  hu: { htmlLang: 'hu', hreflang: 'hu', native: 'Magyar' },
  id: { htmlLang: 'id', hreflang: 'id', native: 'Bahasa Indonesia' },
  it: { htmlLang: 'it', hreflang: 'it', native: 'Italiano' },
  ja: { htmlLang: 'ja', hreflang: 'ja', native: '日本語' },
  ko: { htmlLang: 'ko', hreflang: 'ko', native: '한국어' },
  ms: { htmlLang: 'ms', hreflang: 'ms', native: 'Bahasa Melayu' },
  nb: { htmlLang: 'nb', hreflang: 'nb', native: 'Norsk bokmål' },
  nl: { htmlLang: 'nl', hreflang: 'nl', native: 'Nederlands' },
  pl: { htmlLang: 'pl', hreflang: 'pl', native: 'Polski' },
  pt: { htmlLang: 'pt', hreflang: 'pt', native: 'Português' },
  ro: { htmlLang: 'ro', hreflang: 'ro', native: 'Română' },
  ru: { htmlLang: 'ru', hreflang: 'ru', native: 'Русский' },
  sk: { htmlLang: 'sk', hreflang: 'sk', native: 'Slovenčina' },
  sv: { htmlLang: 'sv', hreflang: 'sv', native: 'Svenska' },
  th: { htmlLang: 'th', hreflang: 'th', native: 'ไทย' },
  tr: { htmlLang: 'tr', hreflang: 'tr', native: 'Türkçe' },
  uk: { htmlLang: 'uk', hreflang: 'uk', native: 'Українська' },
  uz: { htmlLang: 'uz', hreflang: 'uz', native: 'Oʻzbekcha' },
  vi: { htmlLang: 'vi', hreflang: 'vi', native: 'Tiếng Việt' },
  'zh-cn': { htmlLang: 'zh-Hans-CN', hreflang: 'zh-Hans', native: '简体中文' },
  'zh-tw': { htmlLang: 'zh-Hant-TW', hreflang: 'zh-Hant', native: '繁體中文' },
}

export const LOCALES = Object.keys(LOCALE_META)

const SITE = 'https://www.aihavit.com'

function loadDict(locale) {
  return JSON.parse(readFileSync(resolve(I18N_DIR, `${locale}.json`), 'utf-8'))
}

/**
 * Locales that actually have a translation file. LOCALE_META lists every locale
 * the site intends to serve; a locale without JSON is simply not emitted rather
 * than failing the build, so languages can land one at a time.
 */
export function translatedLocales() {
  const present = new Set(
    readdirSync(I18N_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')),
  )
  return LOCALES.filter((l) => l === DEFAULT_LOCALE || present.has(l))
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
  // Arabic and Hebrew need dir="rtl"; every other locale must not carry a stale
  // dir attribute, so the whole <html …> tag is rewritten rather than patched.
  const dirAttr = meta.dir ? ` dir="${meta.dir}"` : ''
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${meta.htmlLang}"${dirAttr}>`)

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
    ...translatedLocales().map(
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

/**
 * Build the language menu. index.html ships a placeholder list; with 34 locales
 * it has to be generated rather than hand-maintained, and generating it per page
 * lets the current locale be marked with aria-current.
 */
function renderLangMenu(html, locale) {
  const items = translatedLocales().map((l) => {
    const cur = l === locale ? ' aria-current="true"' : ''
    return `<a href="${l === DEFAULT_LOCALE ? '/' : `/${l}/`}"${cur}>${LOCALE_META[l].native}</a>`
  }).join('')
  return html.replace(
    /(<div class="lang-switch__menu">)[\s\S]*?(<\/div>)/i,
    `$1${items}$2`,
  )
}

/** Root-relative asset paths already work from /<locale>/, so nothing to rewrite. */
export function renderLocale(baseHtml, locale) {
  const dict = locale === DEFAULT_LOCALE ? {} : loadDict(locale)
  const { html, missing } = locale === DEFAULT_LOCALE
    ? { html: baseHtml, missing: 0 }
    : translateBody(baseHtml, dict)
  return { html: renderLangMenu(translateHead(html, locale, dict), locale), missing }
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
        if (!locale || !translatedLocales().includes(locale) || locale === DEFAULT_LOCALE) return next()
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

      for (const locale of translatedLocales()) {
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
