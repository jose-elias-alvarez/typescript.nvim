# typescript.nvim

A minimal `typescript-language-server` integration plugin to set up the language
server via [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) and add
commands for convenience. Written in TypeScript and transpiled to
Lua using [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua).

This plugin is in **beta status**. It's stable enough for daily use, but
breaking changes are possible.

Requires Neovim 0.7.

## Setup

Install the plugin with your favorite plugin manager, then add
`require("typescript").setup()` to your config. This will set up the plugin and
`typescript-language-server` with default settings.

The following example shows all available options and their defaults:

```lua
require("typescript").setup({
    disable_commands = false, -- prevent the plugin from creating Vim commands
    disable_formatting = false, -- disable tsserver's formatting capabilities
    debug = false, -- enable debug logging for commands
    server = { -- pass options to lspconfig's setup method
        on_attach = ...,
    },
})
```

## Features

The plugin exposes its functionality via Vim commands as well as a Lua API. The
following commands are async by default, but you can make them run synchronously
by adding a `!` to Vim commands or passing `{ sync = true }` to Lua commands.

- Add missing imports: `:TypescriptAddMissingImports` /
  `require("typescript").addMissingImports()`

- Organize imports: `:TypescriptOrganizeImports` /
  `require("typescript").organizeImports()`

- Remove unused variables: `:TypescriptRemoveUnused` /
  `require("typescript").removeUnused()`

- Fix all: `:TypescriptFixAll` / `require("typescript").fixAll()`

  Despite the name, this command fixes a handful of specific issues, most notably
  non-async functions that use `await` and unreachable code.

- Rename file: `:TypescriptRenameFile` /
  `require("typescript").renameFile(source, target)`

  This command is always asynchronous. The Vim command will always operate on
  the current buffer and prompt for a rename target, while the Lua version
  requires specifying the full path to a `source` and `target`.

## Not yet implemented

- Inlay hints

## Will not implement

- Anything not supported by `typescript-language-server` itself

## Contributing

1. Clone the repo and run `npm install`.
2. Change or add TypeScript source files under the `src/` directory.
3. Test your changes locally with `npm run dev`.
4. Build your changes before committing with `npm run build`.

Integration tests are in Lua and depend on
[plenary.nvim](https://github.com/nvim-lua/plenary.nvim). Run `make test` from
the root of the repo.
