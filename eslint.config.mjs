import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          bracketSpacing: true,
          tabWidth: 2,
          printWidth: 80,
          useTabs: false,
          trailingComma: 'es5',
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
        },
      ],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'max-lines-per-function': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/require-default-props': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_*$',
          argsIgnorePattern: '^_*$',
          destructuredArrayIgnorePattern: '^_*$',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'block-spacing': 1,
    },
  },
];

export default eslintConfig;
