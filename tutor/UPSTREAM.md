# Upstream tutor

The zedtutor Chapter 1 lesson content is derived from the Vim Tutor distributed
with Vim.

## Source

- Project: Vim
- Source file: `runtime/tutor/tutor1`
- Upstream revision: `b87f133b0724f7328e7dd41dd611af67f4ae3e39`

The original tutor has been adapted into zedtutor's fundamentals chapter for use
with Zed's Vim mode.

Changes include:

- replacing Vim-specific startup and shutdown instructions
- removing or adapting commands unsupported by Zed
- adapting file and command-palette behavior
- organizing the transferable fundamentals as Chapter 1

The derived tutor content is distributed under the Vim License.

See `../LICENSES/VIM-LICENSE.txt`.

Chapter 3 (`chapter03-zed-vim.txt`) contains original Zed-specific content and
is licensed under the MIT License, along with the zedtutor CLI, tests, and other
original project source code.

## Modifications

The changes made to the upstream Vim Tutor are included in:

`VIMTUTOR-CHANGES.patch`

The patch compares the upstream source revision listed above with the adapted
`chapter01-fundamentals.txt` distributed by zedtutor.
