declare namespace NvimLsp {
  interface BaseParams {
    textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
  }
  interface RangeParams extends BaseParams {
    range: import("vscode-languageserver-types").Range;
  }

  interface Client {
    name: string;
    resolved_capabilities: {
      document_formatting: boolean;
      document_range_formatting: boolean;
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
  interface ServerOptions {
    on_attach?: (this: void, client: Client, bufnr: number) => void;
    on_init?: (this: void, client: Client, initialize_result: unknown) => void;
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
}
