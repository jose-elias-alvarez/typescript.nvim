local test_utils = require("./test-utils")

describe("TypescriptAddMissingImports", function()
    test_utils.setup()

    it("imports missing types", function()
        local final = [[import { User, UserNotification } from "./types";]]
        test_utils.edit_test_file("add-missing-imports.ts", true)
        assert.is_not.equals(test_utils.get_content()[1], final)

        vim.cmd("TypescriptAddMissingImports!")

        assert.equals(test_utils.get_content()[1], final)
    end)
end)
