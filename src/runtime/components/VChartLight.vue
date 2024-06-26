<script lang="ts">
import {
  hydrate,
  type ECSSRClientEventParams,
  type ECSSREvent,
} from 'echarts/ssr/client/index'
import type { InitOptions, Option, Theme } from '../types'
import {
  useAttrs,
  nextTick,
  ref,
  onMounted,
  defineComponent,
  type PropType,
} from 'vue'
import type VChartServer from './VChartServer.vue'

type ECSSRHandler = (params: ECSSRClientEventParams) => string | undefined
type ECSSREventOn = `on${Capitalize<ECSSREvent>}`

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: Object as PropType<Option>,
    theme: {
      type: [Object, String] as PropType<Theme>,
    },
    initOptions: Object as PropType<InitOptions>,
  },
  emits: {} as unknown as Record<ECSSREvent, ECSSRHandler>,
  setup() {
    const root = ref<InstanceType<typeof VChartServer> | null>(null)
    const attrs = useAttrs() as Partial<Record<ECSSREventOn, ECSSRHandler>>
    let container: HTMLElement
    function hydrateChart() {
      container = root.value?.$el
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
      observer.observe(root.value!.$el, {
        characterData: false,
        childList: true,
        attributes: false,
      })
    })

    return { root }
  },
})
</script>

<template>
  <VChartServer
    ref="root"
    :option="option"
    :init-options="initOptions"
    :theme="theme"
  />
</template>
