local join = require("lspconfig").util.path.join

local M = {}

M.test_dir = join(vim.loop.cwd(), "test", "fixtures")

M.attached = false

M.setup = function()
    require("typescript").setup({
        server = {
            on_attach = function(_, bufnr)
                M.attached = true
                vim.api.nvim_create_autocmd("BufDelete", {
                    buffer = bufnr,
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

M.write_file = function(path, content)
    local fd = vim.loop.fs_open(path, "w", 438)
    vim.loop.fs_write(fd, content, -1)
    vim.loop.fs_close(fd)
end

M.get_content = function(bufnr)
    return table.concat(vim.api.nvim_buf_get_lines(bufnr, 0, -1, false), "\n")
end

M.edit_temp_file = function(path, skip_diagnostics)
    vim.cmd(string.format("edit %s", path))
    vim.wait(1000, function()
        return M.attached == true
    end)

    if not skip_diagnostics then
        vim.wait(1000, function()
            return #vim.diagnostic.get(0) > 0
        end)
    end
end

M.setup_test_file = function(name, content, final, skip_diagnostics)
    local path = join(M.test_dir, name .. ".ts")
    M.write_file(path, content)
    M.edit_temp_file(path, skip_diagnostics)

    local bufnr = vim.api.nvim_get_current_buf()
    vim.api.nvim_create_autocmd("BufDelete", {
        buffer = bufnr,
        once = true,
        callback = function()
            vim.loop.fs_unlink(path)
        end,
    })

    return function()
        assert.equals(M.get_content(bufnr), final)
    end
end

return M
