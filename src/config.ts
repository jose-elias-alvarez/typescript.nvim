import { rootPattern } from "./path-utils";

const getTsserverCommand = (): string[] => {
  const executable = "typescript-language-server";
  const command = [executable, "--stdio"];
  if (vim.loop.os_uname().version.includes("Windows")) {
    command.unshift("cmd.exe", "/C");
  }
  return command;
};

export interface ConfigOptions {
  disable_commands?: boolean;
  debug?: boolean;
  server?: NvimLsp.ServerOptions;
  go_to_source_definition?: {
    fallback: boolean;
  };
}

class Config implements ConfigOptions {
  disable_commands = false;
  debug = false;
  server: NvimLsp.ServerOptions = {
    name: "tsserver",
    cmd: getTsserverCommand(),
    init_options: {
      hostInfo: "neovim",
    },
    root_dir: () =>
      rootPattern(["tsconfig.json"]) ??
      rootPattern(["package.json", "jsconfig.json", ".git"]),
  };

  go_to_source_definition = {
    fallback: true,
  };

  setup(userOpts: ConfigOptions): void {
    Object.assign(this, vim.tbl_deep_extend("force", this, userOpts));
  }
}

export const config = new Config();

export const setupConfig = (userOpts: ConfigOptions): void => {
  config.setup(userOpts);
};
