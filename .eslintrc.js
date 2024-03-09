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
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      // Tells ESLint to use the TypeScript resolver
      typescript: {}, // No need for any specific configuration options
    },
  },
  plugins: ["react", "no-only-tests"],
  rules: { "no-only-tests/no-only-tests": "error" },
};
