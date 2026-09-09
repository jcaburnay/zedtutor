import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import test from 'node:test';
import { findZedCommand, openInZed } from '../src/zed.js';

test('findZedCommand returns the first available Zed command', () => {
  const calls = [];

  const fakeSpawnSync = (command, args, options) => {
    calls.push({ command, args, options });

    if (command === 'zed') {
      return {
        status: 0,
        error: undefined,
      };
    }

    return {
      status: 1,
      error: undefined,
    };
  };

  const command = findZedCommand(['missing-zed', 'zed', 'zeditor'], fakeSpawnSync);

  assert.equal(command, 'zed');
  assert.deepEqual(
    calls.map((call) => call.command),
    ['missing-zed', 'zed'],
  );
});

test('findZedCommand returns null when no candidate is available', () => {
  const fakeSpawnSync = () => ({
    status: 1,
    error: undefined,
  });

  const command = findZedCommand(['zed', 'zeditor'], fakeSpawnSync);

  assert.equal(command, null);
});

test('findZedCommand skips commands that fail to spawn', () => {
  const fakeSpawnSync = (command) => {
    if (command === 'zed') {
      return {
        status: null,
        error: new Error('ENOENT'),
      };
    }

    return {
      status: 0,
      error: undefined,
    };
  };

  const command = findZedCommand(['zed', 'zeditor'], fakeSpawnSync);

  assert.equal(command, 'zeditor');
});

test('openInZed opens a new Zed window and waits for the session to close', async () => {
  let spawnCall;
  const child = new EventEmitter();

  const fakeSpawn = (command, args, options) => {
    spawnCall = {
      command,
      args,
      options,
    };

    return child;
  };

  const closed = openInZed('zed', '/tmp/zedtutor-abcd/chapter01-fundamentals.txt', fakeSpawn);

  assert.deepEqual(spawnCall, {
    command: 'zed',
    args: ['-n', '--wait', '/tmp/zedtutor-abcd/chapter01-fundamentals.txt'],
    options: {
      stdio: 'ignore',
    },
  });

  child.emit('close', 1);
  await closed;
});

test('openInZed reports launcher errors', async () => {
  const child = new EventEmitter();
  const opened = openInZed('zed', '/tmp/tutorial.txt', () => child);

  child.emit('error', new Error('could not launch Zed'));

  await assert.rejects(opened, /could not launch Zed/);
});
