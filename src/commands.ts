import { config } from "@ts/config";
import { goToSourceDefinition } from "@ts/go-to-source-definition";
import { renameFile } from "@ts/rename-file";
import { renameFolder } from "@ts/rename-folder";
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
    "TypescriptRenameFolder",
    (opts) => {
      const sourceFile = vim.api.nvim_buf_get_name(bufnr);
      vim.ui.input(
        { prompt: "Old path: ", default: sourceFile },
        (sourceInput) => {
          if (
            sourceInput === "" ||
            sourceInput === sourceFile ||
            sourceInput === undefined
          ) {
            return;
          }
          vim.ui.input(
            { prompt: "New path: ", default: sourceFile },
            (targetInput) => {
              if (
                targetInput === "" ||
                targetInput === sourceFile ||
                targetInput === undefined
              ) {
                return;
              }
              renameFolder(sourceInput, targetInput, {
                force: opts.bang,
              });
            }
          );
        }
      );
    },
    { bang: true }
  );

  vim.api.nvim_buf_create_user_command(
    bufnr,
    "TypescriptGoToSourceDefinition",
    () =>
      goToSourceDefinition(vim.api.nvim_get_current_win(), {
        fallback: config.go_to_source_definition.fallback,
      }),
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
