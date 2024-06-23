import { watch, type Ref, type PropType } from 'vue'
import { throttle } from 'echarts/core'
import { type EChartsType } from '../types'

type AutoresizeProp =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

export function useAutoresize(
  chart: Ref<EChartsType | undefined>,
  autoresize: Ref<AutoresizeProp | undefined>,
  root: Ref<HTMLElement | undefined>,
): void {
  let observer: ResizeObserver | undefined

  watch([root, chart, autoresize], ([root, chart, autoresize], _, cleanup) => {
    if (root && chart && autoresize) {
      const autoresizeOptions = autoresize === true ? {} : autoresize
      const { throttle: wait = 100, onResize } = autoresizeOptions

      const callback = () => {
        chart.resize({width:'auto',height:'auto'})
        onResize?.()
      }

      observer = new ResizeObserver(wait ? throttle(callback, wait) : callback)
      observer.observe(root)
    }

    cleanup(() => {
      if (root && observer) {
        observer.disconnect()
        observer = undefined
      }
    })
  })
}

export const autoresizeProps = {
  autoresize: [Boolean, Object] as PropType<AutoresizeProp>,
}
