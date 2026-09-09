# zedtutor

`zedtutor` is a small, hands-on Vim tutorial designed to be practiced directly inside [Zed](https://zed.dev/).

Chapters 1 and 2 are adapted from the official Vim Tutor, while Chapter 3
covers Zed-specific Vim integrations. Instead of only reading about motions
and commands, you practice them directly inside Zed.

Running:

```bash
zedtutor
```

creates a fresh tutorial session and opens it in a dedicated Zed window.

## Chapters

- Chapter 1: Fundamentals
- Chapter 2: Advanced
- Chapter 3: Zed Vim

Running `zedtutor` without an option opens Chapter 1. You can select an
available chapter explicitly:

```bash
zedtutor --chapter 1
zedtutor -c 1
zedtutor --chapter 2
zedtutor --chapter 3
```

Chapter numbers may be zero-padded, so `--chapter 01` also opens Chapter 1.

## Status

Early v0.1 MVP.

The available chapters cover:

- cursor movement
- entering and leaving Insert mode
- deleting and undoing
- operators and motions
- counts
- yank and put
- search
- Visual mode
- text objects
- named, numbered, clipboard, and black-hole registers
- marks and mark-based operations
- Zed's command palette and supported Ex-style aliases
- panes, buffers, the project panel, and the terminal
- Zed Vim options, surround, commenting, Tree-sitter, LSP, and diagnostics

## Requirements

- Node.js 20+
- pnpm
- Zed with Vim mode enabled
- the `zed` CLI installed

On macOS, install the Zed CLI from Zed's command palette:

```text
cli: install cli binary
```

## Local setup

Clone the repository:

```bash
git clone https://github.com/jcaburnay/zedtutor.git
cd zedtutor
```

Install dependencies:

```bash
pnpm install
```

Register the local CLI globally:

```bash
pnpm add -g .
```

Then run:

```bash
zedtutor
```

If pnpm reports that its global bin directory is not in your `PATH`, run:

```bash
pnpm setup
```

Then reload your shell configuration.

For Zsh:

```bash
source ~/.zshrc
```

## How it works

`zedtutor` keeps the source tutorial untouched.

Each time you run a chapter, for example:

```bash
zedtutor --chapter 3
```

it:

1. resolves the number through the explicit chapter registry
2. creates a unique temporary directory and copies the selected pristine
   tutorial into it with the same chapter filename
3. opens that session in a new Zed window and waits for it to close
4. lets you freely edit the tutorial while practicing Vim commands
5. removes the temporary session directory after the tutorial closes

The basic flow is:

```text
zedtutor --chapter 3
    │
    ▼
resolve Chapter 3
    │
    ▼
copy tutor/chapter03-zed-vim.txt
    │
    ▼
temporary chapter03-zed-vim.txt session
    │
    ▼
zed -n --wait <session>
    │
    ▼
dedicated Zed window
```

The `zedtutor` process remains active in the terminal while the tutorial is
open. This lets it remove the temporary session safely after you close the file.

Because each tutorial runs from a unique temporary copy, chapters can be open at the
same time without sharing edits. Restarting a chapter always gives you a fresh
session, and closing it removes its temporary files.

## Development

Install dependencies:

```bash
pnpm install
```

### Run tests

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

Automatically fix supported lint issues:

```bash
pnpm lint:fix
```

### Format

```bash
pnpm format
```

Check formatting without changing files:

```bash
pnpm format:check
```

### Validate

Run the full local quality check:

```bash
pnpm validate
```

This checks:

```text
ESLint
  ↓
Prettier
  ↓
Tests
```

Run `pnpm validate` before pushing changes.

## Project structure

```text
zedtutor/
├── .github/
│   └── workflows/
│       └── ci.yml
├── bin/
│   └── zedtutor.js
├── LICENSES/
│   └── VIM-LICENSE.txt
├── src/
│   ├── chapters.js
│   ├── cli.js
│   ├── session.js
│   └── zed.js
├── test/
│   ├── args.test.js
│   ├── chapters.test.js
│   ├── cli.test.js
│   ├── session.test.js
│   └── zed.test.js
├── tutor/
│   ├── chapter01-fundamentals.txt
│   ├── chapter02-advanced.txt
│   ├── chapter03-zed-vim.txt
│   ├── UPSTREAM.md
│   ├── VIMTUTOR-CHANGES.patch
│   └── VIMTUTOR-CHAPTER02-CHANGES.patch
├── .editorconfig
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── eslint.config.js
├── LICENSE
├── LICENSES.md
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### `bin/`

Contains the `zedtutor` CLI entry point.

### `src/`

Contains the chapter registry, argument parsing, session creation, and Zed
launching logic.

### `tutor/`

Contains the pristine chapter tutorials plus the Vim Tutor provenance record and
generated patches for the two upstream-derived chapters.

### `test/`

Contains automated tests using Node's built-in test runner.

## CI

GitHub Actions validates changes on pushes and pull requests to `main`.

The workflow checks:

- linting
- formatting
- tests
- package contents
- compatibility with supported Node.js versions

## Roadmap

Potential follow-ups include:

- selectable lessons
- `zedtutor next`
- progress tracking
- exchange
- multi-cursor exercises
- npm distribution
- Homebrew installation

## License

The original zedtutor CLI, tests, configuration, and project documentation are
licensed under the MIT License.

Chapters 1 and 2 in `tutor/chapter01-fundamentals.txt` and
`tutor/chapter02-advanced.txt` are derived from Vim's official `vimtutor` and
are distributed under the Vim License. Chapter 3 is original zedtutor content
and is licensed under the MIT License.

See:

- `LICENSE`
- `LICENSES.md`
- `LICENSES/VIM-LICENSE.txt`
- `tutor/UPSTREAM.md`
