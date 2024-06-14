export default defineNuxtConfig({
  modules: ['../src/module', '@unocss/nuxt'],
  css: ['~/assets/style.css'],
  unocss: {
    preflight: true,
  },
  echarts: {
    ssr: true,
    renderer: ['canvas', 'svg'],
    charts: ['BarChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent'],
  },
  devtools: { enabled: true },
})
