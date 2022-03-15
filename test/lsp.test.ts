import { tsserver } from "lspconfig";
import { setupCommands } from "../src/commands";
import { setupLsp } from "../src/lsp";

jest.mock("../src/commands");
jest.mock("../src/config", () => ({
  config: { server: {} },
}));

describe("setupLsp", () => {
  const on_init = jest.fn(),
    on_attach = jest.fn(),
    bufnr = Math.floor(Math.random() * 100),
    initialize_result = "ok";

  let client: NvimLsp.Client;
  beforeEach(() => {
    client = {
      name: "tsserver",
      resolved_capabilities: {
        document_formatting: true,
        document_range_formatting: true,
      },
      offset_encoding: "utf-16",
      request: jest.fn(),
      request_sync: jest.fn(),
    };
  });

  test("sets up tsserver", () => {
    setupLsp();

    expect(tsserver.setup).toHaveBeenCalled();
  });

  describe("on_init", () => {
    test("disables formatting capabilities when disable_formatting = true", () => {
      setupLsp({ disable_formatting: true });

      const serverConfig = (tsserver.setup as jest.Mock).mock.calls[0][0];
      serverConfig.on_init(client, initialize_result);

      expect(client.resolved_capabilities.document_formatting).toBeFalsy();
      expect(
        client.resolved_capabilities.document_range_formatting
      ).toBeFalsy();
    });

    test("wraps original on_init when defined", () => {
      setupLsp({ server: { on_init } });

      const serverConfig = (tsserver.setup as jest.Mock).mock.calls[0][0];
      serverConfig.on_init(client, initialize_result);

      expect(on_init).toHaveBeenCalledWith(client, initialize_result);
    });
  });

  describe("on_attach", () => {
    test("sets up commands", () => {
      setupLsp();

      const serverConfig = (tsserver.setup as jest.Mock).mock.calls[0][0];
      serverConfig.on_attach(client, bufnr);

      expect(setupCommands).toHaveBeenCalled();
    });

    test("wraps original on_attach when defined", () => {
      setupLsp({ server: { on_attach } });

      const serverConfig = (tsserver.setup as jest.Mock).mock.calls[0][0];
      serverConfig.on_attach(client, bufnr);

      expect(on_attach).toHaveBeenCalledWith(client, bufnr);
    });
  });
});
