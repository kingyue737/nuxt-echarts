<script setup lang="ts">
import { ref } from 'vue'

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
    <VChartFull :init-options="{ height: 300, width: 300 }" :option="option">
      <template #graphic>
        <GGroup>
          <GRect :x="10" :y="10" :width="50" :height="20" fill="#f00" />
        </GGroup>
      </template>
    </VChartFull>
    <div>{{ clicked }}</div>
  </div>
</template>
