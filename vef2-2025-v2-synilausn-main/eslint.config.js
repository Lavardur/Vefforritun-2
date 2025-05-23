import pluginJs from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ...pluginJs.configs.recommended,
    rules: {
      // Disallow console.log, see lib/logger
      'no-console': ['error'],
    },
  },
];
