import assert from 'node:assert/strict';
import test from 'node:test';
import { formatHelp, parseArgs } from '../src/cli.js';
import { CHAPTERS } from '../src/chapters.js';

test('parseArgs defaults to Chapter 1', () => {
  assert.deepEqual(parseArgs([]), { action: 'open', chapter: CHAPTERS[1] });
});

for (const args of [
  ['--chapter', '1'],
  ['--chapter', '01'],
  ['-c', '1'],
  ['-c', '01'],
]) {
  test(`parseArgs resolves ${args.join(' ')} to Chapter 1`, () => {
    assert.deepEqual(parseArgs(args), { action: 'open', chapter: CHAPTERS[1] });
  });
}

for (const args of [
  ['--chapter', '3'],
  ['-c', '3'],
]) {
  test(`parseArgs resolves ${args.join(' ')} to Chapter 3`, () => {
    assert.deepEqual(parseArgs(args), { action: 'open', chapter: CHAPTERS[3] });
  });
}

test('parseArgs rejects unavailable Chapter 2', () => {
  assert.throws(
    () => parseArgs(['--chapter', '2']),
    /Chapter 2 \(Advanced\) is not available yet\./,
  );
});

test('parseArgs rejects an unknown chapter', () => {
  assert.throws(() => parseArgs(['--chapter', '9']), /Unknown chapter: 9/);
});

test('parseArgs rejects missing chapter values', () => {
  assert.throws(() => parseArgs(['--chapter']), /Missing value for --chapter\./);
  assert.throws(() => parseArgs(['-c']), /Missing value for -c\./);
});

test('parseArgs rejects unexpected and extra arguments', () => {
  assert.throws(() => parseArgs(['surprise']), /Unexpected argument: surprise/);
  assert.throws(() => parseArgs(['--chapter', '1', 'surprise']), /Unexpected argument: surprise/);
  assert.throws(() => parseArgs(['--help', 'surprise']), /Unexpected argument: surprise/);
});

test('parseArgs retains help and version aliases', () => {
  assert.deepEqual(parseArgs(['--help']), { action: 'help' });
  assert.deepEqual(parseArgs(['-h']), { action: 'help' });
  assert.deepEqual(parseArgs(['--version']), { action: 'version' });
  assert.deepEqual(parseArgs(['-v']), { action: 'version' });
});

test('formatHelp documents chapters and the Chapter 1 default', () => {
  const help = formatHelp('0.1.0');

  assert.match(help, /zedtutor --chapter <number>/);
  assert.match(help, /1 {2}Fundamentals/);
  assert.match(help, /2 {2}Advanced\s+\(coming soon\)/);
  assert.match(help, /3 {2}Zed Vim/);
  assert.match(help, /without a chapter opens Chapter 1/);
});
