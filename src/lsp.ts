import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";
import { config, ConfigOptions } from "./config";

export const setupLsp = (overrides?: ConfigOptions) => {
  const resolvedConfig = { ...config, ...(overrides || {}) };
  const { on_init, on_attach } = resolvedConfig.server;

  resolvedConfig.server.on_init = (client, initialize_result) => {
    on_init?.(client, initialize_result);
  };

  resolvedConfig.server.on_attach = (client, bufnr) => {
    if (!config.disable_commands) {
      setupCommands(bufnr);
    }

    on_attach?.(client, bufnr);
  };

  tsserver.setup(resolvedConfig.server);
};
