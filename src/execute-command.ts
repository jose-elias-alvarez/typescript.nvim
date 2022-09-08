import { Methods } from "@ts/types/methods";
import { WorkspaceCommands } from "@ts/types/workspace-commands";
import { getClient } from "@ts/utils";

export interface ExecuteCommandParams {
  command: WorkspaceCommands;
  arguments: unknown[];
}

export const executeCommand = <T = void>(
  bufnr: number,
  params: ExecuteCommandParams,
  callback?: NvimLsp.Handler<T>
): boolean => {
  const client = getClient(bufnr);
  if (!client) {
    return false;
  }

  return client.request<T, ExecuteCommandParams>(
    Methods.EXECUTE_COMMAND,
    params,
    callback
  );
};
