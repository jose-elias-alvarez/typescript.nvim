local M = {}

M.attached = false

M.setup = function()
    require("typescript").setup({
        server = {
            on_attach = function(_, bufnr)
                M.attached = true
                vim.api.nvim_create_autocmd("BufDelete", {
                    buffer = bufnr,
                    once = true,
                    callback = function()
                        M.attached = false
                    end,
                })
            end,
        },
    })

    after_each(function()
        vim.cmd("silent bufdo! bdelete!")
        vim.wait(1000, function()
            return M.attached == false
        end)
    end)
end

M.edit_test_file = function(name, wait_for_diagnostics)
    vim.cmd(string.format("edit %s", require("lspconfig").util.path.join(vim.loop.cwd(), "test", "fixtures", name)))
    vim.wait(1000, function()
        return M.attached == true
    end)

    if wait_for_diagnostics then
        vim.wait(1000, function()
            return #vim.diagnostic.get(0) > 0
        end)
    end
end

M.get_content = function(bufnr)
    bufnr = bufnr or vim.api.nvim_get_current_buf()
    return vim.api.nvim_buf_get_lines(bufnr, 0, -1, false)
end

return M
