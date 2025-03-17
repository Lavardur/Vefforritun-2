import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Base configuration
    extends: [
      'eslint:recommended',
      ...tseslint.configs.recommended,
    ],
    
    // Files to lint
    files: ['**/*.ts'],
    
    // Files to ignore
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.github/**',
      'prisma/**',
    ],
    
    // Environment settings
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    
    // Custom rules
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);