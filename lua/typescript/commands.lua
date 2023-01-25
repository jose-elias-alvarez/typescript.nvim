--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____config = require("typescript.config")
local config = ____config.config
local ____go_2Dto_2Dsource_2Ddefinition = require("typescript.go-to-source-definition")
local goToSourceDefinition = ____go_2Dto_2Dsource_2Ddefinition.goToSourceDefinition
local ____rename_2Dfile = require("typescript.rename-file")
local renameFile = ____rename_2Dfile.renameFile
local ____rename_2Dfolder = require("typescript.rename-folder")
local renameFolder = ____rename_2Dfolder.renameFolder
local ____source_2Dactions = require("typescript.source-actions")
local addMissingImports = ____source_2Dactions.addMissingImports
local fixAll = ____source_2Dactions.fixAll
local organizeImports = ____source_2Dactions.organizeImports
local removeUnused = ____source_2Dactions.removeUnused
____exports.setupCommands = function(bufnr)
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptRenameFile",
        function(opts)
            local source = vim.api.nvim_buf_get_name(bufnr)
            vim.ui.input(
                {prompt = "New path: ", default = source},
                function(input)
                    if input == "" or input == source or input == nil then
                        return
                    end
                    renameFile(source, input, {force = opts.bang})
                end
            )
        end,
        {bang = true}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptRenameFolder",
        function(opts)
            local sourceFile = vim.api.nvim_buf_get_name(bufnr)
            vim.ui.input(
                {prompt = "Old path: ", default = sourceFile},
                function(sourceInput)
                    if sourceInput == "" or sourceInput == sourceFile or sourceInput == nil then
                        return
                    end
                    vim.ui.input(
                        {prompt = "New path: ", default = sourceFile},
                        function(targetInput)
                            if targetInput == "" or targetInput == sourceFile or targetInput == nil then
                                return
                            end
                            renameFolder(sourceInput, targetInput, {force = opts.bang})
                        end
                    )
                end
            )
        end,
        {bang = true}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptGoToSourceDefinition",
        function() return goToSourceDefinition(
            vim.api.nvim_get_current_win(),
            {fallback = config.go_to_source_definition.fallback}
        ) end,
        {}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptAddMissingImports",
        function(opts) return addMissingImports({sync = opts.bang, bufnr = bufnr}) end,
        {bang = true}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptOrganizeImports",
        function(opts) return organizeImports({sync = opts.bang, bufnr = bufnr}) end,
        {bang = true}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptFixAll",
        function(opts) return fixAll({sync = opts.bang, bufnr = bufnr}) end,
        {bang = true}
    )
    vim.api.nvim_buf_create_user_command(
        bufnr,
        "TypescriptRemoveUnused",
        function(opts) return removeUnused({sync = opts.bang, bufnr = bufnr}) end,
        {bang = true}
    )
end
return ____exports
