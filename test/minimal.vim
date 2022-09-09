set hidden
set noswapfile

set rtp+=../plenary.nvim
set rtp+=../typescript.nvim
runtime! plugin/plenary.vim

lua package.path = vim.loop.cwd() .. "/test/?.lua;" .. package.path
