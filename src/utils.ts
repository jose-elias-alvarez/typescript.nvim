import { config } from "@ts/config";

export const debugLog = (...args: unknown[]): void => {
  if (!config.debug) {
    return;
  }
  print(...args);
};

export const getClient = (bufnr: number): NvimLsp.Client | undefined => {
  for (const [, client] of vim.lsp.buf_get_clients(bufnr)) {
    if (client.name === "tsserver") {
      return client;
    }
  }
};
