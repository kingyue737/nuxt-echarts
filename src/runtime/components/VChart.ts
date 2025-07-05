import VChart from 'vue-echarts/csp'
import '#build/echarts.mjs'
import { defineComponent, h, ref } from 'vue'

type VChartType = typeof VChart

export default defineComponent({
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    const vChartRef = ref<InstanceType<typeof VChart> | null>(null)

    function setOption(option: any) {
      vChartRef.value?.setOption(option)
    }

    expose({ setOption })

    return () => h(VChart, { ...attrs, ref: vChartRef }, slots)
  },
}) as VChartType
