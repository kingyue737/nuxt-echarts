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
  locale: 'EN',
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

  <div class="py-15 text-align-center grid justify-center gap-y-16">
    <header>
      <div class="mb-10 inline-block h-fit w-fit">
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
      <p class="text-gray mb-12 mt-4">
        Nuxt Module for Apache ECharts™.
        <NLink n="dark:brand" to="https://echarts.nuxt.dev" target="_blank"
          >(docs)</NLink
        >
      </p>

      <h2 class="text-gray mb-4 flex items-center justify-center gap-3 text-xl">
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

  <footer class="flex items-center justify-center gap-2 py-5" n="dark:brand">
    <NLink to="https://github.com/kingyue737"> @kingyue737 </NLink>
    <span class="op-50 text-xs">|</span>
    <NLink to="https://github.com/kingyue737/nuxt-echarts/blob/main/LICENSE">
      MIT License
    </NLink>
    <span class="op-50 text-xs">|</span>
    <NLink to="https://github.com/kingyue737/nuxt-echarts">
      View on GitHub
    </NLink>
  </footer>
</template>
