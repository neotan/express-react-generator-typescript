module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: ['warn', 'never', { beforeStatementContinuationChars: 'always' }],
  },
}
