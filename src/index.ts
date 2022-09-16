import { ConfigOptions, setupConfig } from "@ts/config";
import { setupLsp } from "@ts/lsp";

export const setup = (userOptions: ConfigOptions): void => {
  setupConfig(userOptions);
  setupLsp();
};

export { goToSourceDefinition } from "@ts/go-to-source-definition";
export { renameFile } from "@ts/rename-file";
export * as actions from "@ts/source-actions";
