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

const sendRequest = (
  sourceBufnr: number,
  source: string,
  target: string
): boolean => {
  const client = getClient(sourceBufnr);
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
  const sourceBufnr = vim.fn.bufadd(source);
  vim.fn.bufload(sourceBufnr);

  if (util.path.exists(target) && !opts?.force) {
    const status = vim.fn.confirm("File exists! Overwrite?", "&Yes\n&No");
    if (status !== 1) {
      return;
    }
  }

  const requestOk = sendRequest(sourceBufnr, source, target);
  if (!requestOk) {
    print("failed to rename file: tsserver request failed");
    return;
  }

  if (vim.api.nvim_buf_get_option<boolean>(sourceBufnr, "modified")) {
    vim.api.nvim_buf_call(sourceBufnr, () => vim.cmd("w!"));
  }
  const [didRename, renameError] = vim.loop.fs_rename(source, target);
  if (!didRename) {
    throw new Error(
      `failed to move ${source} to ${target}: ${renameError as string}`
    );
  }

  const targetBufnr = vim.fn.bufadd(target);
  for (const win of vim.api.nvim_list_wins()) {
    if (vim.api.nvim_win_get_buf(win) === sourceBufnr) {
      vim.api.nvim_win_set_buf(win, targetBufnr);
    }
  }
  vim.schedule(() => vim.api.nvim_buf_delete(sourceBufnr, { force: true }));
};
