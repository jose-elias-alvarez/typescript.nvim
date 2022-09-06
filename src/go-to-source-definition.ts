import { executeCommand } from "@ts/execute-command";
import { Methods } from "@ts/types/methods";
import { WorkspaceCommands } from "@ts/types/workspace-commands";
import { getClient, resolveHandler } from "@ts/utils";
import { Location } from "vscode-languageserver-types";

interface Opts {
  winnr: number;
}

export const goToSourceDefinition = ({ winnr }: Opts) => {
  const bufnr = vim.api.nvim_win_get_buf(winnr);
  const client = getClient(bufnr);
  if (!client) {
    return;
  }

  const positionParams = vim.lsp.util.make_position_params(
    winnr,
    client.offset_encoding
  );

  const requestOk = executeCommand<Location>(
    bufnr,
    {
      command: WorkspaceCommands.GO_TO_SOURCE_DEFINITION,
      arguments: [positionParams.textDocument.uri, positionParams.position],
    },
    resolveHandler(bufnr, Methods.DEFINITION)
  );

  if (!requestOk) {
    print("failed to go to source definition: tsserver request failed");
  }
};
