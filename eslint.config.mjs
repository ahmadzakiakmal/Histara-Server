import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: { globals: globals.node },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["warn", 2]
    }
  },
  pluginJs.configs.recommended,
];