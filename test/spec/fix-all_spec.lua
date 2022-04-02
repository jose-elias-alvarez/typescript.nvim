local test_utils = require("./test-utils")

describe("TypescriptFixAll", function()
    test_utils.setup()

    it("adds async to non-async function", function()
        local final = [[const myAsyncFunc = async () => await mySyncFunc();]]
        test_utils.edit_test_file("fix-all-async.ts", true)
        assert.is_not.equals(test_utils.get_content()[3], final)

        vim.cmd("TypescriptFixAll!")

        assert.equals(test_utils.get_content()[3], final)
    end)

    it("removes unreachable return statement", function()
        local final = [[};]]
        test_utils.edit_test_file("fix-all-unreachable.ts", true)
        assert.is_not.equals(test_utils.get_content()[3], final)

        vim.cmd("TypescriptFixAll!")

        assert.equals(test_utils.get_content()[3], final)
    end)
end)
