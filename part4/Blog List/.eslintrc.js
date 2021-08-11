module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      2
    ],
    'linebreak-style': [
      'windows'
    ],
    'quotes': [
      'single',
      'backtick'
    ],
    'semi': [
      'never'
    ]
  }
}
