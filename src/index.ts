import { setupConfig } from "./config";
import { setupLsp } from "./lsp";

export const setup = (userOptions: TypescriptNvim.Options) => {
  setupConfig(userOptions);
  setupLsp();
};
