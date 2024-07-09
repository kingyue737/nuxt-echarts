<script setup lang="ts">
import type { VChart } from '#components'
const chart = ref<InstanceType<typeof VChart> | null>(null)

function random() {
  return Math.round(300 + Math.random() * 700) / 10
}

function getData(): ECOption {
  return {
    animation: false,
    tooltip: {
      className: 'echarts-tooltip',
    },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
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
    itemStyle: { borderRadius: 3 },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  }
}

const option = shallowRef(getData())
function refreshData() {
  option.value = getData()
}

function hideToolbox() {
  chart.value?.setOption({ toolbox: { show: false } })
}
function showToolbox() {
  chart.value?.setOption({ toolbox: { show: true } })
}
</script>

<template>
  <NExample id="bar" title="Bar Chart" desc="SSR + client-side lazy loading">
    <VChart
      ref="chart"
      :option="option"
      @native:mouseenter="showToolbox()"
      @globalout="hideToolbox()"
    />
    <template #extra>
      <NButton @click="refreshData">Refresh</NButton>
    </template>
  </NExample>
</template>
