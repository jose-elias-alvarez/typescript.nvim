--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local function isRenameResult(res)
    return type(res) == "table" and res.position ~= nil
end
local function renameHandler(_err, res)
    if not isRenameResult(res) then
        return
    end
    local bufnr = 0
    local win = 0
    local ____res_position_0 = res.position
    local line = ____res_position_0.line
    local character = ____res_position_0.character
    local col = vim.str_byteindex(
        vim.api.nvim_buf_get_lines(bufnr, line, line + 1, true)[1],
        character,
        true
    )
    vim.api.nvim_win_set_cursor(win, {line + 1, col})
    vim.lsp.buf.rename()
    return res
end
____exports.renameHandler = renameHandler
return ____exports
