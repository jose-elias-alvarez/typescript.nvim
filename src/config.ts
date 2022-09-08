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
  server: NvimLsp.ServerOptions = {};

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
