module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  ignorePatterns: ["reportWebVitals.ts", "react-app-env.d.ts"],
  rules: {
    semi: ["error", "always"],
    "@typescript-eslint/semi": ["off"],
    "no-unused-vars": ["warn"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/quotes": ["off"],
    "@typescript-eslint/comma-dangle": ["off"],
    "@typescript-eslint/space-before-function-paren": ["off"],
    "@typescript-eslint/object-curly-spacing": ["off"],
    "@typescript-eslint/no-misused-promises": ["off"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "@typescript-eslint/consistent-type-definitions": ["off"],
    "@typescript-eslint/member-delimiter-style": ["off"],
    "@typescript-eslint/promise-function-async": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["warn"],
    "@typescript-eslint/indent": ["off"],
    "react/prop-types": ["off"],
    "@typescript-eslint/ban-types": ["off"],
    "@typescript-eslint/block-spacing": ["off"],
  },
  globals: {
    JSX: true,
    test: true,
    expect: true,
    React: true,
  },
};
