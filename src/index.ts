import { ConfigOptions, setupConfig } from "@ts/config";
import { setupLsp } from "@ts/lsp";

export const setup = (userOptions: ConfigOptions) => {
  setupConfig(userOptions);
  setupLsp();
};

export { renameFile } from "@ts/rename-file";
export * as actions from "@ts/source-actions";
