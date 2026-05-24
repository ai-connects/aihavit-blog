/**
 * Auto-commit bot — 새로 생성된 article을 git에 커밋 + push.
 *
 * 사용 흐름:
 *   1. queue.ts 실행 → data/articles/*.json 새로 추가됨
 *   2. auto-commit.ts 실행 → 배치 단위 commit + push origin main
 *   3. Vercel webhook 자동 트리거 → 빌드 → 배포
 */

import { execSync } from 'child_process';
import path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..');
const BATCH_SIZE = 25; // 한 커밋당 25개 article (약 25 × 5 = 125 페이지)

function sh(cmd: string, opts: { quiet?: boolean } = {}): string {
  if (!opts.quiet) console.log(`$ ${cmd}`);
  return execSync(cmd, { cwd: REPO_ROOT, encoding: 'utf-8' }).trim();
}

function safeSh(cmd: string): string | null {
  try {
    return sh(cmd, { quiet: true });
  } catch {
    return null;
  }
}

function getNewArticleFiles(): string[] {
  // git status에서 새로 추가된 data/articles/*.json만
  const status = sh('git status --porcelain data/articles/', { quiet: true });
  return status
    .split('\n')
    .filter(Boolean)
    .filter((line) => line.match(/^\?\?|^A /))
    .map((line) => line.slice(3).trim());
}

function chunked<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

async function main(): Promise<void> {
  const newFiles = getNewArticleFiles();
  if (newFiles.length === 0) {
    console.log('[auto-commit] no new articles to commit.');
    return;
  }

  console.log(`[auto-commit] ${newFiles.length} new article files`);
  const batches = chunked(newFiles, BATCH_SIZE);

  for (let idx = 0; idx < batches.length; idx += 1) {
    const batch = batches[idx];
    console.log(`\n[auto-commit] batch ${idx + 1}/${batches.length}: ${batch.length} files`);

    // git add
    for (const f of batch) sh(`git add "${f}"`, { quiet: true });

    // 커밋 메시지 구성
    const slugs = batch
      .map((f) => path.basename(f, '.json'))
      .slice(0, 5)
      .join(', ');
    const more = batch.length > 5 ? ` +${batch.length - 5} more` : '';
    const msg = `feat(blog): add ${batch.length} new articles\n\n${slugs}${more}\n\nAuto-generated via HAVIT article generation pipeline (8-Phase).`;

    sh(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
  }

  // 푸시
  console.log('\n[auto-commit] pushing to origin main...');
  const pushResult = safeSh('git push origin main');
  if (pushResult === null) {
    console.error('[auto-commit] push failed. Run manually: git push origin main');
    process.exit(1);
  }
  console.log('[auto-commit] ✓ pushed. Vercel will auto-deploy.');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[auto-commit] fatal:', err);
    process.exit(1);
  });
}
