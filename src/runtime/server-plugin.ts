import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (_nuxtApp) => {
  // guarantee that echarts components are loaded during ssr
  await import('#build/echarts.mjs')
})
