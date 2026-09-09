# zedtutor

`zedtutor` is a small, hands-on Vim tutorial designed to be practiced directly inside [Zed](https://zed.dev/).

It follows the spirit of `vimtutor`: the tutorial itself is an editable text file. Instead of only reading about Vim motions and commands, you practice them directly in the editor.

Running:

```bash
zedtutor
```

creates a fresh tutorial session and opens it in a dedicated Zed window.

## Status

Early v0.1 MVP.

The current tutor covers:

- cursor movement
- entering and leaving Insert mode
- deleting and undoing
- operators and motions
- counts
- yank and put
- search
- Visual mode
- basic Zed-specific Vim usage

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

Each time you run:

```bash
zedtutor
```

it:

1. copies the pristine `tutor/tutor.txt` into a temporary session file
2. opens that session in a new Zed window
3. lets you freely edit the tutorial while practicing Vim commands

The basic flow is:

```text
zedtutor
    │
    ▼
copy tutor/tutor.txt
    │
    ▼
temporary session
    │
    ▼
zed -n <session>
    │
    ▼
dedicated Zed window
```

Because the tutorial runs from a copy, restarting `zedtutor` always gives you a fresh session.

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
├── src/
│   ├── session.js
│   └── zed.js
├── test/
│   └── session.test.js
├── tutor/
│   └── tutor.txt
├── .editorconfig
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── eslint.config.js
├── LICENSE
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### `bin/`

Contains the `zedtutor` CLI entry point.

### `src/`

Contains the session creation and Zed launching logic.

### `tutor/`

Contains the pristine tutorial source.

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
- additional Zed-specific navigation
- text objects
- surround commands
- commenting
- exchange
- multi-cursor exercises
- npm distribution
- Homebrew installation

## License

The original zedtutor CLI, tests, configuration, and project documentation are
licensed under the MIT License.

The tutorial content in `tutor/tutor.txt` is derived from Vim's official
`vimtutor` and is distributed under the Vim License.

See:

- `LICENSE`
- `LICENSES.md`
- `LICENSES/VIM-LICENSE.txt`
- `tutor/UPSTREAM.md`
