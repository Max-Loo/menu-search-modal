module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
    '@typescript-eslint',
  ],
  'overrides': [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
  ignorePatterns: [
    'lib/*',
    'dist/*',
    'node_modules/*',
  ],
  'rules': {
    /**
     * https://eslint.org/docs/rules/
     * "off" or 0 - turn the rule off
     * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
     * "error" or 2 - turn the rule on as an error (exit code will be 1)
     */
    'eol-last': ['warn', 'always'],
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'eqeqeq': ['warn', 'smart'],
    'linebreak-style': [2, 'unix'],
    'space-before-function-paren': ['warn', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['warn'],
    'comma-style': ['warn', 'last'],
    'array-bracket-newline': ['warn', 'consistent'],
    'array-bracket-spacing': ['warn', 'never'],
    'array-element-newline': ['warn', 'consistent'],
    'object-curly-newline': ['warn', { consistent: true }],
    'object-curly-spacing': ['warn', 'always'],
    'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'computed-property-spacing': ['warn', 'never'],
    'func-call-spacing': ['warn', 'never'],
    'operator-linebreak': ['warn', 'before'],
    'space-in-parens': ['warn', 'never'],
    'camelcase': ['warn', { properties: 'always', ignoreDestructuring: true, ignoreImports: true }],
    'no-var': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-trailing-spaces': ['warn'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-use-before-define': ['error', { 'functions': false, 'classes': false, 'variables': true }],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'key-spacing': ['warn', { 'afterColon': true }],
    'rest-spread-spacing': ['warn', 'never'],
    'space-infix-ops': ['warn', { 'int32Hint': false }],
    'no-multi-spaces': ['warn', {}],
    'keyword-spacing': ['warn'],
    'spaced-comment': ['warn', 'always', { exceptions: ['-', '+'], markers: ['/'] }],
    'semi-spacing': ['warn'],
    'space-before-blocks': ['warn', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    /**
     * https://eslint.vuejs.org/rules
     */
    // 'vue/no-deprecated-html-element-is': ['error'],
    // 'vue/no-deprecated-filter': ['error'],
    // 'vue/no-deprecated-inline-template': ['error'],
    // 'vue/no-deprecated-functional-template': ['error'],
    // 'vue/no-deprecated-props-default-this': ['error'],
    // 'vue/no-deprecated-data-object-declaration': ['error'],
    'vue/no-deprecated-scope-attribute': ['error'],
    'vue/no-deprecated-slot-attribute': ['error'],
    'vue/no-deprecated-slot-scope-attribute': ['error'],
    'vue/max-len': ['warn', {
      template: 135,
      code: 120,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
    }],
    'vue/max-attributes-per-line': ['warn', { singleline: 7 }],
    'vue/name-property-casing': ['warn', 'PascalCase'],
    'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/arrow-spacing': ['warn', { before: true, after: true }],
    'vue/block-spacing': ['warn', 'always'],
    'vue/space-infix-ops': ['warn', { 'int32Hint': false }],
    'vue/object-curly-spacing': ['warn', 'always'],
    'vue/no-multi-spaces': ['warn', {}],
    'vue/keyword-spacing': ['warn'],
    'vue/html-self-closing': ['warn', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    '@typescript-eslint/no-duplicate-imports': ['off'],
    '@typescript-eslint/semi': ['warn', 'never'],
  },
  globals: {
    'defineProps': 'readonly',
    'defineEmits': 'readonly',
    'defineExpose': 'readonly',
    'withDefaults': 'readonly',
  },
}
