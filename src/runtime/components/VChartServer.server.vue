<script setup lang="ts">
import * as echarts from 'echarts'
import { ref } from 'vue'
import { defu } from 'defu'
import type { Option, InitOptions } from '../types'

const props = defineProps<{ option: Option; initOption?: InitOptions }>()

const svgStr = ref('')

const initOption: InitOptions = defu(
  { renderer: 'svg', ssr: true },
  props.initOption,
  {
    width: 400,
    height: 300,
  },
)
let chart = echarts.init(null, null, initOption)

chart.setOption(props.option)
svgStr.value = chart.renderToSVGString()

chart.dispose()

// @ts-expect-error release memory
chart = null
</script>

<template>
  <div class="vue-echarts-container">
    <!--eslint-disable-next-line vue/no-v-html-->
    <div class="vue-echarts-inner" v-html="svgStr" />
  </div>
</template>
