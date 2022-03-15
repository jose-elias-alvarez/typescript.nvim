import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";
import { config, ConfigOptions } from "./config";

export const setupLsp = (overrides?: ConfigOptions) => {
  const resolvedConfig = { ...config, ...(overrides || {}) };
  const { on_init, on_attach } = resolvedConfig.server;

  resolvedConfig.server.on_init = (client, initialize_result) => {
    if (resolvedConfig.disable_formatting) {
      client.resolved_capabilities.document_formatting = false;
      client.resolved_capabilities.document_range_formatting = false;
    }

    on_init?.(client, initialize_result);
  };

  resolvedConfig.server.on_attach = (client, bufnr) => {
    setupCommands(bufnr);

    on_attach?.(client, bufnr);
  };

  tsserver.setup(resolvedConfig.server);
};
