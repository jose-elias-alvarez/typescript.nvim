export interface ConfigOptions {
  disable_commands?: boolean;
  debug?: boolean;
  server?: NvimLsp.ServerOptions;
}

class Config implements ConfigOptions {
  disable_commands = false;
  debug = false;
  server: NvimLsp.ServerOptions = {};

  setup(userOpts: ConfigOptions): void {
    Object.assign(this, userOpts);
  }
}

export const config = new Config();

export const setupConfig = (userOpts: ConfigOptions): void => {
  config.setup(userOpts);
};
