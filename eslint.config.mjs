import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
    globalIgnores(["**/schemas/", "dashboard/", "graphics/", "extension/", "scripts/"]),
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    { rules: { "react/no-unescaped-entities": 0 }}
]);