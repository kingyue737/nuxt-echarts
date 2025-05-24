import { watch, type Ref, type PropType } from 'vue'
import { throttle } from 'echarts/core'
import type { EChartsType } from '../types'

type AutoresizeProp =
  | boolean
  | {
      throttle?: number
      onResize?: ResizeObserverCallback
    }

export function useAutoresize(
  chart: Ref<EChartsType | undefined>,
  autoresize: Ref<AutoresizeProp | undefined>,
  root: Ref<HTMLElement | undefined>,
): void {
  watch(
    [root, chart, autoresize],
    ([root, chart, autoresize], _, onCleanup) => {
      let ro: ResizeObserver | null = null

      if (root && chart && autoresize) {
        const { offsetWidth, offsetHeight } = root
        const autoresizeOptions = autoresize === true ? {} : autoresize
        const { throttle: wait = 100, onResize } = autoresizeOptions

        let initialResizeTriggered = false

        const callback: ResizeObserverCallback = (entry, ob) => {
          chart.resize({ height: 'auto', width: 'auto' })
          onResize?.(entry, ob)
        }

        const resizeCallback = wait
          ? // @ts-expect-error callback can accept params
            throttle<ResizeObserverCallback>(callback, wait)
          : callback

        ro = new ResizeObserver((entry, observer) => {
          // We just skip ResizeObserver's initial resize callback if the
          // size has not changed since the chart is rendered.
          if (!initialResizeTriggered) {
            initialResizeTriggered = true
            if (
              root.offsetWidth === offsetWidth &&
              root.offsetHeight === offsetHeight
            ) {
              return
            }
          }

          // Skip if container has zero size
          if (root.offsetWidth === 0 || root.offsetHeight === 0) {
            return
          }

          resizeCallback(entry, observer)
        })
        ro.observe(root)
      }

      onCleanup(() => {
        if (ro) {
          ro.disconnect()
          ro = null
        }
      })
    },
  )
}

export const autoresizeProps = {
  autoresize: [Boolean, Object] as PropType<AutoresizeProp>,
}
