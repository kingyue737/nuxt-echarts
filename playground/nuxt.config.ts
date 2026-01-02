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
  devtools: { enabled: false },
  // echarts-liquidfill is not ESM friendly
  build: { transpile: ['echarts-liquidfill'] },
  vite: {
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
  },
  compatibilityDate: '2025-07-09',
})
