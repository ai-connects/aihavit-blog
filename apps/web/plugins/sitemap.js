/**
 * sitemap.xml, generated at build time.
 *
 * It used to be a hand-maintained file in public/, which meant `lastmod` only
 * moved when someone remembered to edit it — and nobody did. Three releases
 * went out over the days after 2026-08-13 while the sitemap kept telling
 * crawlers nothing had changed, so none of them triggered a re-crawl.
 *
 * Generating it removes the remembering. Locale pages get the build date because
 * they are rebuilt from index.html on every deploy; the legal documents get
 * their own dates because they genuinely only change when the document does.
 */

import { LOCALES, LOCALE_META, DEFAULT_LOCALE, localeUrl, translatedLocales } from './i18n-html.js'

const SITE = 'https://www.aihavit.com'

/**
 * Documents that change on their own schedule. Bump the date here when the text
 * changes — that is the whole point of them not tracking the build date.
 */
const DOCUMENTS = [
  { path: '/privacy.html', lastmod: '2026-05-24' },
  { path: '/terms.html', lastmod: '2026-06-19' },
  { path: '/refund.html', lastmod: '2026-06-19' },
  { path: '/refund-ko.html', lastmod: '2026-06-19' },
  { path: '/eula.html', lastmod: '2026-06-19' },
  { path: '/eula-ko.html', lastmod: '2026-06-19' },
]

function today() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * The locale pages are 34 translations of one page, so each entry carries the
 * full alternate set. The HTML already declares hreflang and that alone is
 * valid, but the blog's sitemap annotates too and matching it means one rule to
 * remember instead of two.
 */
function alternates() {
  const locales = translatedLocales()
  return [
    ...locales.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].hreflang}" href="${localeUrl(l)}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(DEFAULT_LOCALE)}" />`,
  ].join('\n')
}

function buildSitemap() {
  const stamp = today()
  const alt = alternates()

  const localeUrls = translatedLocales().map((l) =>
    [
      '  <url>',
      `    <loc>${localeUrl(l)}</loc>`,
      `    <lastmod>${stamp}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      `    <priority>${l === DEFAULT_LOCALE ? '1.0' : '0.8'}</priority>`,
      alt,
      '  </url>',
    ].join('\n'),
  )

  const documentUrls = DOCUMENTS.map((d) =>
    [
      '  <url>',
      `    <loc>${SITE}${d.path}</loc>`,
      `    <lastmod>${d.lastmod}</lastmod>`,
      '    <changefreq>yearly</changefreq>',
      '    <priority>0.3</priority>',
      '  </url>',
    ].join('\n'),
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...localeUrls,
    ...documentUrls,
    '</urlset>',
    '',
  ].join('\n')
}

export default function sitemap() {
  return {
    name: 'havit-sitemap',
    // i18n-html decides which locales actually ship, so this has to run after it.
    enforce: 'post',

    /** Dev: serve the same file the build emits, so the two cannot disagree. */
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url || '').split('?')[0] !== '/sitemap.xml') return next()
        res.setHeader('Content-Type', 'application/xml')
        res.end(buildSitemap())
      })
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
    },
  }
}

export { buildSitemap, LOCALES }
