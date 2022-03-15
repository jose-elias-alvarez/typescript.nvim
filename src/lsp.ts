import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";
import { config } from "./config";

export const setupLsp = () => {
  const { on_init, on_attach } = config.server;

  config.server.on_init = (client, initialize_result) => {
    if (config.disable_formatting) {
      client.resolved_capabilities.document_formatting = false;
      client.resolved_capabilities.document_range_formatting = false;
    }

    on_init?.(client, initialize_result);
  };

  config.server.on_attach = (client, bufnr) => {
    setupCommands(bufnr);

    on_attach?.(client, bufnr);
  };

  tsserver.setup(config.server);
};
