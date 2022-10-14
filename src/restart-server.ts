import { getClient } from "./utils";

interface Opts {
  bufnr?: number;
  force?: boolean;
}

export const restartServer = ({
  bufnr = vim.api.nvim_get_current_buf(),
  force,
}: Opts): void => {
  const client = getClient(bufnr);
  if (!client) {
    return;
  }

  client.stop(force);
  vim.api.nvim_buf_call(bufnr, () => vim.cmd("write | edit"));
};
