// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
  },
  dirs: {
    src: ['./playground', './docs'],
  },
}).append(
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': ['error', { html: { void: 'any' } }], // not conflict with prettier
    },
  },
  {
    files: ['docs/app/**'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
