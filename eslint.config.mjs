// @ts-check

import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["node_modules", ".vinxi", ".output"] },
  eslintConfigPrettier,
);
