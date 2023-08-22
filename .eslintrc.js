export default {
    'env': {
        'node': true,
        'commonjs': false,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error', 4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'comma-dangle': ['error', 'never']
    }
}
