declare module "lspconfig" {
  const tsserver: {
    setup: (this: void, options: NvimLsp.ServerOptions) => void;
  };
}
