/**
 * enrich-references — Backfill verifiable URLs to article references.
 *
 * Strategy (zero AI cost):
 *   1. Crossref API (https://api.crossref.org/works) — DOI lookup by title + container
 *      → resolves to https://doi.org/{doi}
 *   2. PubMed E-utility (https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi)
 *      → resolves to https://pubmed.ncbi.nlm.nih.gov/{pmid}/
 *   3. Skip if neither finds a match (rather than fake/hallucinated URL)
 *
 * Output: each ref becomes { title, source, url? }. Idempotent — re-running
 * only fills missing url fields.
 */

import { promises as fs } from 'fs';
import path from 'path';

const ARTICLES_DIR = path.resolve(__dirname, '../data/articles');
const SLEEP_MS = 100; // be polite to free APIs

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

interface RefIn {
  title?: string;
  text?: string;
  source?: string;
  url?: string;
}

async function findCrossrefDoi(title: string, source: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${title} ${source}`.slice(0, 200));
    const url = `https://api.crossref.org/works?query.bibliographic=${query}&rows=1&select=DOI,title,container-title`;
    const r = await fetch(url, {
      headers: { 'User-Agent': 'HAVIT-Blog-Backfill/1.0 (mailto:help@aiconnects.me)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    const j: any = await r.json();
    const item = j?.message?.items?.[0];
    if (!item?.DOI) return null;
    const itemTitle = (item.title?.[0] ?? '').toLowerCase();
    const wanted = title.toLowerCase();
    const overlapWords = wanted.split(/\s+/).filter((w) => w.length > 3 && itemTitle.includes(w));
    if (overlapWords.length < 2) return null;
    return item.DOI;
  } catch {
    return null;
  }
}

async function findPubmedPmid(title: string): Promise<string | null> {
  try {
    const term = encodeURIComponent(title.slice(0, 200));
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=1&term=${term}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const j: any = await r.json();
    const id = j?.esearchresult?.idlist?.[0];
    return id ?? null;
  } catch {
    return null;
  }
}

async function enrichOne(ref: RefIn): Promise<{ ref: RefIn; hit: 'doi' | 'pubmed' | 'miss'; changed: boolean }> {
  if (ref.url) return { ref, hit: 'miss', changed: false };
  const title = ref.title ?? ref.text ?? '';
  const source = ref.source ?? '';
  if (!title) return { ref, hit: 'miss', changed: false };

  const doi = await findCrossrefDoi(title, source);
  if (doi) {
    return { ref: { ...ref, url: `https://doi.org/${doi}` }, hit: 'doi', changed: true };
  }
  await sleep(SLEEP_MS);
  const pmid = await findPubmedPmid(title);
  if (pmid) {
    return { ref: { ...ref, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` }, hit: 'pubmed', changed: true };
  }
  return { ref, hit: 'miss', changed: false };
}

interface Counters {
  articles_processed: number;
  refs_seen: number;
  refs_changed: number;
  hits_doi: number;
  hits_pubmed: number;
  hits_miss: number;
  errors: number;
}

async function processArticle(filePath: string, c: Counters): Promise<void> {
  let modified = false;
  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf-8');
  } catch {
    c.errors++;
    return;
  }
  let a: any;
  try {
    a = JSON.parse(raw);
  } catch {
    c.errors++;
    return;
  }
  const langs = Object.keys(a.langs ?? {});
  for (const lang of langs) {
    const content = a.langs[lang];
    if (!content || !Array.isArray(content.references)) continue;
    const next: RefIn[] = [];
    for (const r of content.references as RefIn[]) {
      c.refs_seen++;
      const out = await enrichOne(r);
      next.push(out.ref);
      if (out.changed) {
        c.refs_changed++;
        modified = true;
        if (out.hit === 'doi') c.hits_doi++;
        if (out.hit === 'pubmed') c.hits_pubmed++;
      } else {
        c.hits_miss++;
      }
      await sleep(SLEEP_MS);
    }
    content.references = next;
  }
  if (modified) {
    await fs.writeFile(filePath, JSON.stringify(a, null, 2), 'utf-8');
  }
  c.articles_processed++;
}

async function main(): Promise<void> {
  const arg = process.argv[2];
  const limit = arg ? parseInt(arg, 10) : Infinity;

  const files = (await fs.readdir(ARTICLES_DIR))
    .filter((f) => f.endsWith('.json'))
    .sort();
  const target = files.slice(0, limit);

  const c: Counters = {
    articles_processed: 0,
    refs_seen: 0,
    refs_changed: 0,
    hits_doi: 0,
    hits_pubmed: 0,
    hits_miss: 0,
    errors: 0,
  };

  console.log(`[enrich] processing ${target.length} of ${files.length} articles...`);
  const start = Date.now();

  for (let i = 0; i < target.length; i++) {
    const f = target[i];
    await processArticle(path.join(ARTICLES_DIR, f), c);
    if ((i + 1) % 10 === 0 || i === target.length - 1) {
      const elapsedS = Math.round((Date.now() - start) / 1000);
      const hitRate = c.refs_seen ? ((c.refs_changed / c.refs_seen) * 100).toFixed(1) : '0';
      console.log(`[enrich] ${i + 1}/${target.length} (${elapsedS}s) | refs ${c.refs_changed}/${c.refs_seen} (${hitRate}%) | doi ${c.hits_doi} pubmed ${c.hits_pubmed} miss ${c.hits_miss}`);
    }
  }

  console.log('\n[enrich] DONE');
  console.log(JSON.stringify(c, null, 2));

  // Auto-push (refs_changed > 0 only) so sitemap-revalidating CDN reflects new links.
  if (c.refs_changed === 0) return;
  try {
    const { execSync } = require('child_process');
    const cwd = path.resolve(__dirname, '..');
    execSync('git add data/articles/', { cwd, stdio: 'inherit' });
    const msg = `content: enrich references with verifiable URLs (${c.refs_changed} URLs added: ${c.hits_doi} DOI + ${c.hits_pubmed} PubMed across ${c.articles_processed} articles)`;
    execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd, stdio: 'inherit' });
    execSync('git push origin main', { cwd, stdio: 'inherit' });
    console.log('[enrich] auto-pushed. Vercel will rebuild.');
  } catch (err) {
    console.error('[enrich] auto-push failed (push manually):', (err as Error).message);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[enrich] fatal:', err);
    process.exit(1);
  });
}
