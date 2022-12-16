--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

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

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

-- End of Lua Library inline imports
local ____exports = {}
local Config = __TS__Class()
Config.name = "Config"
function Config.prototype.____constructor(self)
    self.disable_commands = false
    self.debug = false
    self.server = {}
    self.go_to_source_definition = {fallback = true}
end
function Config.prototype.setup(self, userOpts)
    __TS__ObjectAssign(
        self,
        vim.tbl_deep_extend("force", self, userOpts)
    )
end
____exports.config = __TS__New(Config)
____exports.setupConfig = function(userOpts)
    ____exports.config:setup(userOpts)
end
return ____exports
