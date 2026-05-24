/**
 * Article Generation Queue Manager.
 *
 * 1,200 article × 5 언어 = 6,000 페이지 자동 생성 큐.
 *
 * 운영 흐름:
 *   1. seed 파일 로드 (data/article-seeds.json) — 1,200 article 메타
 *   2. queue-state.json 갱신 (진행 상태)
 *   3. 배치 단위로 generateArticle 호출 (10건 병렬)
 *   4. 결과 → data/articles/{slug}.json 저장
 *   5. git commit + push 트리거 (별도 스크립트)
 */

import { promises as fs } from 'fs';
import path from 'path';
import { generateArticle } from './pipeline';
import type { ArticleSeed, QueueState, QueueItem, GeneratedArticle } from './types';

const SEEDS_PATH = path.resolve(__dirname, '../data/article-seeds.json');
const STATE_PATH = path.resolve(__dirname, '../data/queue-state.json');
const ARTICLES_DIR = path.resolve(__dirname, '../data/articles');
const BATCH_SIZE = 10;
const MAX_ATTEMPTS_PER_ITEM = 3;

async function loadSeeds(): Promise<ArticleSeed[]> {
  try {
    const text = await fs.readFile(SEEDS_PATH, 'utf-8');
    return JSON.parse(text) as ArticleSeed[];
  } catch (error) {
    console.warn(`[queue] seeds not found at ${SEEDS_PATH}. Run discover-topics.ts first.`);
    return [];
  }
}

async function loadState(): Promise<QueueState> {
  try {
    const text = await fs.readFile(STATE_PATH, 'utf-8');
    return JSON.parse(text) as QueueState;
  } catch {
    return {
      total: 0,
      completed: 0,
      in_progress: 0,
      pending: 0,
      failed: 0,
      items: [],
    };
  }
}

async function saveState(state: QueueState): Promise<void> {
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
  await fs.writeFile(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
}

async function saveArticle(article: GeneratedArticle): Promise<void> {
  await fs.mkdir(ARTICLES_DIR, { recursive: true });
  const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
  await fs.writeFile(filePath, JSON.stringify(article, null, 2), 'utf-8');
}

function syncCounts(state: QueueState): void {
  state.total = state.items.length;
  state.completed = state.items.filter((i) => i.status === 'completed').length;
  state.in_progress = state.items.filter((i) => i.status === 'in_progress').length;
  state.pending = state.items.filter((i) => i.status === 'pending').length;
  state.failed = state.items.filter((i) => i.status === 'error').length;
  state.last_run = new Date().toISOString();
}

/**
 * 시드로부터 큐 초기화 (또는 기존 큐 유지)
 */
async function initQueue(): Promise<QueueState> {
  const seeds = await loadSeeds();
  const state = await loadState();

  const existingSlugs = new Set(state.items.map((i) => i.slug));

  for (const seed of seeds) {
    if (!existingSlugs.has(seed.slug)) {
      state.items.push({
        slug: seed.slug,
        seed,
        status: 'pending',
        attempts: 0,
        langs_completed: [],
        updated_at: new Date().toISOString(),
      });
    }
  }

  if (!state.started_at) {
    state.started_at = new Date().toISOString();
  }

  syncCounts(state);
  await saveState(state);
  return state;
}

async function processItem(item: QueueItem): Promise<void> {
  if (!item.seed) {
    item.status = 'error';
    item.last_error = 'No seed';
    return;
  }
  try {
    item.status = 'in_progress';
    item.attempts += 1;
    item.updated_at = new Date().toISOString();

    const generated = await generateArticle(item.seed);
    await saveArticle(generated);

    item.status = 'completed';
    item.langs_completed = Object.keys(generated.langs) as any;
    item.last_error = undefined;
    item.updated_at = new Date().toISOString();

    console.log(`[queue] ✓ ${item.slug} done (${item.langs_completed.length} langs)`);
  } catch (error: any) {
    item.last_error = error?.message ?? String(error);
    if (item.attempts >= MAX_ATTEMPTS_PER_ITEM) {
      item.status = 'error';
      console.error(`[queue] ✗ ${item.slug} FAILED after ${MAX_ATTEMPTS_PER_ITEM} attempts: ${item.last_error}`);
    } else {
      item.status = 'pending'; // 재시도 대기
      console.warn(`[queue] ⚠ ${item.slug} attempt ${item.attempts} failed: ${item.last_error} — will retry`);
    }
    item.updated_at = new Date().toISOString();
  }
}

async function runBatch(items: QueueItem[]): Promise<void> {
  await Promise.all(items.map(processItem));
}

export async function runQueue(options: { maxBatches?: number; batchSize?: number } = {}): Promise<void> {
  const { maxBatches = Infinity, batchSize = BATCH_SIZE } = options;

  let state = await initQueue();
  console.log(`[queue] start — total ${state.total}, pending ${state.pending}, completed ${state.completed}`);

  let batchesRun = 0;
  while (batchesRun < maxBatches) {
    state = await loadState();
    const pending = state.items.filter((i) => i.status === 'pending').slice(0, batchSize);
    if (pending.length === 0) {
      console.log('[queue] no pending items. Done.');
      break;
    }

    console.log(`\n[queue] batch ${batchesRun + 1} — processing ${pending.length} items in parallel...`);
    await runBatch(pending);

    syncCounts(state);
    await saveState(state);

    console.log(`[queue] progress: ${state.completed}/${state.total} (${Math.round((state.completed / state.total) * 100)}%)`);

    batchesRun += 1;
  }

  console.log(`\n[queue] finished. ${state.completed} done, ${state.failed} failed, ${state.pending} pending.`);
}

// CLI entry
if (require.main === module) {
  const arg = process.argv[2];
  const maxBatches = arg ? parseInt(arg, 10) : Infinity;
  runQueue({ maxBatches }).catch((err) => {
    console.error('[queue] fatal:', err);
    process.exit(1);
  });
}
