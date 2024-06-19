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
    <NSelectTabs v-model="theme" :options="themeOptions" class="mr-2" />
    <NSelectTabs v-model="renderer" :options="rendererOptions" />
  </aside>

  <div class="grid gap-y-12 justify-center py-15 text-align-center">
    <header>
      <!-- <EChartsLogo class="mx-auto fill-green-5 dark:fill-brand" /> -->
      <div class="inline-block w-fit h-fit mb-10">
        <ChartLogo />
      </div>

      <h1>
        <NuxtLink
          class="text-3xl"
          to="https://github.com/kingyue737/nuxt-echarts"
        >
          Nuxt ECharts
        </NuxtLink>
      </h1>
      <p class="text-gray mt-4 mb-12">
        Nuxt Module for Apache ECharts™. (<NLink n="dark:brand" to="/"
          >docs</NLink
        >)
      </p>

      <h2 class="text-xl flex gap-3 justify-center items-center text-gray mb-4">
        <div class="border-b-dotted border-b-1 w-12" />
        Examples
        <div class="border-b-dotted border-b-1 w-12" />
      </h2>
      <p class="mb-4">
        <small class="text-gray"
          >See
          <NLink
            n="dark:brand"
            to="https://echarts.apache.org/examples/en/index.html"
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
