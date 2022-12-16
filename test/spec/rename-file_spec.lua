local test_utils = require("./test-utils")
local path = require("lspconfig").util.path

describe("renameFile", function()
    test_utils.setup()

    local old_path = path.join(test_utils.test_dir, "old-file.ts")
    local new_path = path.join(test_utils.test_dir, "new-file.ts")
    local linked_path = path.join(test_utils.test_dir, "linked-file.ts")

    local file_content = [[
export const myFunc = () => console.log("hello");]]
    local linked_file_content = [[
import { myFunc } from "./old-file";

myFunc();]]
    local final_linked_file_content = [[
import { myFunc } from "./new-file";

myFunc();]]

    after_each(function()
        vim.loop.fs_unlink(old_path)
        vim.loop.fs_unlink(new_path)
        vim.loop.fs_unlink(linked_path)
    end)

    it("moves old file content into new file", function()
        test_utils.write_file(old_path, file_content)
        test_utils.edit_temp_file(old_path)

        require("typescript").renameFile(old_path, new_path)

        assert.falsy(path.exists(old_path))
        assert.truthy(path.exists(new_path))
        assert.equals(vim.api.nvim_buf_get_name(0), new_path)
        assert.equals(table.concat(vim.api.nvim_buf_get_lines(0, 0, -1, false), "\n"), file_content)
    end)

    it("updates path in linked file", function()
        test_utils.write_file(old_path, file_content)
        test_utils.write_file(linked_path, linked_file_content)
        test_utils.edit_temp_file(linked_path)

        require("typescript").renameFile(old_path, new_path)

        -- wait for workspace/applyEdit request to come back from server
        vim.wait(1000, function()
            return test_utils.get_content(0) == final_linked_file_content
        end)
        assert.equals(test_utils.get_content(0), final_linked_file_content)
    end)
end)
