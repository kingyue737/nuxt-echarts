// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) =>
        ['UButton', 'UIcon'].includes(c.pascalName),
      )

      globals.forEach((c) => (c.global = true))
    },
  },
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
    },
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
  compatibilityDate: '2024-11-10',
})
