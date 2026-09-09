#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { formatAvailableChapters, formatHelp, parseArgs } from '../src/cli.js';
import { createSession } from '../src/session.js';
import { findZedCommand, openInZed } from '../src/zed.js';

const VERSION = '0.1.0';
const __dirname = dirname(fileURLToPath(import.meta.url));

function printHelp() {
  console.log(formatHelp(VERSION));
}

async function main() {
  let command;

  try {
    command = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);

    if (error instanceof Error && error.message.startsWith('Unknown chapter:')) {
      console.error(`\nAvailable chapters:\n${formatAvailableChapters()}`);
    }

    process.exitCode = 1;
    return;
  }

  if (command.action === 'help') {
    printHelp();
    return;
  }

  if (command.action === 'version') {
    console.log(VERSION);
    return;
  }

  const zed = findZedCommand();

  if (!zed) {
    console.error('Could not find the Zed CLI.');
    console.error('In Zed, open the command palette and run: cli: install cli binary');
    process.exitCode = 1;
    return;
  }

  const templatePath = join(__dirname, '..', 'tutor', command.chapter.file);
  const sessionPath = await createSession({ templatePath });
  openInZed(zed, sessionPath);

  console.log(
    `Opening Chapter ${command.chapter.number} (${command.chapter.title}) in a fresh Zed Vim Tutor session...`,
  );
  console.log(sessionPath);
}

main().catch((error) => {
  console.error('zedtutor failed:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
