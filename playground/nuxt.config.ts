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
  compatibilityDate: '2026-09-02',
})
