// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    disableTransition: true,
  },
  devtools: {
    enabled: true,
  },
  typescript: {
    strict: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },
  fonts: {
    provider: 'bunny',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  llms: {
    domain: 'https://echarts.nuxt.dev',
    title: 'Nuxt ECharts',
    description: 'Nuxt module for Apache ECharts™',
  },
  compatibilityDate: '2025-05-29',
})
