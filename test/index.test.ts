import { setup } from "../src";
import { ConfigOptions, setupConfig } from "../src/config";
import { setupLsp } from "../src/lsp";

jest.mock("../src/lsp.ts");
jest.mock("../src/config.ts");

describe("setup", () => {
  const mockOptions: ConfigOptions = {
    disable_commands: true,
    disable_formatting: false,
  };

  test("sets up plugin", () => {
    setup(mockOptions);

    expect(setupConfig).toHaveBeenCalledWith(mockOptions);
    expect(setupLsp).toHaveBeenCalled();
  });
});
