import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import test from 'node:test';

const execFileAsync = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'bin', 'zedtutor.js');

test('zedtutor --version prints the version', async () => {
  const { stdout, stderr } = await execFileAsync(process.execPath, [cliPath, '--version']);

  assert.match(stdout.trim(), /^\d+\.\d+\.\d+$/);
  assert.equal(stderr, '');
});

test('zedtutor -v prints the version', async () => {
  const { stdout, stderr } = await execFileAsync(process.execPath, [cliPath, '-v']);

  assert.match(stdout.trim(), /^\d+\.\d+\.\d+$/);
  assert.equal(stderr, '');
});

test('zedtutor --help prints usage information', async () => {
  const { stdout, stderr } = await execFileAsync(process.execPath, [cliPath, '--help']);

  assert.match(stdout, /Usage:/);
  assert.match(stdout, /zedtutor --help/);
  assert.match(stdout, /dedicated Zed window/);
  assert.equal(stderr, '');
});

test('zedtutor rejects unknown arguments', async () => {
  await assert.rejects(execFileAsync(process.execPath, [cliPath, '--unknown']), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Unknown argument: --unknown/);
    assert.match(error.stdout, /Usage:/);

    return true;
  });
});
