<script setup lang="ts">
const option = {
  series: [
    {
      type: 'pie',
      roseType: 'angle',
      data: [
        { value: 800, name: 'JIN' },
        { value: 735, name: 'Yue' },
      ],
    },
  ],
}
const clicked = ref(false)
</script>

<template>
  <div>
    <VChartLight :init-options="{ height: 300, width: 300 }" :option="option" />
    <div>{{ clicked }}</div>
  </div>
</template>
