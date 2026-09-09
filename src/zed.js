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
    stdio: ['ignore', 'ignore', 'inherit'],
  });

  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code, signal) => {
      if (signal) {
        reject(new Error(`Zed CLI terminated by ${signal}.`));
        return;
      }

      // Closing a disposable tutor without saving produces status 1.
      if (code === 0 || code === 1) {
        resolve();
        return;
      }

      reject(new Error(`Zed CLI exited with status ${code ?? 'unknown'}.`));
    });
  });
}
