# zedtutor

`zedtutor` is a small, hands-on Vim tutorial meant to be completed inside [Zed](https://zed.dev/).

It follows the spirit of `vimtutor`: the tutorial itself is an editable text file. Instead of reading about motions and commands, you practice them directly in the editor.

## Status

Early v0.1 MVP.

The first version focuses on:

- cursor movement
- entering and leaving Insert mode
- deleting and undoing
- operators and motions
- counts
- yank and put
- search
- Visual mode
- a small Zed-specific section

## Requirements

- Node.js 20+
- Zed with Vim mode enabled
- the `zed` CLI installed

On macOS, install the Zed CLI from Zed's command palette:

```text
cli: install cli binary
```

## Run locally

```bash
git clone https://github.com/jcaburnay/zedtutor.git
cd zedtutor
npm link
zedtutor
```

You can also run it without linking:

```bash
node ./bin/zedtutor.js
```

Every run copies the pristine tutorial to a temporary session file and opens that copy in the currently focused Zed workspace. Your edits therefore do not modify the source tutorial.

## Development

```bash
npm test
```

## Roadmap

Potential follow-ups after the MVP:

- split the tutor into selectable lessons
- `zedtutor next`
- progress tracking
- Zed-specific navigation lessons
- text objects, surround, comments, exchange, and multi-cursor exercises
- install through npm/Homebrew

## License

MIT
