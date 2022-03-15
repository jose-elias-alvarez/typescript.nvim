import { ConfigOptions, setupConfig } from "./config";
import { setupLsp } from "./lsp";

export const setup = (userOptions: ConfigOptions) => {
  setupConfig(userOptions);
  setupLsp();
};
