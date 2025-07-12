// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**/*', 'gulpfile.mjs', 'rollup.config.mjs', 'eslint.config.mjs'],
  },
);
