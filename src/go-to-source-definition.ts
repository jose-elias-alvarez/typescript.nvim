import { executeCommand } from "@ts/execute-command";
import { Methods } from "@ts/types/methods";
import { WorkspaceCommands } from "@ts/types/workspace-commands";
import { getClient, resolveHandler } from "@ts/utils";
import { Location } from "vscode-languageserver-types";

interface Opts {
  fallback?: boolean;
}

export const goToSourceDefinition = (
  winnr: number,
  { fallback }: Opts
): boolean => {
  const bufnr = vim.api.nvim_win_get_buf(winnr);
  const client = getClient(bufnr);
  if (!client) {
    return false;
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
    (...args) => {
      const handler = resolveHandler(bufnr, Methods.DEFINITION);
      if (!handler) {
        print(
          "failed to go to source definition: could not resolve definition handler"
        );
        return;
      }

      const res = args[1] || [];
      if (vim.tbl_isempty(res)) {
        if (fallback === true) {
          return client.request(
            Methods.DEFINITION,
            positionParams,
            handler,
            bufnr
          );
        }

        print("failed to go to source definition: no source definitions found");
        return;
      }

      handler(...args);
    }
  );

  if (!requestOk) {
    print("failed to go to source definition: tsserver request failed");
  }

  return requestOk;
};
