import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImports,
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-echarts',
    configKey: 'echarts',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    const entry = resolver.resolve('./runtime/VChart.ts')
    addComponent({
      name: 'VChart',
      filePath: entry,
    })

    const injectionKeys = [
      'THEME_KEY',
      'INIT_OPTIONS_KEY',
      'UPDATE_OPTIONS_KEY',
      'LOADING_OPTIONS_KEY',
    ]
    injectionKeys.forEach((name) => addImports({ name, from: entry }))
  },
})
