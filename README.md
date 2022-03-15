# typescript.nvim

WIP. A minimal `typescript-language-server` integration plugin to set up the
language server via [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)
and add commands for convenience. Oh, and it's written in TypeScript and
transpiled to Lua using
[TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua).

The goal is to work with the language server, not against it (or parallel to
it). If it's not supported upstream, I won't support it here.

Only works on 0.7. Anything may break at any time.

## Features

- Add missing imports (without hacks)
- Organize imports
- Remove unused variables
- Fix all

## To port from [nvim-lsp-ts-utils](https://github.com/jose-elias-alvarez/nvim-lsp-ts-utils)

- Rename file (manual only)
- Inlay hints

I don't plan on porting anything else, since the goal is to work upstream and
only adapt as needed.
