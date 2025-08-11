<script setup lang="ts">
import { computed, inject, ref, toValue } from 'vue'
import type { InitOptions, Option, Theme } from '../types'
import { THEME_KEY, INIT_OPTIONS_KEY } from 'vue-echarts'
import type { VChartIsland } from '#components'

const defaultTheme = inject(THEME_KEY, null)
const defaultInitOptions = inject(INIT_OPTIONS_KEY, null)

const props = defineProps<{
  option?: Option
  theme?: Theme
  initOptions?: InitOptions
}>()
const emits = defineEmits<{ (event: 'error', error: unknown): void }>()

const realTheme = computed(() => props.theme || toValue(defaultTheme) || {})
const realInitOptions = computed(
  () => props.initOptions || toValue(defaultInitOptions) || {},
)
function onError(e: unknown) {
  // https://github.com/nuxt/nuxt/issues/27491
  if (
    e instanceof TypeError &&
    e.message === "Cannot read properties of undefined (reading 'link')"
  ) {
    root.value?.refresh()
  }
  emits('error', e)
}
const root = ref<InstanceType<typeof VChartIsland> | null>(null)
</script>

<template>
  <div class="vue-echarts-server">
    <VChartIsland
      ref="root"
      :theme="realTheme"
      :option="option"
      :init-options="realInitOptions"
      @error="onError"
    >
      <template #fallback>
        <slot name="fallback" />
      </template>
    </VChartIsland>
  </div>
</template>
