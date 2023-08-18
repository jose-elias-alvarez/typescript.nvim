import { util } from "lspconfig";
import { renameFile } from "@ts/rename-file";
import { debugLog } from "@ts/utils";

interface Opts {
  force?: boolean;
}

export const renameFolder = (
  source: string,
  target: string,
  opts: Opts = {}
): boolean => {
  debugLog(source, target);
  const sourceBufnr = vim.fn.bufadd(source);
  vim.fn.bufload(sourceBufnr);

  if (!util.path.is_dir(source)) {
    debugLog("source is not a directory");
    return false;
  }

  if (
    util.path.exists(target) &&
    util.path.is_dir(target) &&
    (opts.force === undefined || opts.force === false)
  ) {
    const status = vim.fn.confirm("Folder exists! Overwrite?", "&Yes\n&No");
    if (status !== 1) {
      debugLog("user declined to overrwrite file; aborting");
      return false;
    }
  }
  vim.fn.mkdir(vim.fn.fnamemodify(target, ":p:h"), "p");
  const files = vim.fn.readdir(source);
  for (const file of files) {
    debugLog(file);
    if (
      file.endsWith(".ts") &&
      renameFile(source + file, target + file, opts)
    ) {
      debugLog("OK");
    }
  }
  return true;
};
