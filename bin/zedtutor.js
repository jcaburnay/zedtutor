#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createSession } from '../src/session.js';
import { findZedCommand, openInZed } from '../src/zed.js';

const VERSION = '0.1.0';
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = join(__dirname, '..', 'tutor', 'tutor.txt');

function printHelp() {
  console.log(`zedtutor ${VERSION}\n\nUsage:\n  zedtutor\n  zedtutor --help\n  zedtutor --version\n\nOpens a fresh Vim practice session in the currently focused Zed workspace.\n`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(VERSION);
    return;
  }

  if (args.length > 0) {
    console.error(`Unknown argument: ${args[0]}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const zed = findZedCommand();

  if (!zed) {
    console.error('Could not find the Zed CLI.');
    console.error('In Zed, open the command palette and run: cli: install cli binary');
    process.exitCode = 1;
    return;
  }

  const sessionPath = await createSession({ templatePath });
  openInZed(zed, sessionPath);

  console.log('Opening a fresh Zed Vim Tutor session...');
  console.log(sessionPath);
}

main().catch((error) => {
  console.error('zedtutor failed:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
