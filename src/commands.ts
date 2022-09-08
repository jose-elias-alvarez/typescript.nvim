import { goToSourceDefinition } from "@ts/go-to-source-definition";
import { renameFile } from "@ts/rename-file";
import {
  addMissingImports,
  fixAll,
  organizeImports,
  removeUnused,
} from "@ts/source-actions";

export const setupCommands = (bufnr: number): void => {
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptRenameFile",
    (opts) => {
      const source = vim.api.nvim_buf_get_name(bufnr);
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
    "TypescriptGoToSourceDefinition",
    () => goToSourceDefinition({ winnr: vim.api.nvim_get_current_win() }),
    {}
  );

  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptAddMissingImports",
    (opts) => addMissingImports({ sync: opts.bang, bufnr }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptOrganizeImports",
    (opts) => organizeImports({ sync: opts.bang, bufnr }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptFixAll",
    (opts) => fixAll({ sync: opts.bang, bufnr }),
    { bang: true }
  );
  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptRemoveUnused",
    (opts) => removeUnused({ sync: opts.bang, bufnr }),
    { bang: true }
  );
};
