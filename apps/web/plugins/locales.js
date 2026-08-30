/**
 * Locale SSOT for the marketing site.
 *
 * This table used to live in plugins/i18n-html.js. It moved here because two
 * very different consumers need it and only one of them can run Node:
 *
 *   - plugins/i18n-html.js / plugins/sitemap.js — build time, Node, reads files
 *   - middleware.js — Vercel Routing Middleware, edge runtime, no `node:fs`
 *
 * i18n-html.js reads footer-articles.json with readFileSync at module scope, so
 * importing it from the middleware would drag `node:fs` into the edge bundle.
 * Keeping the table in a dependency-free module lets both sides import the same
 * list instead of the middleware carrying a second copy that silently drifts.
 *
 * SSOT above this file is the app's own locale set
 * (havit-wellness-app/app/assets/localization, 35 ARB files). en_US is the root
 * page and en_GB folds into it, leaving the 33 localized paths below.
 *
 * Adding a locale: add the entry here AND src/i18n/<locale>.json in the same
 * change. The build only emits a locale page once its JSON exists
 * (translatedLocales() in i18n-html.js), but the middleware routes on this
 * table alone — an entry without a translation file means it would 302 a
 * visitor to a page that was never emitted.
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
