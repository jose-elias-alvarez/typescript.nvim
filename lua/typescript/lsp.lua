local ____lualib = require("typescript.lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____commands = require("typescript.commands")
local setupCommands = ____commands.setupCommands
local ____config = require("typescript.config")
local config = ____config.config
local ____handlers = require("typescript.handlers")
local renameHandler = ____handlers.renameHandler
local ____methods = require("typescript.types.methods")
local TypescriptMethods = ____methods.TypescriptMethods
local ____lspconfig = require("lspconfig")
local tsserver = ____lspconfig.tsserver
____exports.setupLsp = function(overrides)
    local resolvedConfig = __TS__ObjectAssign({}, config, overrides or ({}))
    local ____resolvedConfig_server_0 = resolvedConfig.server
    local on_init = ____resolvedConfig_server_0.on_init
    local on_attach = ____resolvedConfig_server_0.on_attach
    local handlers = ____resolvedConfig_server_0.handlers
    resolvedConfig.server.on_init = function(client, initialize_result)
        local ____on_init_result_1 = on_init
        if ____on_init_result_1 ~= nil then
            ____on_init_result_1 = ____on_init_result_1(client, initialize_result)
        end
    end
    resolvedConfig.server.on_attach = function(client, bufnr)
        if not config.disable_commands then
            setupCommands(bufnr)
        end
        local ____on_attach_result_3 = on_attach
        if ____on_attach_result_3 ~= nil then
            ____on_attach_result_3 = ____on_attach_result_3(client, bufnr)
        end
    end
    local ____resolvedConfig_server_9 = resolvedConfig.server
    local ____temp_7 = handlers or ({})
    local ____TypescriptMethods_RENAME_8 = TypescriptMethods.RENAME
    local ____handlers_TypescriptMethods_RENAME_5 = handlers
    if ____handlers_TypescriptMethods_RENAME_5 ~= nil then
        ____handlers_TypescriptMethods_RENAME_5 = ____handlers_TypescriptMethods_RENAME_5[TypescriptMethods.RENAME]
    end
    ____resolvedConfig_server_9.handlers = __TS__ObjectAssign({}, ____temp_7, {[____TypescriptMethods_RENAME_8] = ____handlers_TypescriptMethods_RENAME_5 or renameHandler})
    tsserver.setup(resolvedConfig.server)
end
return ____exports
