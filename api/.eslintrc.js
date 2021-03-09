/* eslint-disable */

module.exports = {
  plugins: ['functional', 'disable'],
  processor: 'disable/disable',
  extends: [
    'standard-with-typescript',
    'plugin:functional/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  overrides: [{
    files: ['spec/**/*.spec.ts'],
    settings: {
      'disable/plugins': ['functional']
    }
  }]
}
