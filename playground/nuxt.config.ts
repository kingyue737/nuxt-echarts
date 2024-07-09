export default defineNuxtConfig({
  modules: ['../src/module', '@unocss/nuxt'],
  css: ['~/assets/style.css'],
  unocss: { preflight: true },
  echarts: {
    ssr: true,
    renderer: ['canvas', 'svg'],
    charts: ['BarChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
    ],
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
