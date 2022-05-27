import { renameFile } from "./rename-file";
import {
  addMissingImports,
  fixAll,
  organizeImports,
  removeUnused,
} from "./source-actions";

export const setupCommands = (bufnr: number) => {
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptRenameFile",
    (opts) => {
      const source = vim.api.nvim_buf_get_name(0);
      vim.ui.input({ prompt: "New path: ", default: source }, (input) => {
        if (input === "" || input === source || input === undefined) {
          return;
        }
        renameFile(source, input, {
          force: opts.bang,
        });
      });
    },
    { bang: true }
  );

  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptAddMissingImports",
    (opts) => addMissingImports({ sync: opts.bang }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptOrganizeImports",
    (opts) => organizeImports({ sync: opts.bang }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptFixAll",
    (opts) => fixAll({ sync: opts.bang }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptRemoveUnused",
    (opts) => removeUnused({ sync: opts.bang }),
    { bang: true }
  );
};
