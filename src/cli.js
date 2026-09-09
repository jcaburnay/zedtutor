import { availableChapters, CHAPTERS, resolveChapter } from './chapters.js';

export function parseArgs(args) {
  if (args.length === 0) {
    return { action: 'open', chapter: CHAPTERS[1] };
  }

  const [argument] = args;

  if (argument === '--help' || argument === '-h') {
    if (args.length > 1) {
      throw new Error(`Unexpected argument: ${args[1]}`);
    }

    return { action: 'help' };
  }

  if (argument === '--version' || argument === '-v') {
    if (args.length > 1) {
      throw new Error(`Unexpected argument: ${args[1]}`);
    }

    return { action: 'version' };
  }

  if (argument !== '--chapter' && argument !== '-c') {
    throw new Error(`Unexpected argument: ${argument}`);
  }

  if (args.length === 1) {
    throw new Error(`Missing value for ${argument}.`);
  }

  if (args.length > 2) {
    throw new Error(`Unexpected argument: ${args[2]}`);
  }

  return { action: 'open', chapter: resolveChapter(args[1]) };
}

export function formatAvailableChapters() {
  return availableChapters()
    .map((chapter) => `  ${chapter.number}  ${chapter.title}`)
    .join('\n');
}

export function formatHelp(version) {
  return `zedtutor ${version}

Usage:
  zedtutor
  zedtutor --chapter <number>
  zedtutor -c <number>
  zedtutor --help
  zedtutor --version

Chapters:
  1  Fundamentals
  2  Advanced
  3  Zed Vim

Running zedtutor without a chapter opens Chapter 1.`;
}
