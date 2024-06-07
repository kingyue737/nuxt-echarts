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
  innerHTML?: string
}>()
defineOptions({ inheritAttrs: false })

type ECSSRHandler = (params: ECSSRClientEventParams) => string | undefined
type ECSSREventOn = `on${Capitalize<ECSSREvent>}`

const root = ref<HTMLElement | null>(null)
const attrs = useAttrs() as Partial<Record<ECSSREventOn, ECSSRHandler>>
let container: HTMLElement
function hydrateChart() {
  container = root.value?.querySelector?.('.vue-echarts-inner') as HTMLElement
  if (container) {
    // Use the lightweight runtime to give the chart interactive capabilities
    hydrate(container, {
      on: {
        click: attrs.onClick
          ? (params) => {
              const svg = attrs.onClick!(params)
              svg && setInnerHTML(svg)
            }
          : undefined,
        mouseout: attrs.onMouseout
          ? (params) => {
              const svg = attrs.onMouseout!(params)
              svg && setInnerHTML(svg)
            }
          : undefined,
        mouseover: attrs.onMouseover
          ? (params) => {
              const svg = attrs.onMouseover!(params)
              svg && setInnerHTML(svg)
            }
          : undefined,
      },
    })
  }
}

function setInnerHTML(svgStr?: string) {
  if (container && svgStr) container.innerHTML = svgStr
}

watch(() => props.innerHTML, setInnerHTML)

let observer: MutationObserver
onMounted(async () => {
  await nextTick()
  hydrateChart()
  observer = new MutationObserver(async () => {
    hydrateChart()
  })

  // call 'observe' on that MutationObserver instance,
  // passing it the element to observe, and the options object
  observer.observe(root.value!, {
    characterData: false,
    childList: true,
    attributes: false,
  })
})
</script>

<template>
  <div ref="root">
    <VChartServer :option="option" :init-options="initOptions" :theme="theme" />
  </div>
</template>
