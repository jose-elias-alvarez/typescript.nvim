import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";
import { config, ConfigOptions } from "./config";
import { renameHandler } from "./handlers";
import { TypescriptMethods } from "./types/methods";

export const setupLsp = (overrides?: ConfigOptions) => {
  const resolvedConfig = { ...config, ...(overrides || {}) };
  const { on_init, on_attach, handlers, init_options } = resolvedConfig.server;

  resolvedConfig.server.on_init = (client, initialize_result) => {
    on_init?.(client, initialize_result);
  };

  resolvedConfig.server.on_attach = (client, bufnr) => {
    if (!config.disable_commands) {
      setupCommands(bufnr);
    }

    on_attach?.(client, bufnr);
  };

  resolvedConfig.server.handlers = {
    ...(handlers || {}),
    [TypescriptMethods.RENAME]:
      handlers?.[TypescriptMethods.RENAME] ?? renameHandler,
  };

  resolvedConfig.server.init_options = {
    ...config?.server?.init_options,
    ...init_options,
  };

  tsserver.setup(resolvedConfig.server);
};
