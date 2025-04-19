import { eslintrc } from '@eslint/eslintrc';
import nextPlugin from 'eslint-config-next';

const { FlatCompat } = eslintrc;
const compat = new FlatCompat({
  baseDirectory: new URL('.', import.meta.url).pathname,
  recommendedConfig: nextPlugin.configs.recommended,
});

export default [
  ...compat.config(nextPlugin),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];
