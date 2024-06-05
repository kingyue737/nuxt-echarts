<script setup lang="ts">
import { registerTheme } from 'echarts/core'
import theme from './theme.json'

registerTheme('ovilia-green', theme)

function random() {
  return Math.round(300 + Math.random() * 700) / 10
}

function getData(): ECOption {
  return {
    dataset: {
      dimensions: ['Product', '2015', '2016', '2017'],
      source: [
        {
          Product: 'Matcha Latte',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Milk Tea',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Cheese Cocoa',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Walnut Brownie',
          2015: random(),
          2016: random(),
          2017: random(),
        },
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  }
}

const loading = shallowRef(false)
const loadingOptions = {
  text: 'Loading…',
  color: '#4ea397',
  maskColor: 'rgba(255, 255, 255, 0.4)',
}
const option = shallowRef(getData())
function refreshData() {
  option.value = getData()
}
</script>

<template>
  <div style="width: 800px; height: 400px">
    <VChart
      :option="option"
      theme="ovilia-green"
      autoresize
      :loading="loading"
      :loading-options="loadingOptions"
    />
  </div>
  <div style="width: 800px; height: 400px">
    <VChartServer :option="option" />
  </div>
  <button @click="refreshData">Refresh</button>
</template>
