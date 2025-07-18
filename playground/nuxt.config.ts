export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui', '@nuxthub/core'],
  css: ['~/assets/style.css'],
  echarts: {
    ssr: true,
    renderer: ['canvas', 'svg'],
    charts: ['BarChart', 'MapChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
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
  devtools: { enabled: false },
  // echarts-liquidfill is not ESM friendly
  build: { transpile: ['echarts-liquidfill'] },
  vite: {
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
  },
  compatibilityDate: '2024-07-09',
})
