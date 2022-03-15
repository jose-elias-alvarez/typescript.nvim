const defaults: TypescriptNvim.Options = {
  disable_commands: false,
  disable_formatting: false,
  server: {},
};

export let options: TypescriptNvim.Options = { ...defaults };

export const setupConfig = (userOpts: TypescriptNvim.Options) => {
  options = { ...options, ...userOpts };
};
