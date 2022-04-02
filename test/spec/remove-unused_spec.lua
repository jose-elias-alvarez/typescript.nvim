local test_utils = require("./test-utils")

describe("TypescriptRemoveUnused", function()
    test_utils.setup()

    it("removes unused import", function()
        local final = [[import { User } from "./types";]]
        test_utils.edit_test_file("remove-unused-import.ts", true)
        assert.is_not.equals(test_utils.get_content()[1], final)

        vim.cmd("TypescriptRemoveUnused!")

        assert.equals(test_utils.get_content()[1], final)
    end)

    it("removes unused variable", function()
        local final = [[]]
        test_utils.edit_test_file("remove-unused-variable.ts", true)
        assert.is_not.equals(test_utils.get_content()[4], final)

        vim.cmd("TypescriptRemoveUnused!")

        assert.equals(test_utils.get_content()[4], final)
    end)
end)
