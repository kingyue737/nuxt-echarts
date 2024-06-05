export default defineNuxtConfig({
  modules: ['../src/module'],
  echarts: {
    charts: ['BarChart'],
    components: ['DatasetComponent', 'GridComponent'],
  },
  devtools: { enabled: true },
})
