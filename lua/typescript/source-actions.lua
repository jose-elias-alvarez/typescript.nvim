--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__ObjectAssign(target, ...)
    local sources = {...}
    for i = 1, #sources do
        local source = sources[i]
        for key in pairs(source) do
            target[key] = source[key]
        end
    end
    return target
end

-- End of Lua Library inline imports
local ____exports = {}
local ____methods = require("typescript.types.methods")
local Methods = ____methods.Methods
local ____utils = require("typescript.utils")
local debugLog = ____utils.debugLog
local getClient = ____utils.getClient
local SourceActions = SourceActions or ({})
SourceActions.SourceAddMissingImportsTs = "source.addMissingImports.ts"
SourceActions.SourceFixAllTs = "source.fixAll.ts"
SourceActions.SourceRemoveUnusedTs = "source.removeUnused.ts"
SourceActions.SourceOrganizeImportsTs = "source.organizeImports.ts"
local function makeCommand(sourceAction)
    return function(opts)
        if opts == nil then
            opts = {}
        end
        local bufnr = opts.bufnr or vim.api.nvim_get_current_buf()
        local client = getClient(bufnr)
        if not client then
            return
        end
        local params = __TS__ObjectAssign(
            {},
            vim.lsp.util.make_range_params(),
            {context = {
                only = {sourceAction},
                diagnostics = vim.diagnostic.get(bufnr)
            }}
        )
        local function applyEdits(res)
            debugLog(
                "received response:",
                vim.inspect(res)
            )
            local ____res__0_edit_6 = res[1]
            if ____res__0_edit_6 ~= nil then
                ____res__0_edit_6 = ____res__0_edit_6.edit
            end
            local ____res__0_edit_documentChanges_4 = ____res__0_edit_6
            if ____res__0_edit_documentChanges_4 ~= nil then
                ____res__0_edit_documentChanges_4 = ____res__0_edit_documentChanges_4.documentChanges
            end
            local ____res__0_edit_documentChanges__0_2 = ____res__0_edit_documentChanges_4
            if ____res__0_edit_documentChanges__0_2 ~= nil then
                ____res__0_edit_documentChanges__0_2 = ____res__0_edit_documentChanges__0_2[1]
            end
            local ____res__0_edit_documentChanges__0_edits_0 = ____res__0_edit_documentChanges__0_2
            if ____res__0_edit_documentChanges__0_edits_0 ~= nil then
                ____res__0_edit_documentChanges__0_edits_0 = ____res__0_edit_documentChanges__0_edits_0.edits
            end
            if ____res__0_edit_documentChanges__0_edits_0 == nil then
                return
            end
            vim.lsp.util.apply_text_edits(res[1].edit.documentChanges[1].edits, bufnr, client.offset_encoding)
        end
        debugLog(
            ("sending source action request for action " .. sourceAction) .. " with params:",
            vim.inspect(params)
        )
        if opts.sync == true then
            local res = client.request_sync(Methods.CODE_ACTION, params, nil, bufnr)
            applyEdits(res.result)
        else
            client.request(
                Methods.CODE_ACTION,
                params,
                function(_, res) return applyEdits(res or ({})) end,
                bufnr
            )
        end
    end
end
____exports.addMissingImports = makeCommand(SourceActions.SourceAddMissingImportsTs)
____exports.organizeImports = makeCommand(SourceActions.SourceOrganizeImportsTs)
____exports.fixAll = makeCommand(SourceActions.SourceFixAllTs)
____exports.removeUnused = makeCommand(SourceActions.SourceRemoveUnusedTs)
return ____exports
