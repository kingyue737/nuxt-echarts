<script setup lang="ts">
import { registerTheme } from 'echarts/core'
import greenTheme from './theme.json'
import type { InitOptions } from '../src/runtime/types'

registerTheme('ovilia-green', greenTheme)
const theme = ref('dark')
const isDark = computed(() => theme.value === 'dark')
useHead({
  htmlAttrs: { class: { dark: isDark } },
  title: 'Nuxt ECharts: Nuxt Module for Apache ECharts™',
})
provide(THEME_KEY, theme)
const initOptions = computed<InitOptions>(() => ({
  height: 310,
  width: 650,
  renderer: renderer.value,
}))
provide(INIT_OPTIONS_KEY, initOptions)

const rendererOptions = [
  { value: 'canvas', label: 'Canvas' },
  { value: 'svg', label: 'SVG' },
]
const renderer = ref<'canvas' | 'svg'>('canvas')

const themeOptions = [
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'ovilia-green',
    label: 'Ovilia Green',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
]
</script>

<template>
  <aside class="fixed p-3">
    <!-- <span>Theme</span> -->
    <NSelectTabs v-model="theme" :options="themeOptions" class="mr-2" />
    <!-- <span>Renderer</span> -->
    <NSelectTabs v-model="renderer" :options="rendererOptions" />
  </aside>

  <div class="grid gap-y-4 justify-center py-15 text-align-center">
    <header>
      <!-- <EChartsLogo class="mx-auto fill-green-5 dark:fill-brand" /> -->
      <ChartLogo class="!inline-flex !w-fit !h-fit" />

      <h1>
        <NuxtLink to="https://github.com/kingyue737/nuxt-echarts"
          >Nuxt ECharts</NuxtLink
        >
      </h1>
      <p>Nuxt Module for Apache ECharts™. (<NLink to="/">docs</NLink>)</p>

      <h2>Examples</h2>
      <p>
        <small
          >See
          <NLink to="https://echarts.apache.org/examples/en/index.html"
            >echarts.apache.org/examples</NLink
          >
          for all examples.</small
        >
      </p>
    </header>
    <ChartBar />
    <ChartPolar />
    <ChartPie />
    <ChartScatter />
  </div>

  <footer class="flex gap-2 justify-center items-center py-5" n="dark:brand">
    <NLink to="https://github.com/kingyue737"> @kingyue737 </NLink>
    <span class="text-xs op-50">|</span>
    <NLink to="https://github.com/kingyue737/nuxt-echarts/blob/main/LICENSE">
      MIT License
    </NLink>
    <span class="text-xs op-50">|</span>
    <NLink to="https://github.com/kingyue737/nuxt-echarts">
      View on GitHub
    </NLink>
  </footer>
</template>
