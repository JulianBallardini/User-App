import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    languageOptions: {
      globals: {
        'describe': 'readonly',
        'it': 'readonly',
        'test': 'readonly',
        'expect': 'readonly',
        'beforeEach': 'readonly',
        'afterEach': 'readonly',
        'beforeAll': 'readonly',
        'afterAll': 'readonly',
        'vi': 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['src/test-setup.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off'
    },
    languageOptions: {
      globals: {
        'vi': 'readonly',
        'window': 'writable'
      }
    }
  },
  {
    files: ['src/main.ts'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.angular/**',
      '.vscode/**',
      '*.d.ts',
      'vite.config.js'
    ]
  }
];