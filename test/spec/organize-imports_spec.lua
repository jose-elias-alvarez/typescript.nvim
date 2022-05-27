local test_utils = require("./test-utils")

describe("TypescriptOrganizeImports", function()
    test_utils.setup()

    describe("out-of-order imports", function()
        local content = [[
import { UserNotification, User } from "./types";

const user: User = { name: "Jose" };
const notification: UserNotification = { content: "hi", user };

console.log(notification);
        ]]
        local final = [[
import { User, UserNotification } from "./types";

const user: User = { name: "Jose" };
const notification: UserNotification = { content: "hi", user };

console.log(notification);
        ]]

        describe("Lua API", function()
            it("organizes out-of-order imports", function()
                local assert_final = test_utils.setup_test_file("organize-imports", content, final)

                require("typescript").actions.organizeImports({ sync = true })

                assert_final()
            end)
        end)

        describe("Vim command", function()
            it("organizes out-of-order imports", function()
                local assert_final = test_utils.setup_test_file("organize-imports", content, final)

                vim.cmd("TypescriptOrganizeImports!")

                assert_final()
            end)
        end)
    end)
end)
