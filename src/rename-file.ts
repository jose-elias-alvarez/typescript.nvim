import { executeCommand } from "@ts/execute-command";
import { WorkspaceCommands } from "@ts/types/workspace-commands";
import { debugLog } from "@ts/utils";
import { util } from "lspconfig";

interface Opts {
  force?: boolean;
}

export const renameFile = (
  source: string,
  target: string,
  opts: Opts = {}
): boolean => {
  const sourceBufnr = vim.fn.bufadd(source);
  vim.fn.bufload(sourceBufnr);

  if (
    util.path.exists(target) &&
    (opts.force === undefined || opts.force === false)
  ) {
    const status = vim.fn.confirm("File exists! Overwrite?", "&Yes\n&No");
    if (status !== 1) {
      debugLog("user declined to overrwrite file; aborting");
      return false;
    }
  }

  debugLog(`recursively creating parent dirs for rename (${target})`);
  vim.fn.mkdir(vim.fn.fnamemodify(target, ":p:h"), "p");

  debugLog(`sending request to rename source ${source} to target ${target}`);
  const requestOk = executeCommand(sourceBufnr, {
    command: WorkspaceCommands.APPLY_RENAME_FILE,
    arguments: [
      {
        sourceUri: vim.uri_from_fname(source),
        targetUri: vim.uri_from_fname(target),
      },
    ],
  });
  if (!requestOk) {
    print("failed to rename file: tsserver request failed");
    return false;
  }

  if (vim.api.nvim_buf_get_option<boolean>(sourceBufnr, "modified")) {
    vim.api.nvim_buf_call(sourceBufnr, () => vim.cmd("w!"));
  }
  const [didRename, renameError] = vim.loop.fs_rename(source, target);
  if (!didRename) {
    throw new Error(
      `failed to move ${source} to ${target}: ${renameError as string}`
    );
  } else {
    debugLog(`successfully renamed source ${source} to target ${target}`);
  }

  const targetBufnr = vim.fn.bufadd(target);
  vim.api.nvim_buf_set_option(targetBufnr, "buflisted", true);
  for (const win of vim.api.nvim_list_wins()) {
    if (vim.api.nvim_win_get_buf(win) === sourceBufnr) {
      vim.api.nvim_win_set_buf(win, targetBufnr);
    }
  }
  vim.schedule(() => vim.api.nvim_buf_delete(sourceBufnr, { force: true }));

  return true;
};
