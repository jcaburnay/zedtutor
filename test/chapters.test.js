import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { availableChapters, CHAPTERS, resolveChapter } from '../src/chapters.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tutorDir = join(__dirname, '..', 'tutor');

test('chapter registry identifies all available chapters', () => {
  assert.deepEqual(CHAPTERS[1], {
    number: 1,
    title: 'Fundamentals',
    file: 'chapter01-fundamentals.txt',
    available: true,
  });
  assert.deepEqual(CHAPTERS[2], {
    number: 2,
    title: 'Advanced',
    file: 'chapter02-advanced.txt',
    available: true,
  });
  assert.deepEqual(CHAPTERS[3], {
    number: 3,
    title: 'Zed Vim',
    file: 'chapter03-zed-vim.txt',
    available: true,
  });
});

test('resolveChapter treats zero-padded chapter numbers as numbers', () => {
  assert.equal(resolveChapter('1'), CHAPTERS[1]);
  assert.equal(resolveChapter('01'), CHAPTERS[1]);
  assert.equal(resolveChapter('2'), CHAPTERS[2]);
  assert.equal(resolveChapter('02'), CHAPTERS[2]);
  assert.equal(resolveChapter('3'), CHAPTERS[3]);
});

test('resolveChapter rejects an unknown chapter', () => {
  assert.throws(() => resolveChapter('9'), /Unknown chapter: 9/);
});

test('availableChapters includes every chapter', () => {
  assert.deepEqual(
    availableChapters().map((chapter) => chapter.number),
    [1, 2, 3],
  );
});

test('every available chapter template exists', async () => {
  await Promise.all(availableChapters().map((chapter) => access(join(tutorDir, chapter.file))));
});
