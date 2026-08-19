import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import i18nHtml from './plugins/i18n-html.js'
import sitemap from './plugins/sitemap.js'

// Single-source multilingual site. index.html is the English original; the
// i18n plugin generates /ko/, /ja/ and /zh-tw/ from it at build time using
// src/i18n/<locale>.json, so there is exactly one HTML file to maintain.
// It also serves those paths in `vite dev`.
//
// sitemap.xml is generated from that same locale list rather than kept as a
// static file, so lastmod cannot go stale behind a deploy.
//
// The blog lives on blog.aihavit.com (Next.js) and /blog/* is 301'd there in
// vercel.json. If a second real page is ever added here it needs its own entry
// below — Vite silently bundles only index.html otherwise.
const ROOT = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [i18nHtml(), sitemap()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(ROOT, 'index.html'),
      },
    },
  },
})
