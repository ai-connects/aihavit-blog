/**
 * Article → hero image mapping generator.
 *
 * The blog ships 1,091 articles but had no artwork: cards and article headers
 * rendered a category gradient + emoji. The HAVIT app's own article library
 * (BigQuery `articles`, 1,424 rows) carries 289 distinct S3 photos, exported to
 * data/article-image-catalog.csv as (article_id, category, title, image_url).
 *
 * Those two corpora are different — app article IDs (ART-####) do not exist on
 * the blog side — so images are assigned by MEANING, not by id:
 *
 *   1. Each image becomes a document = every app-article title that uses it
 *      (+ its category name). An image used by one article gets a sharp,
 *      specific profile; a category filler used by 100 gets a broad one.
 *   2. Each blog article becomes a query = EN title + primary keyword + TL;DR
 *      (+ its category name).
 *   3. TF-IDF cosine picks the closest image, with a same-category bonus and a
 *      small reuse penalty so a handful of strong photos don't carry the whole
 *      site.
 *
 * Output is committed (data/article-images.json) rather than computed at
 * request time: the mapping must be stable across builds (an article's artwork
 * changing on every deploy would churn og:image and confuse social caches), and
 * it stays reviewable in a diff.
 *
 * INV-006 — data/articles/*.json are NOT touched; the mapping lives beside them.
 *
 * Usage: npx tsx scripts/build-article-images.ts [--report]
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, 'data', 'article-image-catalog.csv');
const ARTICLES_DIR = path.join(ROOT, 'data', 'articles');
const OUT_PATH = path.join(ROOT, 'data', 'article-images.json');

/* ------------------------------------------------------------------ */
/* CSV                                                                 */
/* ------------------------------------------------------------------ */

interface CatalogRow {
  article_id: string;
  category: string;
  title: string;
  image_url: string;
}

/** Minimal RFC-4180 parser — titles contain commas inside double quotes. */
function parseCsv(text: string): CatalogRow[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows;
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  return body
    .filter((r) => r.length >= 4 && r[idx.image_url])
    .map((r) => ({
      article_id: r[idx.article_id],
      category: r[idx.category],
      title: r[idx.title],
      image_url: r[idx.image_url],
    }));
}

/* ------------------------------------------------------------------ */
/* Text → tokens                                                       */
/* ------------------------------------------------------------------ */

const STOPWORDS = new Set([
  'the', 'and', 'for', 'you', 'your', 'with', 'that', 'this', 'from', 'what',
  'how', 'why', 'when', 'who', 'are', 'can', 'not', 'but', 'all', 'out', 'get',
  'has', 'have', 'had', 'was', 'were', 'been', 'being', 'its', 'it', 'to', 'of',
  'in', 'on', 'at', 'by', 'as', 'is', 'be', 'or', 'an', 'a', 'do', 'does',
  'did', 'more', 'most', 'less', 'than', 'then', 'them', 'they', 'their',
  'there', 'here', 'about', 'into', 'over', 'under', 'after', 'before',
  'while', 'during', 'without', 'within', 'between', 'each', 'every', 'some',
  'any', 'one', 'two', 'three', 'up', 'down', 'off', 'own', 'same', 'so',
  'too', 'very', 'just', 'now', 'new', 'make', 'makes', 'making', 'made',
  'way', 'ways', 'guide', 'tips', 'tip', 'really', 'actually', 'still',
  'know', 'need', 'want', 'use', 'using', 'used', 'help', 'helps', 'better',
  'best', 'good', 'bad', 'top', 'via', 'per', 'vs', 'if', 'my', 'me', 'we',
]);

/** Crude suffix stripper — enough to collide "training"/"train", "meals"/"meal". */
function stem(w: string): string {
  if (w.length > 5 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

/**
 * Domain concept groups.
 *
 * Pure TF-IDF only matches shared words, and the two corpora describe the same
 * ideas in different vocabulary: a blog article about a "caffeine cutoff time"
 * shares no token with the photo captioned "Smart Coffee Ordering Guide", so
 * the coffee picture never surfaced. Each group below injects a canonical
 * concept token into both sides, letting synonyms score against each other.
 *
 * Keys are stemmed forms (tokens are stemmed before lookup).
 */
const CONCEPT_GROUPS: Record<string, string[]> = {
  cncpt_caffeine: ['caffein', 'coffee', 'espresso', 'latte', 'americano', 'decaf'],
  cncpt_sleep: ['sleep', 'insomnia', 'bedtim', 'nap', 'circadian', 'melatonin', 'drowsi', 'rest'],
  cncpt_glp1: ['glp', 'semaglutid', 'ozempic', 'wegovy', 'tirzepatid', 'mounjaro', 'zepbound', 'injection', 'inject'],
  cncpt_hydration: ['hydrat', 'water', 'drink', 'beverag', 'electrolyt', 'thirst', 'fluid'],
  cncpt_alcohol: ['alcohol', 'drinking', 'beer', 'wine', 'soju', 'hangov', 'liquor'],
  cncpt_protein: ['protein', 'amino', 'leucin', 'whey', 'chicken', 'egg', 'tofu'],
  cncpt_carb: ['carb', 'carbohydr', 'sugar', 'glucos', 'glycem', 'insulin', 'rice', 'bread', 'starch'],
  cncpt_fat: ['fat', 'lipid', 'cholesterol', 'omega', 'triglycerid'],
  cncpt_fiber: ['fiber', 'fibre', 'vegetabl', 'veggi', 'green', 'salad', 'prebiotic'],
  cncpt_gut: ['gut', 'microbiom', 'probiotic', 'digest', 'bloat', 'intestin', 'bowel', 'stomach'],
  cncpt_cardio: ['cardio', 'run', 'walk', 'jog', 'cycl', 'swim', 'aerobic', 'step', 'treadmill'],
  cncpt_strength: ['strength', 'resistanc', 'weight', 'lift', 'muscl', 'hypertrophi', 'dumbbel', 'squat', 'barbel'],
  cncpt_stretch: ['stretch', 'mobil', 'flexibl', 'yoga', 'pilat', 'foam', 'recoveri'],
  cncpt_metabolism: ['metabol', 'bmr', 'tdee', 'calori', 'burn', 'thermogen'],
  cncpt_weight: ['weight', 'obes', 'bmi', 'scale', 'plateau', 'regain', 'compos'],
  cncpt_stress: ['stress', 'anxieti', 'cortisol', 'burnout', 'overwhelm', 'mental'],
  cncpt_motivation: ['motiv', 'mindset', 'habit', 'streak', 'consist', 'discipline', 'willpow', 'goal'],
  cncpt_tracking: ['track', 'log', 'record', 'monitor', 'wearabl', 'data', 'app', 'measur'],
  cncpt_meal: ['meal', 'breakfast', 'lunch', 'dinner', 'snack', 'portion', 'plate', 'eat'],
  cncpt_fasting: ['fast', 'intermitt', 'window', 'skip'],
  cncpt_supplement: ['supplement', 'vitamin', 'mineral', 'magnesium', 'iron', 'zinc', 'creatin', 'collagen'],
  cncpt_hormone: ['hormon', 'thyroid', 'testosteron', 'estrogen', 'menopaus', 'pcos', 'cycl'],
  cncpt_heart: ['heart', 'cardiovascular', 'blood', 'pressur', 'hypertens', 'cholesterol'],
  cncpt_diabetes: ['diabet', 'prediabet', 'a1c', 'glucos', 'insulin'],
  cncpt_travel: ['travel', 'flight', 'airport', 'hotel', 'vacat', 'trip', 'jetlag'],
  cncpt_work: ['work', 'offic', 'desk', 'commut', 'shift', 'meeting', 'colleagu'],
  cncpt_social: ['social', 'party', 'dinner', 'restaurant', 'holiday', 'friend', 'famili'],
  cncpt_inflammation: ['inflamm', 'immun', 'autoimmun', 'crp', 'arthriti'],
  cncpt_skin: ['skin', 'hair', 'nail', 'acn', 'wrinkl'],
  cncpt_aging: ['ag', 'longev', 'lifespan', 'senior', 'elder', 'older'],
};

/** stemmed word → concept tokens it belongs to (a word can carry several). */
const CONCEPT_INDEX: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const [concept, words] of Object.entries(CONCEPT_GROUPS)) {
    for (const w of words) {
      const key = stem(w);
      const list = m.get(key);
      if (list) list.push(concept);
      else m.set(key, [concept]);
    }
  }
  return m;
})();

function tokenize(text: string): string[] {
  const base = text
    .toLowerCase()
    .split(/[^a-z0-9가-힣]+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
    .map(stem);
  const out = base.slice();
  for (const t of base) {
    const concepts = CONCEPT_INDEX.get(t);
    if (concepts) out.push(...concepts);
  }
  return out;
}

type Vec = Map<string, number>;

function termFreq(tokens: string[]): Vec {
  const v: Vec = new Map();
  for (const t of tokens) v.set(t, (v.get(t) ?? 0) + 1);
  return v;
}

function tfidf(tf: Vec, idf: Map<string, number>): Vec {
  const v: Vec = new Map();
  let norm = 0;
  for (const [t, f] of tf) {
    const w = (1 + Math.log(f)) * (idf.get(t) ?? Math.log(1 + IMAGE_DOC_COUNT));
    v.set(t, w);
    norm += w * w;
  }
  norm = Math.sqrt(norm) || 1;
  for (const [t, w] of v) v.set(t, w / norm);
  return v;
}

function cosine(a: Vec, b: Vec): number {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [t, w] of small) {
    const o = large.get(t);
    if (o) dot += w * o;
  }
  return dot;
}

let IMAGE_DOC_COUNT = 1;

/* ------------------------------------------------------------------ */
/* Category bridging                                                   */
/* ------------------------------------------------------------------ */

/**
 * Adjacency between the blog's 15 categories and the app catalog's 12.
 *
 * Two jobs. It bridges the three blog-only categories (Longevity, Mental
 * Health, Gut Health), which have no catalog counterpart at all. And it gives
 * every category a legal overflow route: the catalog is wildly lopsided —
 * 148 Diet photos but 8 for Health & Conditions, against 110 blog articles —
 * so once a category's own photos are exhausted, articles must borrow from a
 * neighbour rather than reprint the same eight pictures.
 */
const CATEGORY_POOLS: Record<string, string[]> = {
  'Diet & Nutrition': ['Weight & Metabolism', 'Health & Conditions', 'Hydration & Beverages'],
  'Exercise & Activity': ['Weight & Metabolism', 'Lifestyle Habits', 'Situational Tips'],
  'Health & Conditions': ['Medication Guide', 'Diet & Nutrition', 'Lifestyle Habits', 'Tracking & Insights'],
  'Hydration & Beverages': ['Diet & Nutrition', 'Situational Tips'],
  'Lifestyle Habits': ['Situational Tips', 'Mindset & Motivation', 'Sleep & Recovery'],
  'Medication Guide': ['Health & Conditions', 'Tracking & Insights', 'Diet & Nutrition'],
  'Mindset & Motivation': ['Lifestyle Habits', 'Personalized Strategies', 'Situational Tips'],
  'Personalized Strategies': ['Tracking & Insights', 'Mindset & Motivation', 'Weight & Metabolism'],
  'Situational Tips': ['Lifestyle Habits', 'Diet & Nutrition', 'Exercise & Activity'],
  'Sleep & Recovery': ['Lifestyle Habits', 'Mindset & Motivation', 'Health & Conditions'],
  'Tracking & Insights': ['Personalized Strategies', 'Weight & Metabolism', 'Medication Guide'],
  'Weight & Metabolism': ['Diet & Nutrition', 'Exercise & Activity', 'Tracking & Insights'],
  'Longevity & Healthy Aging': ['Health & Conditions', 'Lifestyle Habits', 'Exercise & Activity'],
  'Mental Health & Stress': ['Mindset & Motivation', 'Sleep & Recovery', 'Lifestyle Habits'],
  'Gut Health & Microbiome': ['Diet & Nutrition', 'Health & Conditions'],
};

/** Category-level filler photos shipped in the catalog (IMG_CAT_*). */
const CATEGORY_FALLBACK: Record<string, string> = {
  'Diet & Nutrition': 'IMG_CAT_DIET.jpg',
  'Exercise & Activity': 'IMG_CAT_EX.jpg',
  'Health & Conditions': 'IMG_CAT_HEALTH.jpg',
  'Hydration & Beverages': 'IMG_CAT_HYD.jpg',
  'Lifestyle Habits': 'IMG_CAT_LIFE.jpg',
  'Medication Guide': 'IMG_CAT_MED.jpg',
  'Mindset & Motivation': 'IMG_CAT_MIND.jpg',
  'Personalized Strategies': 'IMG_CAT_PERSONAL.jpg',
  'Situational Tips': 'IMG_CAT_SIT.jpg',
  'Sleep & Recovery': 'IMG_CAT_SLEEP.jpg',
  'Tracking & Insights': 'IMG_CAT_TRACK.jpg',
  'Weight & Metabolism': 'IMG_CAT_WT.jpg',
  'Longevity & Healthy Aging': 'IMG_CAT_HEALTH.jpg',
  'Mental Health & Stress': 'IMG_CAT_MIND.jpg',
  'Gut Health & Microbiome': 'IMG_CAT_DIET.jpg',
};

/** Own-category bonus / adjacent-pool bonus, in cosine points. */
const SAME_CATEGORY_BONUS = 0.22;
const POOL_CATEGORY_BONUS = 0.10;
/**
 * Per-previous-use penalty. The cap must exceed SAME_CATEGORY_BONUS, otherwise
 * a thin category's few photos always outbid a better-matching neighbour and
 * the listing pages turn into the same picture over and over.
 */
const REUSE_PENALTY = 0.03;
const REUSE_PENALTY_CAP = 0.6;

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

interface ImageDoc {
  file: string;
  url: string;
  categories: Set<string>;
  /** Category the image is most used by — drives the same-category bonus. */
  primaryCategory: string;
  vec: Vec;
  sampleTitle: string;
}

function build() {
  const report = process.argv.includes('--report');
  const rows = parseCsv(readFileSync(CSV_PATH, 'utf-8'));

  /* ---- image documents ---- */
  const byUrl = new Map<string, CatalogRow[]>();
  for (const r of rows) {
    const list = byUrl.get(r.image_url);
    if (list) list.push(r);
    else byUrl.set(r.image_url, [r]);
  }
  IMAGE_DOC_COUNT = byUrl.size;

  const rawDocs: Array<{ url: string; rows: CatalogRow[]; tf: Vec }> = [];
  const df = new Map<string, number>();
  for (const [url, group] of byUrl) {
    // Category name is repeated so it counts as a real signal, not a stray term.
    const text = group.map((g) => g.title).join(' ') + ' ' + group[0].category.repeat(1) + ' ' + group[0].category;
    const tf = termFreq(tokenize(text));
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    rawDocs.push({ url, rows: group, tf });
  }

  const idf = new Map<string, number>();
  for (const [t, n] of df) idf.set(t, Math.log((IMAGE_DOC_COUNT + 1) / (n + 0.5)));

  const images: ImageDoc[] = rawDocs.map(({ url, rows: group, tf }) => {
    const counts = new Map<string, number>();
    for (const g of group) counts.set(g.category, (counts.get(g.category) ?? 0) + 1);
    const primaryCategory = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    return {
      file: url.slice(url.lastIndexOf('/') + 1),
      url,
      categories: new Set(group.map((g) => g.category)),
      primaryCategory,
      vec: tfidf(tf, idf),
      sampleTitle: group[0].title,
    };
  });
  const byFile = new Map(images.map((i) => [i.file, i]));

  /* ---- blog articles ---- */
  const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.json')).sort();
  const uses = new Map<string, number>();
  const map: Record<string, string> = {};
  const audit: Array<{ slug: string; category: string; title: string; file: string; score: number; from: string }> = [];

  for (const f of files) {
    let parsed: any;
    try {
      parsed = JSON.parse(readFileSync(path.join(ARTICLES_DIR, f), 'utf-8'));
    } catch {
      continue;
    }
    const slug: string = parsed.slug;
    const category: string = parsed.category;
    if (!slug) continue;

    const en = parsed.langs?.en ?? Object.values(parsed.langs ?? {})[0];
    const query = [
      en?.title ?? '',
      parsed.primary_keyword_en ?? '',
      (en?.tldr ?? '').slice(0, 240),
      category,
      category,
    ].join(' ');
    const qVec = tfidf(termFreq(tokenize(query)), idf);

    const pool = CATEGORY_POOLS[category] ?? [category];
    const poolSet = new Set(pool);

    let bestFile = '';
    let bestScore = -Infinity;
    let bestRaw = 0;
    for (const img of images) {
      let score = cosine(qVec, img.vec);
      const raw = score;
      if (img.primaryCategory === category) score += SAME_CATEGORY_BONUS;
      else if (poolSet.has(img.primaryCategory)) score += POOL_CATEGORY_BONUS;
      score -= Math.min(REUSE_PENALTY_CAP, REUSE_PENALTY * (uses.get(img.file) ?? 0));
      if (score > bestScore) {
        bestScore = score;
        bestFile = img.file;
        bestRaw = raw;
      }
    }

    if (!bestFile) bestFile = CATEGORY_FALLBACK[category] ?? 'IMG_CAT_LIFE.jpg';
    uses.set(bestFile, (uses.get(bestFile) ?? 0) + 1);
    map[slug] = bestFile;
    audit.push({
      slug,
      category,
      title: en?.title ?? '',
      file: bestFile,
      score: Number(bestRaw.toFixed(3)),
      from: byFile.get(bestFile)?.sampleTitle ?? '',
    });
  }

  const sortedMap = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        _generator: 'scripts/build-article-images.ts',
        _source: 'data/article-image-catalog.csv (HAVIT app article library, 289 distinct photos)',
        _note: 'slug → S3 filename. Base URL is resolved in lib/article-images.ts by filename prefix.',
        count: Object.keys(sortedMap).length,
        map: sortedMap,
      },
      null,
      2,
    ) + '\n',
    'utf-8',
  );

  /* ---- report ---- */
  const distinct = new Set(Object.values(sortedMap)).size;
  const top = [...uses.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  console.log(`mapped ${Object.keys(sortedMap).length} articles → ${distinct} distinct images (of ${images.length} available)`);
  console.log(`heaviest reuse: ${top.map(([f, n]) => `${f}×${n}`).join(', ')}`);
  const weak = audit.filter((a) => a.score < 0.05).length;
  console.log(`weak matches (cosine < 0.05, carried by category bonus): ${weak}`);

  if (report) {
    const byCat = new Map<string, typeof audit>();
    for (const a of audit) {
      const l = byCat.get(a.category) ?? [];
      l.push(a);
      byCat.set(a.category, l);
    }
    for (const [cat, list] of [...byCat.entries()].sort()) {
      const d = new Set(list.map((l) => l.file)).size;
      console.log(`\n### ${cat} — ${list.length} articles / ${d} distinct images`);
      for (const a of list.slice(0, 5)) {
        console.log(`  ${a.score.toFixed(3)}  ${a.file}`);
        console.log(`      blog: ${a.title.slice(0, 88)}`);
        console.log(`      img : ${a.from.slice(0, 88)}`);
      }
    }
  }
}

build();
