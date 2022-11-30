declare namespace NvimLsp {
  interface BaseParams {
    textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
  }
  interface RangeParams extends BaseParams {
    range: import("vscode-languageserver-types").Range;
  }

  interface HandlerContext {
    bufnr: number;
    client_id: number;
    method: string;
    params: Record<string, unknown>;
  }

  type Handler<T = unknown> = (
    err: unknown,
    res: T[] | undefined,
    ctx: HandlerContext,
    config: Record<string, unknown>
  ) => void;
  type Handlers = {
    [method: string]: Handler;
  };

  /** @noSelf **/
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
      method: import("./methods").Methods,
      params: U,
      handler?: Handler<T>,
      bufnr?: number
    ) => boolean;
    request_sync: <T, U = Record<string, unknown>>(
      method: import("./methods").Methods,
      params: U,
      timeout_ms?: number,
      bufnr?: number
    ) => { result: T[] };
    handlers: Handlers;
  }

  /** @noSelf **/
  interface ServerOptions {
    on_attach?: (client: Client, bufnr: number) => void;
    on_init?: (client: Client, initialize_result: unknown) => void;
    handlers?: Handlers;
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

/** @noSelf **/
declare namespace vim {
  const inspect: (...args: unknown[]) => void;
  const schedule: (callback: () => void) => void;
  const tbl_isempty: (tbl: unknown[]) => boolean;
  const tbl_deep_extend: <T>(
    behavior: "error" | "keep" | "force",
    ...tables: T[]
  ) => T;

  namespace lsp {
    const handlers: NvimLsp.Handlers;
    const get_active_clients: (filter: {
      id?: number;
      bufnr?: number;
      name?: number;
    }) => LuaTable<number, NvimLsp.Client>;
    namespace util {
      const make_range_params: () => {
        textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
        range: import("vscode-languageserver-types").Range;
        context?: import("vscode-languageserver-types").CodeActionContext;
      };
      const make_position_params: (
        winnr: number,
        offset_encoding: string
      ) => {
        textDocument: import("vscode-languageserver-types").TextDocumentIdentifier;
        position: import("vscode-languageserver-types").Position;
      };
      const apply_text_edits: (
        edits: import("vscode-languageserver-types").TextEdit[],
        bufnr: number,
        offset_encoding: string
      ) => void;
    }
    namespace buf {
      const rename: (
        newName?: string,
        options?: Record<string, unknown>
      ) => void;
    }
    /** @deprecated */
    const buf_get_clients: (bufnr: number) => LuaTable<number, NvimLsp.Client>;
  }

  namespace diagnostic {
    const get: (
      bufnr?: number
    ) => import("vscode-languageserver-types").Diagnostic[];
  }

  namespace api {
    const nvim_get_current_buf: () => number;
    const nvim_get_current_win: () => number;
    const nvim_buf_call: (bufnr: number, callback: () => void) => void;
    const nvim_buf_get_lines: (
      bufnr: number,
      start: number,
      end: number,
      strictIndexing: boolean
    ) => string[];
    const nvim_buf_get_name: (bufnr: number) => string;
    const nvim_buf_create_user_command: (
      bufnr: number,
      name: string,
      command: (opts: Nvim.CommandOptions) => void,
      attributes: Nvim.CommandAttributes
    ) => void;
    const nvim_buf_get_option: <T>(bufnr: number, name: string) => T;
    const nvim_buf_delete: (bufnr: number, opts?: { force?: boolean }) => void;
    const nvim_list_wins: () => number[];
    const nvim_win_get_buf: (win: number) => number;
    const nvim_win_set_buf: (win: number, bufnr: number) => void;
    const nvim_win_set_cursor: (
      win: number,
      pos: [row: number, col: number]
    ) => void;
    const nvim_buf_set_option: (
      buffer: number,
      name: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any
    ) => void;
  }

  namespace ui {
    const input: (
      opts: { prompt?: string; default?: string },
      on_confirm: (input?: string) => void
    ) => void;
  }

  namespace fn {
    const confirm: (message: string, choices: string) => 0 | 1;
    const bufadd: (bufname: string) => number;
    const bufload: (bufnr: number) => void;
    const has: (feature: string) => 0 | 1;
    const mkdir: (name: string, path?: string, prot?: number) => void;
    const fnamemodify: (fname: string, mods: string) => string;
  }

  namespace loop {
    const fs_rename: (
      source: string,
      target: string
    ) => LuaMultiReturn<[boolean, string | undefined]>;
  }

  const cmd: (command: string) => void;
  const str_byteindex: (
    str: string,
    index: number,
    useUtf16?: boolean
  ) => number;
  const uri_from_fname: (fname: string) => string;
}
