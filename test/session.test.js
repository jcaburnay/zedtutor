import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import test from 'node:test';
import { createSession } from '../src/session.js';

async function createFixture(t, filename, contents) {
  const root = await mkdtemp(join(tmpdir(), 'zedtutor-test-'));
  const templatePath = join(root, filename);

  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(templatePath, contents, 'utf8');

  return { root, templatePath };
}

test('createSession copies the tutor into a unique temporary directory', async (t) => {
  const { root, templatePath } = await createFixture(
    t,
    'chapter01-fundamentals.txt',
    'practice me\n',
  );
  const session = await createSession({ templatePath, sessionRoot: join(root, 'sessions') });

  assert.equal(basename(session.path), 'chapter01-fundamentals.txt');
  assert.match(basename(dirname(session.path)), /^zedtutor-/);
  assert.equal(await readFile(session.path, 'utf8'), 'practice me\n');
});

test('createSession keeps simultaneous sessions independent', async (t) => {
  const { root, templatePath } = await createFixture(t, 'template.txt', 'original\n');
  const sessionRoot = join(root, 'sessions');
  const first = await createSession({ templatePath, sessionRoot });
  const second = await createSession({ templatePath, sessionRoot });

  await writeFile(first.path, 'edited\n', 'utf8');

  assert.notEqual(first.path, second.path);
  assert.equal(await readFile(second.path, 'utf8'), 'original\n');
});

for (const filename of ['chapter02-advanced.txt', 'chapter03-zed-vim.txt']) {
  test(`createSession preserves the ${filename} filename`, async (t) => {
    const { root, templatePath } = await createFixture(t, filename, 'practice\n');
    const session = await createSession({ templatePath, sessionRoot: join(root, 'sessions') });

    assert.equal(basename(session.path), filename);
  });
}

test('session cleanup removes its temporary directory', async (t) => {
  const { root, templatePath } = await createFixture(t, 'chapter01-fundamentals.txt', 'test\n');
  const session = await createSession({ templatePath, sessionRoot: join(root, 'sessions') });
  const sessionDir = dirname(session.path);

  await session.cleanup();

  await assert.rejects(access(sessionDir), (error) => error.code === 'ENOENT');
  await session.cleanup();
});
