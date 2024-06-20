<script lang="ts">
import {
  hydrate,
  type ECSSRClientEventParams,
  type ECSSREvent,
} from 'echarts/ssr/client/index'
import type { InitOptions, Option, Theme } from '../types'
import { useAttrs, nextTick, ref, onMounted, defineComponent } from 'vue'
import type VChartServer from './VChartServer.vue'

export default defineComponent({
  inheritAttrs: false,
  emits: {} as unknown as Record<ECSSREvent, ECSSRHandler>,
})
</script>

<script setup lang="ts">
defineProps<{
  option?: Option
  theme?: Theme
  initOptions?: InitOptions
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
        click: attrs.onClick,
        mouseout: attrs.onMouseout,
        mouseover: attrs.onMouseover,
      },
    })
  }
}

let observer: MutationObserver
onMounted(async () => {
  await nextTick()
  hydrateChart()
  observer = new MutationObserver(async () => {
    hydrateChart()
  })

  // call 'observe' on that MutationObserver instance,
  // passing it the element to observe, and the options object
  observer.observe(root.value!.querySelector('.vue-echarts-server')!, {
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
