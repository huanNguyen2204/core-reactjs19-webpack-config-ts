import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([{
	extends: fixupConfigRules(compat.extends(
		"eslint:recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"react-app",
		"react-app/jest",
		"prettier",
	)),

	plugins: {
		"@stylistic": stylistic
	},

	files: [
		"**/*.js",
		"**/*.jsx",
		"**/*.ts",
		"**/*.tsx", 
		"**/*.mjs",
		"**/*.cjs"
	],

	languageOptions: {
		parser: tsParser,
		ecmaVersion: "latest",
		sourceType: "module",
	},

	settings: {
		react: {
			version: "detect",
		},
	},

	rules: {
		// Stylistic rules
		"@stylistic/semi": ["error", "always"],
		"@stylistic/quotes": ["error", "double"],

		// Old version of eslint + typescript-eslint
		"arrow-body-style": ["error", "always"],
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"prefer-arrow-callback": ["error", { allowNamedFunctions: false }], // Disallow arrow functions as callbacks
    // "no-restricted-syntax": [
    //   'error',
    //   {
    //     selector: 'ArrowFunctionExpression',
    //     message: 'Arrow functions are not allowed. Use regular functions instead.',
    //   },
    // ],

		"no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "caughtErrors": "all",
            "ignoreRestSiblings": false,
            "reportUsedIgnorePattern": false
        }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }, // Ignore variables prefixed with "_"
    ],
	},
}]);