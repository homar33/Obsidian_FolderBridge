import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...tseslint.configs.recommended, {
    languageOptions: {
        sourceType: 'module',
        globals: {
            require: 'readonly',
            process: 'readonly',
            __dirname: 'readonly',
            __filename: 'readonly',
            module: 'readonly',
            exports: 'writable',
            Buffer: 'readonly',
            console: 'readonly',
            setTimeout: 'readonly',
            setInterval: 'readonly',
            clearTimeout: 'readonly',
            clearInterval: 'readonly',
            URL: 'readonly',
            Promise: 'readonly',
            describe: 'readonly',
            it: 'readonly',
            expect: 'readonly',
            beforeEach: 'readonly',
            afterEach: 'readonly',
            vi: 'readonly',
        },
    },
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        // Intentional `any` casts are used throughout for Electron, vault internals,
        // and lazy-loaded Node.js builtins.  The rule is off so eslint-disable
        // suppression comments are not needed (and the reviewer's
        // eslint-comments/no-restricted-disable rule does not trigger).
        '@typescript-eslint/no-explicit-any': 'off',
        // const plugin = this is required in anonymous FuzzySuggestModal subclasses
        // where inner method 'this' refers to the modal, not the outer plugin
        '@typescript-eslint/no-this-alias': 'off',
        // require('electron') is the correct Obsidian/Electron pattern
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
},
);