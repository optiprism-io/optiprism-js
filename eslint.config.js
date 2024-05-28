import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['src/server/', 'src/api/', 'src/tests/', '**/coverage/**'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Please use pattern "./*" for relative imports instead of "../*"',
            },
          ],
        },
      ],
    },
  }
)
