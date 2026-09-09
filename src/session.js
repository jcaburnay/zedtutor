import { copyFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

export async function createSession({ templatePath, sessionRoot = tmpdir() }) {
  await mkdir(sessionRoot, { recursive: true });
  const sessionDir = await mkdtemp(join(sessionRoot, 'zedtutor-'));

  const sessionPath = join(sessionDir, basename(templatePath));

  try {
    await copyFile(templatePath, sessionPath);
  } catch (error) {
    await rm(sessionDir, { recursive: true, force: true });
    throw error;
  }

  return {
    path: sessionPath,
    cleanup: () => rm(sessionDir, { recursive: true, force: true }),
  };
}
