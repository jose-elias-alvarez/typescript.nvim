declare module "lspconfig" {
  const tsserver: {
    setup: (this: void, options: NvimLsp.ServerOptions) => void;
  };
  const util: {
    path: {
      exists: (this: void, path: string) => boolean;
    };
  };
}
