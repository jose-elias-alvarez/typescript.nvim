--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____methods = require("typescript.types.methods")
local Methods = ____methods.Methods
local ____utils = require("typescript.utils")
local getClient = ____utils.getClient
____exports.executeCommand = function(bufnr, params, callback)
    local client = getClient(bufnr)
    if not client then
        return false
    end
    return client.request(Methods.EXECUTE_COMMAND, params, callback)
end
return ____exports
