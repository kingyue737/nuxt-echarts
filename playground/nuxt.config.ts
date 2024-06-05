export default defineNuxtConfig({
  modules: ['../src/module'],
  echarts: {
    ssr: true,
    renderer: 'svg',
    charts: ['BarChart'],
    components: ['DatasetComponent', 'GridComponent'],
  },
  devtools: { enabled: true },
})
