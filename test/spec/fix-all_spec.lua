local test_utils = require("./test-utils")

describe("TypescriptFixAll", function()
    test_utils.setup()

    describe("bad async function", function()
        local content = [[
const mySyncFunc = () => console.log("hello");

const myAsyncFunc = () => await mySyncFunc();
        ]]
        local final = [[
const mySyncFunc = () => console.log("hello");

const myAsyncFunc = async () => await mySyncFunc();
        ]]

        it("adds async to non-async function", function()
            local assert_final = test_utils.setup_test_file("fix-all-async", content, final)

            vim.cmd("TypescriptFixAll!")

            assert_final()
        end)
    end)

    describe("unreachable code", function()
        local content = [[
const myUnreachableFunc = () => {
  return "done";
  return "whoops";
};
        ]]
        local final = [[
const myUnreachableFunc = () => {
  return "done";
};
        ]]

        it("removes unreachable return statement", function()
            local assert_final = test_utils.setup_test_file("fix-all-unreachable", content, final)

            vim.cmd("TypescriptFixAll!")

            assert_final()
        end)
    end)
end)
