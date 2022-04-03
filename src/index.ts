import { ConfigOptions, setupConfig } from "./config";
import { setupLsp } from "./lsp";

export const setup = (userOptions: ConfigOptions) => {
  setupConfig(userOptions);
  setupLsp();
};

export * as actions from "./source-actions";
export { renameFile } from "./rename-file";
