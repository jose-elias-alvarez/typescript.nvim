import { options } from "./config";
import { tsserver } from "lspconfig";
import { setupCommands } from "./commands";

export const setupLsp = () => {
  const { on_init, on_attach } = options.server;

  options.server.on_init = (client, initialize_result) => {
    if (options.disable_formatting) {
      client.resolved_capabilities.document_formatting = false;
      client.resolved_capabilities.document_range_formatting = false;
    }

    on_init?.(client, initialize_result);
  };

  options.server.on_attach = (client, bufnr) => {
    setupCommands(bufnr);

    on_attach?.(client, bufnr);
  };

  tsserver.setup(options.server);
};
