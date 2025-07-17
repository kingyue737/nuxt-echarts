<script setup lang="ts">
import type { ECSSRClientEventParams } from 'echarts/ssr/client/index'

const option = ref({
  legend: {
    top: '5%',
    left: 'center',
    selected: {
      'Search Engine': true,
      Direct: true,
      Email: true,
      'Union Ads': true,
      'Video Ads': true,
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '70%'],
      roseType: 'angle',
      itemStyle: {
        borderRadius: [20, 5, 5, 10],
      },
      label: {
        show: false,
      },
      data: [
        { value: 800, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 400, name: 'Video Ads' },
      ],
    },
  ],
})

function onClick(params: ECSSRClientEventParams) {
  if (params.ssrType === 'legend') {
    const key = Object.keys(option.value.legend.selected)[
      params.dataIndex!
    ] as keyof typeof option.value.legend.selected
    option.value.legend.selected[key] = !option.value.legend.selected[key]
  }
}
</script>

<template>
  <NExample
    id="pie"
    title="Pie Chart"
    desc="SSR + client-side lightweight runtime"
  >
    <VChartLight :option="option" @click="onClick" />
    <template #extra>Click on a legend to toggle series display</template>
  </NExample>
</template>
