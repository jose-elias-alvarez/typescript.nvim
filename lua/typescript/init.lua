--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____config = require("typescript.config")
local setupConfig = ____config.setupConfig
local ____lsp = require("typescript.lsp")
local setupLsp = ____lsp.setupLsp
____exports.setup = function(userOptions)
    setupConfig(userOptions)
    setupLsp()
end
do
    local ____go_2Dto_2Dsource_2Ddefinition = require("typescript.go-to-source-definition")
    local goToSourceDefinition = ____go_2Dto_2Dsource_2Ddefinition.goToSourceDefinition
    ____exports.goToSourceDefinition = goToSourceDefinition
end
do
    local ____rename_2Dfile = require("typescript.rename-file")
    local renameFile = ____rename_2Dfile.renameFile
    ____exports.renameFile = renameFile
end
____exports.actions = require("typescript.source-actions")
return ____exports
