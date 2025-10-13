import love from "eslint-config-love";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier";

// extends was removed from the new eslint 9 flat configs
export default [
  // flat and newer version of "standard-with-typescript"
  love,
  // flat equivalent to "plugin:@typescript-eslint/recommended"
  ...tseslint.configs.recommended,
  // flat equivalent to "plugin:prettier/recommended" -> breaks the linter
  // eslintPluginPrettierRecommended,
  // flat equivalent to "prettier"
  eslintConfigPrettier,
];
