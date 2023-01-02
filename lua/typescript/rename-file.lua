--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

local Error, RangeError, ReferenceError, SyntaxError, TypeError, URIError
do
    local function getErrorStack(self, constructor)
        local level = 1
        while true do
            local info = debug.getinfo(level, "f")
            level = level + 1
            if not info then
                level = 1
                break
            elseif info.func == constructor then
                break
            end
        end
        if __TS__StringIncludes(_VERSION, "Lua 5.0") then
            return debug.traceback(("[Level " .. tostring(level)) .. "]")
        else
            return debug.traceback(nil, level)
        end
    end
    local function wrapErrorToString(self, getDescription)
        return function(self)
            local description = getDescription(self)
            local caller = debug.getinfo(3, "f")
            local isClassicLua = __TS__StringIncludes(_VERSION, "Lua 5.0") or _VERSION == "Lua 5.1"
            if isClassicLua or caller and caller.func ~= error then
                return description
            else
                return (tostring(description) .. "\n") .. self.stack
            end
        end
    end
    local function initErrorClass(self, Type, name)
        Type.name = name
        return setmetatable(
            Type,
            {__call = function(____, _self, message) return __TS__New(Type, message) end}
        )
    end
    local ____initErrorClass_2 = initErrorClass
    local ____class_0 = __TS__Class()
    ____class_0.name = ""
    function ____class_0.prototype.____constructor(self, message)
        if message == nil then
            message = ""
        end
        self.message = message
        self.name = "Error"
        self.stack = getErrorStack(nil, self.constructor.new)
        local metatable = getmetatable(self)
        if not metatable.__errorToStringPatched then
            metatable.__errorToStringPatched = true
            metatable.__tostring = wrapErrorToString(nil, metatable.__tostring)
        end
    end
    function ____class_0.prototype.__tostring(self)
        local ____temp_1
        if self.message ~= "" then
            ____temp_1 = (self.name .. ": ") .. self.message
        else
            ____temp_1 = self.name
        end
        return ____temp_1
    end
    Error = ____initErrorClass_2(nil, ____class_0, "Error")
    local function createErrorClass(self, name)
        local ____initErrorClass_4 = initErrorClass
        local ____class_3 = __TS__Class()
        ____class_3.name = ____class_3.name
        __TS__ClassExtends(____class_3, Error)
        function ____class_3.prototype.____constructor(self, ...)
            ____class_3.____super.prototype.____constructor(self, ...)
            self.name = name
        end
        return ____initErrorClass_4(nil, ____class_3, name)
    end
    RangeError = createErrorClass(nil, "RangeError")
    ReferenceError = createErrorClass(nil, "ReferenceError")
    SyntaxError = createErrorClass(nil, "SyntaxError")
    TypeError = createErrorClass(nil, "TypeError")
    URIError = createErrorClass(nil, "URIError")
end

-- End of Lua Library inline imports
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
