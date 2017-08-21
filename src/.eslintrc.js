module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  rules: {
    'semi': ['error', 'always'],
    'comma-dangle': 'error',
    'arrow-parens': 'off',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }]
  }
};
