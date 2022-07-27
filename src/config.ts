export interface ConfigOptions {
  disable_commands?: boolean;
  debug?: boolean;
  server?: NvimLsp.ServerOptions;
}

class Config implements ConfigOptions {
  disable_commands = false;
  debug = false;
  server: NvimLsp.ServerOptions = { init_options: { hostInfo: "neovim" } };

  setup(userOpts: ConfigOptions) {
    Object.assign(this, userOpts);
  }
}

export const config = new Config();

export const setupConfig = (userOpts: ConfigOptions) => {
  config.setup(userOpts);
};
