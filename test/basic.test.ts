import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    dev: true,
  })

  it('renders the SVG', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('</svg>')
  })

  it('resolves the graphic components as components', async () => {
    // The `G*` components are only usable in the `#graphic` slot when Nuxt knows
    // them as components: the components loader then rewrites the template into a
    // direct import. Registering them as plain auto-imports leaves a runtime
    // `_resolveComponent()` lookup behind, which silently renders nothing.
    const appModule = await $fetch('/_nuxt/app.vue')
    expect(appModule).not.toMatch(/_resolveComponent\(\s*['"]G[A-Z]/)
  })
})
