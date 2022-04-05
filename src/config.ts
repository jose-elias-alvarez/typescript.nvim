export interface ConfigOptions {
  disable_commands?: boolean;
  disable_formatting?: boolean;
  debug?: boolean;
  server?: NvimLsp.ServerOptions;
}

class Config implements ConfigOptions {
  disable_commands = false;
  disable_formatting = false;
  debug = false;
  server: NvimLsp.ServerOptions = {};

  setup(userOpts: ConfigOptions) {
    Object.assign(this, userOpts);
  }
}

export const config = new Config();

export const setupConfig = (userOpts: ConfigOptions) => {
  config.setup(userOpts);
};
