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
  assert.match(stdout, /zedtutor --chapter <number>/);
  assert.match(stdout, /1 {2}Fundamentals/);
  assert.match(stdout, /2 {2}Advanced/);
  assert.doesNotMatch(stdout, /coming soon/);
  assert.match(stdout, /3 {2}Zed Vim/);
  assert.match(stdout, /zedtutor --help/);
  assert.equal(stderr, '');
});

test('zedtutor rejects unknown arguments', async () => {
  await assert.rejects(execFileAsync(process.execPath, [cliPath, '--unknown']), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Unexpected argument: --unknown/);

    return true;
  });
});

test('zedtutor reports available chapters for an unknown chapter', async () => {
  await assert.rejects(execFileAsync(process.execPath, [cliPath, '--chapter', '9']), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Unknown chapter: 9/);
    assert.match(
      error.stderr,
      /Available chapters:\n {2}1 {2}Fundamentals\n {2}2 {2}Advanced\n {2}3 {2}Zed Vim/,
    );

    return true;
  });
});

test('zedtutor reports a missing chapter value', async () => {
  await assert.rejects(execFileAsync(process.execPath, [cliPath, '-c']), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /Missing value for -c\./);

    return true;
  });
});
