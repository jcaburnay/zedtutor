import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createSession } from '../src/session.js';

test('createSession copies the tutor template into a writable session file', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, 'chapter01-fundamentals.txt');
  const sessionDir = join(root, 'session');

  await writeFile(templatePath, 'practice me\n', 'utf8');

  const sessionPath = await createSession({ templatePath, sessionDir });
  const contents = await readFile(sessionPath, 'utf8');

  assert.equal(sessionPath, join(sessionDir, 'chapter01-fundamentals.txt'));
  assert.equal(contents, 'practice me\n');
});

test('createSession resets a previous session from the pristine template', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, 'template.txt');
  const sessionDir = join(root, 'session');

  await writeFile(templatePath, 'original\n', 'utf8');
  const sessionPath = await createSession({ templatePath, sessionDir });
  await writeFile(sessionPath, 'edited\n', 'utf8');

  await createSession({ templatePath, sessionDir });
  const contents = await readFile(sessionPath, 'utf8');

  assert.equal(contents, 'original\n');
});

test('createSession preserves the selected chapter filename', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, 'chapter03-zed-vim.txt');
  const sessionDir = join(root, 'session');

  await writeFile(templatePath, 'Zed Vim practice\n', 'utf8');

  const sessionPath = await createSession({ templatePath, sessionDir });

  assert.equal(sessionPath, join(sessionDir, 'chapter03-zed-vim.txt'));
});

test('createSession preserves the Chapter 2 filename', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, 'chapter02-advanced.txt');
  const sessionDir = join(root, 'session');

  await writeFile(templatePath, 'Advanced practice\n', 'utf8');

  const sessionPath = await createSession({ templatePath, sessionDir });

  assert.equal(sessionPath, join(sessionDir, 'chapter02-advanced.txt'));
});
