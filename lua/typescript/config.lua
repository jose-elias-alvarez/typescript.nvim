local ____lualib = require("typescript.lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__New = ____lualib.__TS__New
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
