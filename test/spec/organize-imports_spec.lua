local test_utils = require("./test-utils")

describe("TypescriptOrganizeImports", function()
    test_utils.setup()

    it("organizes out-of-order imports", function()
        local final = [[import { User, UserNotification } from "./types";]]
        test_utils.edit_test_file("organize-imports.ts", true)
        assert.is_not.equals(test_utils.get_content()[1], final)

        vim.cmd("TypescriptOrganizeImports!")

        assert.equals(test_utils.get_content()[1], final)
    end)
end)
