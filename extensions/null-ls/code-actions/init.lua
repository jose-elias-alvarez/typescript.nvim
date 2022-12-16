local helpers_ok, helpers = pcall(require, "null-ls.helpers")
if not helpers_ok then
	return
end

local methods_ok, methods = pcall(require, "null-ls.methods")
if not methods_ok then
	return
end

return helpers.make_builtin({
    name = "typescript",
    meta = {
        url = "https://github.com/jose-elias-alvarez/typescript.nvim",
        description = "A Lua plugin, written in TypeScript, to write TypeScript (Lua optional).",
    },
    method = methods.internal.CODE_ACTION,
    filetypes = { "javascript", "javascriptreact", "typescript", "typescriptreact" },
    generator = {
        fn = function(params)
            local typescript = require("typescript")

            local actions = {}
            for name, action in pairs(typescript.actions) do
                local cb = action
                table.insert(actions, {
                    title = name:gsub(".%f[%l]", " %1"):gsub("%l%f[%u]", "%1 "):gsub("^.", string.upper),
                    action = function()
                        vim.api.nvim_buf_call(params.bufnr, cb)
                    end,
                })
            end
            return actions
        end,
    },
})
