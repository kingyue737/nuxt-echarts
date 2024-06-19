<script setup lang="ts">
function random() {
  return Math.round(300 + Math.random() * 700) / 10
}

function getData(): ECOption {
  return {
    animation: false,
    tooltip: {
      className: 'echarts-tooltip',
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
</script>

<template>
  <NExample id="bar" title="Bar Chart" desc="SSR + client-side lazy loading">
    <VChart :option="option" />
    <template #extra>
      <NButton @click="refreshData">Refresh</NButton>
    </template>
  </NExample>
</template>
