--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____config = require("typescript.config")
local config = ____config.config
____exports.debugLog = function(...)
    if not config.debug then
        return
    end
    print(...)
end
____exports.getClient = function(bufnr)
    for ____, client in pairs(vim.lsp.get_active_clients({bufnr = bufnr})) do
        if client.name == "tsserver" then
            return client
        end
    end
end
____exports.resolveHandler = function(bufnr, method)
    local client = ____exports.getClient(bufnr)
    if not client then
        return
    end
    return client.handlers[method] or vim.lsp.handlers[method]
end
return ____exports
