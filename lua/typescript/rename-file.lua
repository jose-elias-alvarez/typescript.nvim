local ____lualib = require("typescript.lualib_bundle")
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local ____execute_2Dcommand = require("typescript.execute-command")
local executeCommand = ____execute_2Dcommand.executeCommand
local ____workspace_2Dcommands = require("typescript.types.workspace-commands")
local WorkspaceCommands = ____workspace_2Dcommands.WorkspaceCommands
local ____utils = require("typescript.utils")
local debugLog = ____utils.debugLog
local ____lspconfig = require("lspconfig")
local util = ____lspconfig.util
____exports.renameFile = function(source, target, opts)
    if opts == nil then
        opts = {}
    end
    local sourceBufnr = vim.fn.bufadd(source)
    vim.fn.bufload(sourceBufnr)
    if util.path.exists(target) and (opts.force == nil or opts.force == false) then
        local status = vim.fn.confirm("File exists! Overwrite?", "&Yes\n&No")
        if status ~= 1 then
            debugLog("user declined to overrwrite file; aborting")
            return false
        end
    end
    vim.fn.mkdir(
        vim.fn.fnamemodify(target, ":p:h"),
        "p"
    )
    debugLog((("sending request to rename source " .. source) .. " to target ") .. target)
    local requestOk = executeCommand(
        sourceBufnr,
        {
            command = WorkspaceCommands.APPLY_RENAME_FILE,
            arguments = {{
                sourceUri = vim.uri_from_fname(source),
                targetUri = vim.uri_from_fname(target)
            }}
        }
    )
    if not requestOk then
        print("failed to rename file: tsserver request failed")
        return false
    end
    if vim.api.nvim_buf_get_option(sourceBufnr, "modified") then
        vim.api.nvim_buf_call(
            sourceBufnr,
            function() return vim.cmd("w!") end
        )
    end
    local didRename, renameError = vim.loop.fs_rename(source, target)
    if not didRename then
        error(
            __TS__New(Error, (((("failed to move " .. source) .. " to ") .. target) .. ": ") .. renameError),
            0
        )
    else
        debugLog((("successfully renamed source " .. source) .. " to target ") .. target)
    end
    local targetBufnr = vim.fn.bufadd(target)
    vim.api.nvim_buf_set_option(targetBufnr, "buflisted", true)
    for ____, win in ipairs(vim.api.nvim_list_wins()) do
        if vim.api.nvim_win_get_buf(win) == sourceBufnr then
            vim.api.nvim_win_set_buf(win, targetBufnr)
        end
    end
    vim.schedule(function() return vim.api.nvim_buf_delete(sourceBufnr, {force = true}) end)
    return true
end
return ____exports
