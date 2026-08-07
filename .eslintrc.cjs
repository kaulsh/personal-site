module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", "build", ".react-router", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
        allowExportNames: [
          "loader",
          "clientLoader",
          "action",
          "clientAction",
          "meta",
          "links",
          "headers",
          "handle",
          "shouldRevalidate",
          "ErrorBoundary",
          "HydrateFallback",
          "Layout",
        ],
      },
    ],
    "@typescript-eslint/no-explicit-any": ["warn"],
  },
};
