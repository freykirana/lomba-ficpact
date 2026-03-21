const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['node_modules/', '.next/', 'out/', 'dist/'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];