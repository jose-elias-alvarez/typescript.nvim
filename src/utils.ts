export const getClient = (bufnr: number): NvimLsp.Client | undefined => {
  for (const [, client] of vim.lsp.buf_get_clients(bufnr)) {
    if (client.name === "tsserver") {
      return client;
    }
  }
};
