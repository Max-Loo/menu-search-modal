module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue"
  ],
  customSyntax: 'postcss-html',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': 'always',
    'no-descending-specificity': null,
  },
}