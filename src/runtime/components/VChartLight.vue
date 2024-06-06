<script lang="ts">
import {
  hydrate,
  type ECSSRClientEventParams,
  type ECSSREvent,
} from 'echarts/ssr/client/index'
import type { InitOptions, Option, Theme } from '../types'
import { useAttrs, watch, nextTick, ref, onMounted, defineComponent } from 'vue'
import type VChartServer from './VChartServer.vue'

export default defineComponent({
  inheritAttrs: false,
  emits: {} as unknown as Record<ECSSREvent, ECSSRHandler>,
})
</script>

<script setup lang="ts">
const props = defineProps<{
  option?: Option
  theme?: Theme
  initOptions?: InitOptions
}>()
defineOptions({ inheritAttrs: false })

// defineEmits<{
//   (e: ECSSREvent, params: ECSSRClientEventParams): string | undefined
// }>()

type ECSSRHandler = (params: ECSSRClientEventParams) => string | undefined
type ECSSREventOn = `on${Capitalize<ECSSREvent>}`

const root = ref<HTMLElement | null>(null)
const attrs = useAttrs() as Partial<Record<ECSSREventOn, ECSSRHandler>>
let container: HTMLElement
function updateChart(svgStr?: string) {
  if (container) {
    if (svgStr != null) container.innerHTML = svgStr
    // Use the lightweight runtime to give the chart interactive capabilities
    hydrate(container, {
      on: {
        click: attrs.onClick
          ? (params) => {
              console.log('11')
              const svg = attrs.onClick!(params)
              svg && updateChart(svg)
            }
          : undefined,
        mouseout: attrs.onMouseout
          ? (params) => {
              const svg = attrs.onMouseout!(params)
              svg && updateChart(svg)
            }
          : undefined,
        mouseover: attrs.onMouseover
          ? (params) => {
              const svg = attrs.onMouseover!(params)
              svg && updateChart(svg)
            }
          : undefined,
      },
    })
  } else {
    console.warn('chart-container not found')
  }
}

watch(
  [() => props.option, () => props.initOptions, () => props.theme],
  async () => {
    await nextTick()
    updateChart()
  },
)
onMounted(async () => {
  await nextTick()
  container = root.value?.querySelector?.('.vue-echarts-inner') as HTMLElement
  updateChart()
  const observer = new MutationObserver(() => {
    console.log('jin')
    updateChart()
  })

  // call 'observe' on that MutationObserver instance,
  // passing it the element to observe, and the options object
  observer.observe(container, {
    characterData: false,
    childList: true,
    attributes: false,
  })
})

defineExpose({ updateChart })
</script>

<template>
  <div ref="root">
    <VChartServer :option="option" :init-options="initOptions" :theme="theme" />
  </div>
</template>
