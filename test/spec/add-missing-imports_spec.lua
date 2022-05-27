local test_utils = require("./test-utils")

describe("TypescriptAddMissingImports", function()
    test_utils.setup()

    describe("types", function()
        local content = [[
const testUser: User = { name: "Jose" };

const notification: UserNotification = { user: testUser, content: "hello" };
       ]]
        local final = [[
import { User, UserNotification } from "./types";

const testUser: User = { name: "Jose" };

const notification: UserNotification = { user: testUser, content: "hello" };
       ]]

        describe("Lua API", function()
            it("imports missing types", function()
                local assert_final = test_utils.setup_test_file("add-missing-imports", content, final)

                require("typescript").actions.addMissingImports({ sync = true })

                assert_final()
            end)

            it("does nothing when file has no missing imports", function()
                local assert_final = test_utils.setup_test_file("add-missing-imports", final, final)

                local ok = pcall(require("typescript").actions.addMissingImports, { sync = true })

                assert_final()
                assert.truthy(ok)
            end)
        end)

        describe("Vim command", function()
            it("imports missing types", function()
                local assert_final = test_utils.setup_test_file("add-missing-imports", content, final)

                vim.cmd("TypescriptAddMissingImports!")

                assert_final()
            end)

            it("does nothing when file has no missing imports", function()
                local assert_final = test_utils.setup_test_file("add-missing-imports", final, final)

                local ok = pcall(vim.cmd, "TypescriptAddMissingImports!")

                assert_final()
                assert.truthy(ok)
            end)
        end)
    end)
end)
