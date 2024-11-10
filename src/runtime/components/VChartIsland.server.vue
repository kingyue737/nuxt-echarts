<script setup lang="ts">
import * as echarts from 'echarts'
import '#build/echarts.mjs'
import { ref } from 'vue'
import type { Option, InitOptions, Theme } from '../types'

const props = defineProps<{
  option?: Option
  initOptions?: InitOptions
  theme?: Theme
}>()

const svgStr = ref('')
const initOptions: InitOptions = echarts.util.merge(
  { renderer: 'svg', ssr: true } satisfies InitOptions,
  props.initOptions || {},
)
const chart = echarts.init(null, props.theme, initOptions)
chart.setOption(props.option || {})
svgStr.value = chart.renderToSVGString()

chart.dispose()

defineSlots<{ fallback: any }>()
</script>

<template>
  <div class="vue-echarts-container">
    <!--eslint-disable-next-line vue/no-v-html-->
    <div class="vue-echarts-inner" v-html="svgStr" />
  </div>
</template>
