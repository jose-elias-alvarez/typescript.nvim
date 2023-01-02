module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
  },
  parserOptions: {
    project: ["./tsconfig.lua.json", "./tsconfig.node.json"],
  },
};
