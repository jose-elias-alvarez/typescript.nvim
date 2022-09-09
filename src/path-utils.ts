export const pathExists = (filename: string): boolean => {
  const stat = vim.loop.fs_stat(filename);
  return stat?.type !== undefined;
};

export const rootPattern = (names: string[]): string | undefined =>
  vim.fs.dirname(
    vim.fs.find(names, {
      upward: true,
    })[0]
  );
