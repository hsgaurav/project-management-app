const config = {
	settings: {
		"import/resolver": {
			node: {
				paths: ["src"],
			},
		},
	},
	extends: [
		"next/core-web-vitals",
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	plugins: [
		"@tanstack/eslint-plugin-query",
		"no-smart-quotes",
		"no-relative-import-paths",
	],
	rules: {
		"@typescript-eslint/no-namespace": "off",
		"react/no-array-index-key": "warn",
		"no-relative-import-paths/no-relative-import-paths": [
			"error",
			{ allowSameFolder: true, rootDir: "src", prefix: "@" },
		],
		"react/prefer-read-only-props": "warn",
		"prettier/prettier": [
			"error",
			{
				semi: true,
				singleQuote: false,
				tabWidth: 2,
				trailingComma: "all",
				useTabs: true,
				endOfLine: "auto",
				// Disable Tailwind class ordering
				tailwindConfig: false,
			},
			{
				usePrettierrc: false,
			},
		],
	},
	overrides: [
		{
			files: ["src/server/**/*.ts"],
			rules: {
				"@typescript-eslint/no-explicit-any": "off",
			},
		},
	],
};

module.exports = config; 