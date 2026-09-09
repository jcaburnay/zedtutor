import { spawn, spawnSync } from 'node:child_process';

const CANDIDATES = process.platform === 'win32' ? ['zed.exe', 'zed'] : ['zed', 'zeditor'];

export function findZedCommand(candidates = CANDIDATES, spawnSyncImpl = spawnSync) {
  for (const command of candidates) {
    const result = spawnSyncImpl(command, ['--version'], {
      stdio: 'ignore',
      shell: false,
    });

    if (!result.error && result.status === 0) {
      return command;
    }
  }

  return null;
}

export function openInZed(command, filePath, spawnImpl = spawn) {
  const child = spawnImpl(command, ['-n', '--wait', filePath], {
    stdio: 'ignore',
  });

  return new Promise((resolve, reject) => {
    child.once('error', reject);
    // Closing a disposable tutor without saving may produce a non-zero status.
    child.once('close', () => resolve());
  });
}
