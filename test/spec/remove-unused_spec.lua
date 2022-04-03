local test_utils = require("./test-utils")

describe("TypescriptRemoveUnused", function()
    test_utils.setup()

    describe("unused import", function()
        local content = [[
import { UserNotification, User } from "./types";

const user: User = { name: "Jose" };

console.log(user);
        ]]
        local final = [[
import { User } from "./types";

const user: User = { name: "Jose" };

console.log(user);
        ]]

        it("removes unused import", function()
            local assert_final = test_utils.setup_test_file("remove-unused-import", content, final)

            vim.cmd("TypescriptRemoveUnused!")

            assert_final()
        end)
    end)

    describe("unused variable", function()
        local content = [[
import { UserNotification, User } from "./types";

const user: User = { name: "Jose" };
const userNotification: UserNotification = { content: "hello", user };
        ]]
        local final = [[
import { UserNotification, User } from "./types";

const user: User = { name: "Jose" };
        ]]

        it("removes unused variable", function()
            local assert_final = test_utils.setup_test_file("remove-unused-variable", content, final)

            vim.cmd("TypescriptRemoveUnused!")

            assert_final()
        end)
    end)
end)
