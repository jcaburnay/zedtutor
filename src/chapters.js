export const CHAPTERS = Object.freeze({
  1: Object.freeze({
    number: 1,
    title: 'Fundamentals',
    file: 'chapter01-fundamentals.txt',
    available: true,
  }),
  2: Object.freeze({
    number: 2,
    title: 'Advanced',
    file: 'chapter02-advanced.txt',
    available: true,
  }),
  3: Object.freeze({
    number: 3,
    title: 'Zed Vim',
    file: 'chapter03-zed-vim.txt',
    available: true,
  }),
});

export function resolveChapter(value) {
  const number = /^\d+$/.test(value) ? Number.parseInt(value, 10) : Number.NaN;
  const chapter = CHAPTERS[number];

  if (!chapter) {
    throw new Error(`Unknown chapter: ${value}`);
  }

  if (!chapter.available) {
    throw new Error(`Chapter ${chapter.number} (${chapter.title}) is not available yet.`);
  }

  return chapter;
}

export function availableChapters() {
  return Object.values(CHAPTERS).filter((chapter) => chapter.available);
}
