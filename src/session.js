import { copyFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

export function defaultSessionDir() {
  return join(tmpdir(), 'zedtutor');
}

export async function createSession({ templatePath, sessionDir = defaultSessionDir() }) {
  await mkdir(sessionDir, { recursive: true });

  const sessionPath = join(sessionDir, basename(templatePath));
  await copyFile(templatePath, sessionPath);

  return sessionPath;
}
