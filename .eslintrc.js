module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/recommended", // Add TypeScript recommended rules
  ],
  parser: "@typescript-eslint/parser", // Specify TypeScript parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json", // Specify the path to your tsconfig.json file
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {}, // Tell ESLint to use the TypeScript resolver
    },
  },
  plugins: ["react", "no-only-tests", "@typescript-eslint"], // Add TypeScript plugin
  rules: {
    "no-only-tests/no-only-tests": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit module boundary types for functions
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Apply TypeScript rules to TypeScript files
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off", // Adjust as needed
      },
    },
  ],
};
