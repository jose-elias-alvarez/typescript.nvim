/** @noSelf **/
declare module "lspconfig" {
  namespace tsserver {
    const setup: (options: NvimLsp.ServerOptions) => void;
  }
  namespace util {
    namespace path {
      const exists: (path: string) => boolean;
    }
  }
}
