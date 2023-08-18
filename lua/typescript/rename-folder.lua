--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
-- Lua Library inline imports
local function __TS__StringEndsWith(self, searchString, endPosition)
    if endPosition == nil or endPosition > #self then
        endPosition = #self
    end
    return string.sub(self, endPosition - #searchString + 1, endPosition) == searchString
end

-- End of Lua Library inline imports
local ____exports = {}
local ____lspconfig = require("lspconfig")
local util = ____lspconfig.util
local ____rename_2Dfile = require("typescript.rename-file")
local renameFile = ____rename_2Dfile.renameFile
local ____utils = require("typescript.utils")
local debugLog = ____utils.debugLog
____exports.renameFolder = function(source, target, opts)
    if opts == nil then
        opts = {}
    end
    debugLog(source, target)
    local sourceBufnr = vim.fn.bufadd(source)
    vim.fn.bufload(sourceBufnr)
    if not util.path.is_dir(source) then
        debugLog("source is not a directory")
        return false
    end
    if util.path.exists(target) and util.path.is_dir(target) and (opts.force == nil or opts.force == false) then
        local status = vim.fn.confirm("Folder exists! Overwrite?", "&Yes\n&No")
        if status ~= 1 then
            debugLog("user declined to overrwrite file; aborting")
            return false
        end
    end
    vim.fn.mkdir(
        vim.fn.fnamemodify(target, ":p:h"),
        "p"
    )
    local files = vim.fn.readdir(source)
    for ____, file in ipairs(files) do
        debugLog(file)
        if __TS__StringEndsWith(file, ".ts") and renameFile(source .. file, target .. file, opts) then
            debugLog("OK")
        end
    end
    return true
end
return ____exports
