<script setup lang="ts">
const data = []

for (let i = 0; i <= 360; i++) {
  const t = (i / 180) * Math.PI
  const r = Math.sin(2 * t) * Math.cos(2 * t)
  data.push([r, i])
}

const option = {
  backgroundColor: 'transparent',
  polar: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  angleAxis: {
    type: 'value',
    startAngle: 0,
  },
  radiusAxis: {
    min: 0,
  },
  series: [
    {
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: false,
      data: data,
    },
  ],
}
</script>

<template>
  <NExample
    id="polar"
    title="Polar Chart"
    desc="one-time server-side SVG rendering"
  >
    <VChartServer :option="option" />
  </NExample>
</template>
