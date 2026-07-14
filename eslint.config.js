import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/isnow/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { Intl: 'readonly', TextDecoder: 'readonly', TextEncoder: 'readonly', console: 'readonly' },
    },
    rules: {
      complexity: ['error', 7],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
