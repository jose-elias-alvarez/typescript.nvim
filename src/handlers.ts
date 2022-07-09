interface RenameResult {
  position: {
    line: number;
    character: number;
  };
}

const isRenameResult = (res: unknown): res is RenameResult => {
  return (
    typeof res === "object" &&
    (res as Record<string, unknown>).position !== undefined
  );
};

const renameHandler: NvimLsp.Handler = (_err, res) => {
  if (!isRenameResult(res)) {
    return;
  }

  // we don't know the exact buffer and window,
  // but since the handler is invoked after applying a code action,
  // we can assume the current buffer and window
  const bufnr = 0,
    win = 0;

  const { line, character } = res.position;
  const col = vim.str_byteindex(
    vim.api.nvim_buf_get_lines(bufnr, line, line + 1, true)[0],
    character,
    true
  );

  // set cursor to new position and send rename request
  vim.api.nvim_win_set_cursor(win, [line + 1, col]);
  vim.lsp.buf.rename();
  return res;
};

export { renameHandler };
