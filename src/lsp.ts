import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";
import { config, ConfigOptions } from "./config";

export const setupLsp = (overrides?: ConfigOptions) => {
  const resolvedConfig = { ...config, ...(overrides || {}) };
  const { on_init, on_attach } = resolvedConfig.server;

  resolvedConfig.server.on_init = (client, initialize_result) => {
    if (resolvedConfig.disable_formatting) {
      if (vim.fn.has("nvim-0.8") === 1) {
        client.server_capabilities.documentFormattingProvider = false;
        client.server_capabilities.documentRangeFormattingProvider = false;
      } else {
        client.resolved_capabilities.document_formatting = false;
        client.resolved_capabilities.document_range_formatting = false;
      }
    }

    on_init?.(client, initialize_result);
  };

  resolvedConfig.server.on_attach = (client, bufnr) => {
    setupCommands(bufnr);

    on_attach?.(client, bufnr);
  };

  tsserver.setup(resolvedConfig.server);
};
