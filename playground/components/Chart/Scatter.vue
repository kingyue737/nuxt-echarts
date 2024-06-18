<script setup lang="ts">
import { hydrate } from 'echarts/ssr/client/index'

const defaultTheme = inject(THEME_KEY, null)
const defaultInitOptions = inject(INIT_OPTIONS_KEY, null)

const option = ref({
  legend: {
    selected: {
      '1990': true,
      '2015': true,
    },
  },
})

const body = computed(() => ({
  theme: toValue(defaultTheme),
  // @ts-expect-error unknown computed type error
  initOptions: toValue(defaultInitOptions),
  option: toValue(option),
}))

const container = ref<HTMLElement | null>(null)
const { data } = await useFetch('/api/scatter-chart', {
  body,
  method: 'POST',
})
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
  <NExample id="scatter" title="Scatter Chart" desc="">
    <div ref="container" v-html="data"></div>
    <template #extra> 1 </template>
  </NExample>
</template>
