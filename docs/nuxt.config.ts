// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
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
    nodeTsConfig: {
      include: ['../nuxt.schema.ts'],
    },
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
    preview: {
      api: 'https://api.nuxt.studio',
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },
  llms: {
    domain: 'https://echarts.nuxt.dev',
    title: 'Nuxt ECharts',
    description: 'Nuxt module for Apache ECharts™',
  },
  compatibilityDate: '2025-07-09',
})
