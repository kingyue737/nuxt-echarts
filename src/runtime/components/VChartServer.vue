<script setup lang="ts">
import { computed, unref, inject } from 'vue'
import type { InitOptions, Option, Theme } from '../types'
import { THEME_KEY, INIT_OPTIONS_KEY } from '../utils/injection'

const defaultTheme = inject(THEME_KEY, null)
const defaultInitOptions = inject(INIT_OPTIONS_KEY, null)

const props = defineProps<{
  option?: Option
  theme?: Theme
  initOptions?: InitOptions
}>()

const realTheme = computed(() => props.theme || unref(defaultTheme) || {})
const realInitOptions = computed(
  // @ts-expect-error unknown computed type error
  () => props.initOptions || unref(defaultInitOptions) || {},
)
</script>

<template>
  <VChartIsland
    :theme="realTheme"
    :option="option"
    :init-options="realInitOptions"
  />
</template>
