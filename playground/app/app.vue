<script setup lang="ts">
import { registerTheme } from 'echarts/core'
import greenTheme from '~/assets/theme.json'
import type { InitOptions } from '../../src/runtime/types'

registerTheme('ovilia-green', greenTheme)

const colorMode = useColorMode()
const theme = ref(colorMode.preference === 'dark' ? 'dark' : 'default')
watch(theme, (value) => {
  colorMode.preference = value === 'dark' ? 'dark' : 'light'
})

useHead({
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
  { value: 'default', label: 'Default' },
  { value: 'ovilia-green', label: 'Ovilia Green' },
  { value: 'dark', label: 'Dark' },
]
</script>

<template>
  <UApp>
    <ClientOnly>
      <aside class="fixed z-1 flex gap-2 p-3">
        <UTabs
          v-model="theme"
          :items="themeOptions"
          :content="false"
          color="neutral"
          size="sm"
        />
        <UTabs
          v-model="renderer"
          :items="rendererOptions"
          :content="false"
          color="neutral"
          size="sm"
        />
      </aside>
    </ClientOnly>

    <div class="grid justify-center gap-y-16 py-15 text-center">
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
        <p class="text-muted mt-4 mb-12">
          Nuxt Module for Apache ECharts™.
          <UButton variant="soft" to="https://echarts.nuxt.dev" target="_blank">
            Docs
          </UButton>
        </p>

        <h2
          class="text-muted mb-4 flex items-center justify-center gap-3 text-xl"
        >
          <div class="w-12 border-b-1 border-dotted" />
          Examples
          <div class="w-12 border-b-1 border-dotted" />
        </h2>
        <p class="mb-4">
          <small class="text-muted"
            >See
            <ULink to="https://echarts.apache.org/examples/en/index.html"
              >echarts.apache.org/examples</ULink
            >
            for all examples.</small
          >
        </p>
      </header>
      <ChartBar />
      <ChartMap />
      <ChartPolar />
      <ChartPie />
      <ChartScatter />
    </div>

    <footer class="flex items-center justify-center gap-2 py-5">
      <ULink to="https://github.com/kingyue737"> @kingyue737 </ULink>
      <span class="text-xs opacity-50">|</span>
      <ULink to="https://github.com/kingyue737/nuxt-echarts/blob/main/LICENSE">
        MIT License
      </ULink>
      <span class="text-xs opacity-50">|</span>
      <ULink to="https://github.com/kingyue737/nuxt-echarts">
        View on GitHub
      </ULink>
    </footer>
  </UApp>
</template>
