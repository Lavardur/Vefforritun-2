import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Turn off base rule to avoid conflicts with TypeScript version
      "no-unused-vars": "off",
      // Configure TypeScript version with appropriate options
      "@typescript-eslint/no-unused-vars": [
        "warn", // Using "warn" instead of "error" to be less strict
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ]
    },
  },
];

export default eslintConfig;
