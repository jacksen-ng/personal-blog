import nextConfig from 'eslint-config-next';

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  nextConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default config;
