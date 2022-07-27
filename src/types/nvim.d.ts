declare namespace NvimLsp {
  interface BaseParams {
    textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
  }
  interface RangeParams extends BaseParams {
    range: import("vscode-languageserver-types").Range;
  }

  interface Client {
    name: string;
    // neovim 0.7
    resolved_capabilities: {
      document_formatting: boolean;
      document_range_formatting: boolean;
    };
    // neovim 0.8
    server_capabilities: {
      documentFormattingProvider: boolean;
      documentRangeFormattingProvider: boolean;
    };
    offset_encoding: string;
    request: <T, U = Record<string, unknown>>(
      this: void,
      method: import("./methods").Methods,
      params: U,
      handler?: (err: unknown, res: T[]) => void,
      bufnr?: number
    ) => boolean;
    request_sync: <T, U = Record<string, unknown>>(
      this: void,
      method: import("./methods").Methods,
      params: U,
      timeout_ms?: number,
      bufnr?: number
    ) => { result: T[] };
  }

  // used in vim.lsp.buf.* callbacks to filter clients
  type ClientFilter = (this: void, client: Client) => boolean;

  type Handler = (
    this: void,
    err: unknown,
    res: unknown,
    params: unknown
  ) => typeof res;

  interface ServerOptions {
    init_options?: Record<string, any>;
    on_attach?: (this: void, client: Client, bufnr: number) => void;
    on_init?: (this: void, client: Client, initialize_result: unknown) => void;
    handlers?: {
      [key in import("./methods").TypescriptMethods]: Handler;
    };
  }
}

declare namespace Nvim {
  interface CommandOptions {
    bang: boolean;
  }
  interface CommandAttributes {
    bang?: boolean;
  }
}

declare namespace vim {
  const inspect: (...args: unknown[]) => void;
  const schedule: (this: void, callback: () => void) => void;
  const lsp: {
    buf_get_clients: (
      this: void,
      bufnr: number
    ) => LuaTable<number, NvimLsp.Client>;
    util: {
      make_range_params: (this: void) => {
        textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
        range: import("vscode-languageserver-types").Range;
        context?: import("vscode-languageserver-types").CodeActionContext;
      };
      apply_text_edits: (
        this: void,
        edits: import("vscode-languageserver-types").TextEdit[],
        bufnr: number,
        offset_encoding: string
      ) => void;
    };
    buf: {
      rename: (
        this: void,
        newName?: string,
        options?: { filter?: NvimLsp.ClientFilter; name?: string }
      ) => void;
    };
  };
  const diagnostic: {
    get: (
      this: void,
      bufnr?: number
    ) => import("vscode-languageserver-types").Diagnostic[];
  };
  const api: {
    nvim_get_current_buf: (this: void) => number;
    nvim_buf_call: (this: void, bufnr: number, callback: () => void) => void;
    nvim_buf_get_lines: (
      this: void,
      bufnr: number,
      start: number,
      end: number,
      strictIndexing: boolean
    ) => string[];
    nvim_buf_get_name: (this: void, bufnr: number) => string;
    nvim_buf_create_user_command: (
      this: void,
      bufnr: number,
      name: string,
      command: (opts: Nvim.CommandOptions) => void,
      attributes: Nvim.CommandAttributes
    ) => void;
    nvim_buf_get_option: <T>(this: void, bufnr: number, name: string) => T;
    nvim_buf_delete: (
      this: void,
      bufnr: number,
      opts?: { force?: boolean }
    ) => void;
    nvim_list_wins: (this: void) => number[];
    nvim_win_get_buf: (this: void, win: number) => number;
    nvim_win_set_buf: (this: void, win: number, bufnr: number) => void;
    nvim_win_set_cursor: (
      this: void,
      win: number,
      pos: [row: number, col: number]
    ) => void;
    nvim_buf_set_option: (
      this: void,
      buffer: number,
      name: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any
    ) => void;
  };
  const ui: {
    input: (
      this: void,
      opts: { prompt?: string; default?: string },
      on_confirm: (this: void, input?: string) => void
    ) => void;
  };
  const fn: {
    confirm: (this: void, message: string, choices: string) => 0 | 1;
    bufadd: (this: void, bufname: string) => number;
    bufload: (this: void, bufnr: number) => void;
    has: (this: void, feature: string) => 0 | 1;
  };
  const cmd: (this: void, command: string) => void;
  const uri_from_fname: (this: void, fname: string) => string;
  const loop: {
    fs_rename: (
      this: void,
      source: string,
      target: string
    ) => LuaMultiReturn<[boolean, string | undefined]>;
  };
  const str_byteindex: (
    this: void,
    str: string,
    index: number,
    useUtf16?: boolean
  ) => number;
}
