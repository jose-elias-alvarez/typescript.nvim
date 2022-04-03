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

const sendRequest = (source: string, target: string): boolean => {
  const client = getClient();
  if (!client) {
    return false;
  }

  return client.request<void, ExecuteCommandParams>(Methods.EXECUTE_COMMAND, {
    command: "_typescript.applyRenameFile",
    arguments: [
      {
        sourceUri: vim.uri_from_fname(source),
        targetUri: vim.uri_from_fname(target),
      },
    ],
  });
};

export const renameFile = (
  source: string,
  target: string,
  opts?: Opts
): void => {
  const source_bufnr = vim.fn.bufadd(source);
  vim.fn.bufload(source_bufnr);

  if (util.path.exists(target) && !opts?.force) {
    const status = vim.fn.confirm("File exists! Overwrite?", "&Yes\n&No");
    if (status !== 1) {
      return;
    }
  }

  const requestOk = sendRequest(source, target);
  if (!requestOk) {
    console.warn("failed to rename file: tsserver request failed");
    return;
  }

  if (vim.api.nvim_buf_get_option<boolean>(source_bufnr, "modified")) {
    vim.api.nvim_buf_call(source_bufnr, () => vim.cmd("w!"));
  }
  const [didRename, renameError] = vim.loop.fs_rename(source, target);
  if (!didRename) {
    console.error(
      `failed to move ${source} to ${target}: ${renameError as string}`
    );
    return;
  }

  const target_bufnr = vim.fn.bufadd(target);
  for (const win of vim.api.nvim_list_wins()) {
    if (vim.api.nvim_win_get_buf(win) === source_bufnr) {
      vim.api.nvim_win_set_buf(win, target_bufnr);
    }
  }
  vim.schedule(() => vim.api.nvim_buf_delete(source_bufnr, { force: true }));
};
