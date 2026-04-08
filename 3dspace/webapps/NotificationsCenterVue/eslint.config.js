import antfu from '@antfu/eslint-config';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export default antfu({
  plugins: {
    'no-relative-import-paths': noRelativeImportPaths,
  },
  vue: {
    // https://eslint.vuejs.org/rules/
    overrides: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      }],
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style', 'route'],
      }],
    },
  },
  stylistic: {
    overrides: {
      'import/order': ['error', {
        'alphabetize': { order: 'asc', orderImportKind: 'asc' },
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: `~/mocks/**`,
            group: 'internal',
            position: 'after',
          },
          ...[
            // first global
            'apps',
            'config',
            'router',
            'context',
            'services',
            'entities',

            // then features
            'features-swym',
            'features-shared',
            'features-generic',

            // last typings
            'interfaces',
            'typings',
          ].map(el => ({
            pattern: `~/${el}/**`,
            group: 'internal',
            position: 'after',
          })),
        ],
        'distinctGroup': true,
      }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'func-call-spacing': ['error', 'never'],
      'function-paren-newline': ['error', 'multiline-arguments'],
      'max-len': ['warn', {
        code: 120,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignorePattern: '^import\\s.+\\sfrom\\s.+\'$',
      }],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    },
  },
  javascript: {
    overrides: {
      'complexity': ['error', 10],
      'max-params': ['error', 4],
      'max-statements': ['error', 15],
      'max-nested-callbacks': ['error', 2],
      'max-depth': ['error', { max: 3 }],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'no-warning-comments': 'warn',
      'unused-imports/no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false, rootDir: 'src', prefix: '~' },
      ],
    },
  },
}, [
  {
    ignores: [
      '*.config.js', // Ignores vite.config.js, eslint.config.js, etc.
      'dist/**',
      'node_modules/**',
      'public/**',
    ],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx,vue}'],
    rules: {
      'indent': 'off',
      'max-lines': 'off',
      'max-depth': 'off',
      'complexity': 'off',
      'no-console': 'off',
      'max-statements': 'off',
      'node/prefer-global/process': 'off',
      'no-warning-comments': 'off',
      'max-nested-callbacks': 'off',
      'style/semi': ['error', 'always'],
      'max-len': [
        'error', // or "off" to disable completely
        {
          code: 120,
          ignoreUrls: true, // ignore long URLs
          ignoreComments: true,
        },
      ],
    },
  },
  {
    files: ['unitTests/**/*'],
    rules: {
      'max-len': 'off',
      'max-statements': 'off',
      'max-depth': 'off',
      'no-relative-import-paths/no-relative-import-paths': 'off',
    },
  },
  {
    files: ['**/*.json', 'src/**/*.md'],
    rules: {
      'max-lines': 'off',
      'max-len': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-undef': 'error',
      'vue/require-toggle-inside-transition': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
      }],
      '@stylistic/jsx/self-closing-comp': 'off',
    },
  },
]);
