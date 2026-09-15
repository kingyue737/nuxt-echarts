import VChart from 'vue-echarts'
import '#build/echarts.mjs'
import { defineComponent, h, shallowRef, toRef } from 'vue'
import { METHOD_NAMES } from './method-names'

type VChartType = typeof VChart

export default defineComponent({
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const root = shallowRef<InstanceType<typeof VChart>>()

    const publicMethods = Object.fromEntries(
      METHOD_NAMES.map((name) => [
        name,
        (...args: any[]) => (root.value?.[name] as any)(...args),
      ]),
    )

    expose({
      ...publicMethods,
      root: toRef(() => root.value?.root),
      chart: toRef(() => root.value?.chart),
    })

    return () => h(VChart, { ...attrs, ref: root }, slots)
  },
}) as VChartType
