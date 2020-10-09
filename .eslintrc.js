module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', { 'allowTemplateLiterals': true }],
        semi: ['error', 'always']
    }
};
