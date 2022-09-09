import { setupCommands } from "@ts/commands";
import { config } from "@ts/config";
import { renameHandler } from "@ts/handlers";
import { TypescriptMethods } from "@ts/types/methods";

const shouldAttach = (bufnr: number): boolean => {
  if (vim.api.nvim_buf_get_option(bufnr, "buftype") !== "") {
    return false;
  }

  if (vim.api.nvim_buf_get_name(bufnr) === "") {
    return false;
  }

  return true;
};

export const setupLsp = (): void => {
  const serverConfig = config.server;
  const { on_init, on_attach, handlers, root_dir } = serverConfig;

  serverConfig.on_init = (client, initialize_result): void => {
    on_init?.(client, initialize_result);
  };

  serverConfig.on_attach = (client, bufnr): void => {
    if (!config.disable_commands) {
      setupCommands(bufnr);
    }

    on_attach?.(client, bufnr);
  };

  serverConfig.handlers = {
    ...(handlers || {}),
    [TypescriptMethods.RENAME]:
      handlers?.[TypescriptMethods.RENAME] ?? renameHandler,
  };

  vim.api.nvim_create_autocmd("FileType", {
    pattern: [
      "javascript",
      "javascriptreact",
      "javascript.jsx",
      "typescript",
      "typescriptreact",
      "typescript.tsx",
    ],
    callback: (args) => {
      if (!shouldAttach(args.buf)) {
        return false;
      }

      const resolvedConfig = { ...serverConfig };
      if (typeof root_dir === "function") {
        resolvedConfig.root_dir = root_dir(args.file);
      }
      vim.lsp.start(resolvedConfig);
    },
  });
};
