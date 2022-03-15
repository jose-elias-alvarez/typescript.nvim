export const getClient = (): NvimLsp.Client | undefined => {
  for (const client of vim.lsp.get_active_clients()) {
    if (client.name === "tsserver") {
      return client;
    }
  }
};
