--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____execute_2Dcommand = require("typescript.execute-command")
local executeCommand = ____execute_2Dcommand.executeCommand
local ____methods = require("typescript.types.methods")
local Methods = ____methods.Methods
local ____workspace_2Dcommands = require("typescript.types.workspace-commands")
local WorkspaceCommands = ____workspace_2Dcommands.WorkspaceCommands
local ____utils = require("typescript.utils")
local getClient = ____utils.getClient
local resolveHandler = ____utils.resolveHandler
____exports.goToSourceDefinition = function(winnr, ____bindingPattern0)
    local fallback
    fallback = ____bindingPattern0.fallback
    local bufnr = vim.api.nvim_win_get_buf(winnr)
    local client = getClient(bufnr)
    if not client then
        return false
    end
    local positionParams = vim.lsp.util.make_position_params(winnr, client.offset_encoding)
    local requestOk = executeCommand(
        bufnr,
        {command = WorkspaceCommands.GO_TO_SOURCE_DEFINITION, arguments = {positionParams.textDocument.uri, positionParams.position}},
        function(...)
            local args = {...}
            local handler = resolveHandler(bufnr, Methods.DEFINITION)
            if not handler then
                print("failed to go to source definition: could not resolve definition handler")
                return
            end
            local res = args[2] or ({})
            if vim.tbl_isempty(res) then
                if fallback == true then
                    return client.request(Methods.DEFINITION, positionParams, handler, bufnr)
                end
                print("failed to go to source definition: no source definitions found")
                return
            end
            handler(unpack(args))
        end
    )
    if not requestOk then
        print("failed to go to source definition: tsserver request failed")
    end
    return requestOk
end
return ____exports
