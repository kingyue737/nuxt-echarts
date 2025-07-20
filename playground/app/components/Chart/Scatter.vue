<script setup lang="ts">
import { hydrate } from 'echarts/ssr/client/index'

const defaultTheme = inject(THEME_KEY, null)
const defaultInitOptions = inject(INIT_OPTIONS_KEY, null)

const option = ref({
  backgroundColor: 'transparent',
  legend: {
    selected: {
      '1990': true,
      '2015': true,
    },
  },
})

const body = computed(() => ({
  theme: toValue(defaultTheme),
  initOptions: toValue(defaultInitOptions),
  option: toValue(option),
}))

const container = useTemplateRef('container')
const { data } = await useFetch('/api/scatter-chart', { body, method: 'POST' })
watch(data, async () => {
  await nextTick()
  hydrateChart()
})
function hydrateChart() {
  if (container.value) {
    hydrate(container.value, {
      on: {
        click: (params) => {
          if (params.ssrType === 'legend') {
            const key = Object.keys(option.value.legend.selected)[
              params.dataIndex!
            ] as keyof typeof option.value.legend.selected
            option.value.legend.selected[key] =
              !option.value.legend.selected[key]
          }
        },
      },
    })
  }
}

onMounted(() => {
  hydrateChart()
})
</script>

<template>
  <NExample
    id="scatter"
    title="Scatter Chart"
    desc="SSR via Nitro server route"
  >
    <!--eslint-disable-next-line vue/no-v-html-->
    <div ref="container" v-html="data" />
    <template #extra>
      Click on a legend to toggle series display.<br />
      This example shows how to implement a server-rendered ECharts with
      lightweight client runtime via server route without the components
      provided by this module.
    </template>
  </NExample>
</template>
