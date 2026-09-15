import NuxtECharts from '../../../src/module'

export default defineNuxtConfig({
  modules: [NuxtECharts],
  echarts: {
    renderer: 'svg',
    charts: ['PieChart'],
  },
})
