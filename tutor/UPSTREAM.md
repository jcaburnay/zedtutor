# Upstream tutor

The zedtutor Chapter 1 and Chapter 2 lesson content is derived from the Vim Tutor
distributed with Vim.

## Source

- Project: Vim
- Chapter 1 source file: `runtime/tutor/tutor1`
- Chapter 2 source file: `runtime/tutor/tutor2`
- Upstream revision: `b87f133b0724f7328e7dd41dd611af67f4ae3e39`

The original tutor chapters have been adapted into zedtutor's fundamentals and
advanced chapters for use with Zed's Vim mode.

Changes include:

- replacing Vim-specific startup and shutdown instructions
- removing or adapting commands unsupported by Zed
- adapting file and command-palette behavior
- organizing transferable fundamentals as Chapter 1
- adapting text-object, register, clipboard, and marks exercises as Chapter 2
- omitting Vim's expression-register exercise because Zed does not support the
  expression register

The derived tutor content is distributed under the Vim License.

See `../LICENSES/VIM-LICENSE.txt`.

Chapter 3 (`chapter03-zed-vim.txt`) contains original Zed-specific content and
is licensed under the MIT License, along with the zedtutor CLI, tests, and other
original project source code.

## Modifications

The Chapter 1 changes are included in:

`VIMTUTOR-CHANGES.patch`

This patch compares `runtime/tutor/tutor1` from the upstream revision listed
above with the adapted `chapter01-fundamentals.txt` distributed by zedtutor.

The Chapter 2 changes are included in:

`VIMTUTOR-CHAPTER02-CHANGES.patch`

This patch compares `runtime/tutor/tutor2` from the same upstream revision with
the adapted `chapter02-advanced.txt` distributed by zedtutor.
