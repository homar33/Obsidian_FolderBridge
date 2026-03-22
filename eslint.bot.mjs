/**
 * Bot-equivalent ESLint config for local pre-flight checks.
 *
 * This mirrors obsidianmd.configs.recommended as used by the PR review bot:
 *   - Default brands and acronyms only (no project-specific additions)
 *   - sentence-case as "error" with enforceCamelCaseLower: true
 *
 * Usage:
 *   npx eslint --config eslint.bot.mjs main.ts 'src/**\/*.ts'
 *
 * Filter to sentence-case only:
 *   npx eslint --config eslint.bot.mjs main.ts 'src/**\/*.ts' 2>&1 | grep "sentence-case"
 */
import obsidianmd from 'eslint-plugin-obsidianmd';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    ...obsidianmd.configs.recommended, {
        // Enable type-aware linting (required by recommendedTypeChecked for .ts files).
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        // Suppress rules unrelated to sentence-case.
        rules: {
            'no-undef': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-deprecated': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            'import/no-nodejs-modules': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@microsoft/sdl/no-document-write': 'off',
            '@microsoft/sdl/no-inner-html': 'off',
            'no-console': 'off',
            'obsidianmd/validate-manifest': 'off',
            'obsidianmd/validate-license': 'off',
            'obsidianmd/sample-names': 'off',
            'obsidianmd/no-sample-code': 'off',
            'obsidianmd/hardcoded-config-path': 'off',
        },
    }
);
