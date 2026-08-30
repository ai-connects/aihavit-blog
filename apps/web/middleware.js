import { next } from '@vercel/functions'
import { DEFAULT_LOCALE, LOCALES } from './plugins/locales.js'

/**
 * Send first-time visitors on `/` to the edition their device asks for.
 *
 * The 34 locale pages have been built and live since the i18n plugin landed,
 * and hreflang has always pointed at them — but nothing ever routed a visitor
 * there. A phone set to Korean opened aihavit.com and got English; the only way
 * to /ko/ was the language menu or a search result. This closes that gap.
 *
 * SEO shape, deliberately the one Google documents for locale-adaptive pages:
 *
 *   - 302, never 301. The root URL is not permanently "the Korean page"; it is
 *     the English edition that sometimes forwards. A 301 would teach caches and
 *     crawlers otherwise, and it is not undoable once cached.
 *   - No bot special-casing. Serving Googlebot something other than what a
 *     visitor with the same Accept-Language gets is cloaking. Googlebot crawls
 *     with `Accept-Language: en` (or none), so it stays on the English root by
 *     the same rule everyone else follows, and reaches the localized pages via
 *     hreflang + sitemap as it already does.
 *   - `Vary: Accept-Language, Cookie` on the redirect only. Putting Vary on the
 *     200 would fragment the CDN cache of the site's most-hit page across every
 *     distinct Accept-Language string; the redirect itself is `no-store`, and
 *     middleware runs before the cache on every request anyway.
 *
 * The cookie is what keeps the English edition reachable. Without it, a Korean
 * device clicking "English" in the switcher would land on `/` and be bounced
 * straight back to /ko/ — the language menu would look broken. One redirect
 * writes hv_lang, and after that `/` is served as-is.
 */

const COOKIE = 'hv_lang'
const YEAR = 60 * 60 * 24 * 365

const SERVED = new Set(LOCALES)

/**
 * Browser tags that do not equal one of our locale directory names.
 *
 * Chinese is the case that actually bites: `zh-HK` and `zh-Hant` are Traditional
 * and must not fall through to the Simplified page just because their base
 * subtag is `zh`, so script and region are resolved before any base fallback.
 * `iw`/`in` are the legacy ISO codes for Hebrew and Indonesian that some older
 * Android builds still send.
 */
const ALIAS = {
  no: 'nb',
  nn: 'nb',
  iw: 'he',
  in: 'id',
  'pt-br': 'pt',
  'pt-pt': 'pt',
}

/** One Accept-Language tag → a locale we actually serve, or null. */
function toLocale(tag) {
  if (SERVED.has(tag)) return tag
  if (ALIAS[tag]) return ALIAS[tag]

  const base = tag.split('-')[0]

  if (base === 'zh') {
    // Traditional: explicit script, or one of the regions that uses it.
    return /(^|-)(hant|tw|hk|mo)(-|$)/.test(tag) ? 'zh-tw' : 'zh-cn'
  }

  if (ALIAS[base]) return ALIAS[base]
  return SERVED.has(base) ? base : null
}

/**
 * Accept-Language → the first tag we serve, honouring q-weights.
 *
 * A device set to Korean with English second sends `ko-KR,ko;q=0.9,en;q=0.8`.
 * Reading in header order would be right here but wrong for the many browsers
 * that do not emit tags in weight order, so the weights are parsed. Equal
 * weights keep header order — Array#sort is stable.
 */
function pickLocale(header) {
  if (!header) return null

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      const weight = q === undefined ? 1 : Number.parseFloat(q.slice(2))
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(weight) ? weight : 0 }
    })
    .filter((entry) => entry.tag && entry.tag !== '*' && entry.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const locale = toLocale(tag)
    if (locale) return locale
  }
  return null
}

function redirect(to, locale) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: to,
      'Set-Cookie': `${COOKIE}=${locale}; Path=/; Max-Age=${YEAR}; SameSite=Lax; Secure`,
      'Cache-Control': 'no-store',
      Vary: 'Accept-Language, Cookie',
    },
  })
}

export default function middleware(request) {
  const url = new URL(request.url)

  /**
   * `?lang=` is the explicit override, and the language menu on every localized
   * page links to `/?lang=en` for exactly this reason: a visitor who arrived at
   * /ko/ from search has no cookie yet, so a bare `/` would bounce them back.
   */
  const requested = url.searchParams.get('lang')?.toLowerCase()
  if (requested) {
    const locale = toLocale(requested)
    if (locale) {
      // Redirect even for `en` — the response has to carry Set-Cookie, and the
      // cookie is what stops the next `/` visit from forwarding again.
      return redirect(locale === DEFAULT_LOCALE ? '/' : `/${locale}/`, locale)
    }
  }

  // Already routed once, or chose a language explicitly. Leave them alone.
  if (request.headers.get('cookie')?.includes(`${COOKIE}=`)) return next()

  const locale = pickLocale(request.headers.get('accept-language'))
  if (!locale || locale === DEFAULT_LOCALE) return next()

  return redirect(`/${locale}/`, locale)
}

/**
 * Root only. The locale pages, /affiliate/, the legal documents and every asset
 * skip the middleware entirely — they are already unambiguous about which
 * edition they are, and an unmatched path is never even invoked.
 */
export const config = {
  matcher: '/',
}
