import { setupCommands } from "@ts/commands";
import { config, ConfigOptions } from "@ts/config";
import { renameHandler } from "@ts/handlers";
import { TypescriptMethods } from "@ts/types/methods";
import { tsserver } from "lspconfig";

export const setupLsp = (overrides?: ConfigOptions) => {
  const resolvedConfig = { ...config, ...(overrides || {}) };
  const { on_init, on_attach, handlers } = resolvedConfig.server;

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

  tsserver.setup(resolvedConfig.server);
};
