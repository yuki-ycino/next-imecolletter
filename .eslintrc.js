module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"]
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  },
  rules: {
    "no-console": "off",

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/camelcase": ["error", { properties: "always", ignoreDestructuring: false }],
    "@typescript-eslint/array-type": ["error", "generic"],
    "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",

    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": ["error", { tryExtensions: [".js", ".ts", ".tsx"] }],

    "prettier/prettier": "error",
    "react/prop-types": "off"
  }
}
