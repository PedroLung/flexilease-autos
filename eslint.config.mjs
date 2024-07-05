import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { rules } from "eslint-config-prettier";

export default [
  { files: ["**/*.ts"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  { rules: { "@typescript-eslint/no-explicit-any": 0 } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
