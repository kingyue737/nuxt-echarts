export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  css: ['~/assets/style.css'],
  echarts: {
    renderer: ['canvas', 'svg'],
    charts: ['LineChart', 'BarChart', 'MapChart', 'PieChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
      'LegendComponent',
      'GeoComponent',
      'VisualMapComponent',
    ],
  },
  colorMode: {
    preference: 'dark',
    storage: 'cookie',
  },
  ui: {
    fonts: false,
    theme: {
      transitions: false,
      colors: ['primary'],
    },
  },
  // `simple-icons`/`vscode-icons` are installed for the docs app; pnpm hoists them
  // to the workspace root, where `@nuxt/icon` discovers and inlines every installed
  // collection (~9 MB of JSON) into this app's server bundle.
  icon: {
    serverBundle: { collections: ['lucide'] },
  },
  devtools: { enabled: false },
  // echarts-liquidfill is not ESM friendly
  build: { transpile: ['echarts-liquidfill'] },
  vite: {
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
  },
  compatibilityDate: '2026-01-02',
  // Nitro 2.13 defaults to the impound-based `node-externals` plugin, which runs
  // every bare import through `exsolve.resolveModuleURL` (7 extensions × 2
  // suffixes × module dirs) plus `mlly.isValidNodeImport`. On Windows + pnpm's
  // symlinked store that is a multi-minute `stat` grind: with the default plugin
  // the server bundle never finished in 13+ minutes, with the legacy plugin it
  // takes ~35 s.
  nitro: {
    experimental: { legacyExternals: true },
  },
})
