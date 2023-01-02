local null_ls = require("null-ls")

local name_to_tile = function(name)
    local title = name:gsub(".%f[%l]", " %1"):gsub("%l%f[%u]", "%1 "):lower() -- add spaces
    title = title:sub(1, 1):upper() .. title:sub(2) -- capitalize first letter, to match tsserver actions
    return title
end

return {
    name = "typescript",
    method = null_ls.methods.CODE_ACTION,
    filetypes = {
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
    },
    generator = {
        fn = function(params)
            local typescript = require("typescript")

            local actions = {}
            for name, action in pairs(typescript.actions) do
                local cb = action
                table.insert(actions, {
                    title = name_to_tile(name),
                    action = function()
                        vim.api.nvim_buf_call(params.bufnr, cb)
                    end,
                })
            end
            return actions
        end,
    },
}
