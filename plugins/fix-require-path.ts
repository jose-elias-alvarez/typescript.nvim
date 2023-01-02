import ts from "typescript";
import * as tstl from "typescript-to-lua";

const LUA_PREFIX = "typescript";
const REQUIRE_PATH_REGEX = /require\("(.+)"\)/g;
const RAW_IMPORT_PATHS = ["lspconfig"]; // require paths that we don't want to transform

const plugin: tstl.Plugin = {
  beforeEmit(
    _program: ts.Program,
    _options: tstl.CompilerOptions,
    _emitHost: tstl.EmitHost,
    result: tstl.EmitFile[]
  ) {
    for (const file of result) {
      file.code = file.code.replaceAll(
        REQUIRE_PATH_REGEX,
        (match, path: unknown) => {
          if (typeof path !== "string" || RAW_IMPORT_PATHS.includes(path)) {
            return match;
          }

          return `require("${LUA_PREFIX}.${path}")`;
        }
      );
    }
  },
};

export default plugin;
