import { util } from "lspconfig";
import { Methods } from "./types/methods";
import { getClient } from "./utils";

interface ExecuteCommandParams {
  command: string;
  arguments: unknown[];
}

interface Opts {
  force?: boolean;
}

const sendRequest = (source: string, target: string): void => {
  const client = getClient();
  if (!client) {
    console.warn("failed to rename file: tsserver not running");
    return;
  }

  const requestOk = client.request<void, ExecuteCommandParams>(
    Methods.EXECUTE_COMMAND,
    {
      command: "_typescript.applyRenameFile",
      arguments: [
        {
          sourceUri: vim.uri_from_fname(source),
          targetUri: vim.uri_from_fname(target),
        },
      ],
    }
  );
  if (!requestOk) {
    console.warn("failed to rename file: tsserver request failed");
  }
};

export const renameFile = (target?: string, opts?: Opts): void => {
  const bufnr = vim.api.nvim_get_current_buf();
  const source = vim.api.nvim_buf_get_name(bufnr);

  if (!target) {
    try {
      vim.ui.input({ prompt: "New path: ", default: source }, (input) => {
        if (!input || input === source) {
          throw new Error();
        }
        target = input;
      });
    } catch (_) {
      return;
    }
  }

  target = target as string;
  if (util.path.exists(target) && !opts?.force) {
    const status = vim.fn.confirm("File exists! Overwrite?", "&Yes\n&No");
    if (status !== 1) {
      return;
    }
  }

  sendRequest(source, target);
  if (vim.api.nvim_buf_get_option<boolean>(bufnr, "modified")) {
    vim.cmd("silent! noautocmd w");
  }
  const [didRename, renameError] = vim.loop.fs_rename(source, target);
  if (!didRename) {
    console.error(
      `failed to move ${source} to ${target}: ${renameError as string}`
    );
  }

  vim.cmd(`edit ${target}`);
  vim.cmd(`${bufnr}bdelete`);
};
