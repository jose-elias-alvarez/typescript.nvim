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

export const resolveHandler = (
  bufnr: number,
  method: string
): NvimLsp.Handler | undefined => {
  const client = getClient(bufnr);
  if (!client) {
    return;
  }

  return client.handlers[method] ?? vim.lsp.handlers[method];
};
