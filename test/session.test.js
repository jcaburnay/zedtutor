import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createSession } from '../src/session.js';

test('createSession copies the tutor template into a writable session file', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, 'template.txt');
  const sessionDir = join(root, 'session');

  await writeFile(templatePath, 'practice me\n', 'utf8');

  const sessionPath = await createSession({ templatePath, sessionDir });
  const contents = await readFile(sessionPath, 'utf8');

  assert.equal(sessionPath, join(sessionDir, 'tutor.txt'));
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
