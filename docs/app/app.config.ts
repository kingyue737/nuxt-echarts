export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt ECharts - Nuxt Module for Apache ECharts™',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/kingyue737/nuxt-echarts',
        target: '_blank',
        'aria-label': 'Nuxt ECharts on GitHub',
      },
    ],
  },
  footer: {
    credits: '',
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-nuxtdotjs',
        to: 'https://nuxt.com',
        target: '_blank',
        'aria-label': 'Nuxt Website',
      },
      {
        icon: 'i-simple-icons-apacheecharts',
        to: 'https://echarts.apache.org/en/index.html',
        target: '_blank',
        'aria-label': 'Apache ECharts™ Website',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/kingyue737/nuxt-echarts',
        target: '_blank',
        'aria-label': 'Nuxt ECharts on GitHub',
      },
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/kingyue737/nuxt-echarts/edit/main/docs/content',
      links: [
        {
          icon: 'i-lucide-star',
          label: 'Star on GitHub',
          to: 'https://github.com/kingyue737/nuxt-echarts',
          target: '_blank',
        },
        {
          icon: 'i-lucide-book-open',
          label: 'ECharts SSR docs',
          to: 'https://echarts.apache.org/handbook/en/how-to/cross-platform/server',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-nuxtdotjs',
          label: 'Online Demo',
          to: 'https://nuxt-echarts.nuxt.dev',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-stackblitz',
          label: 'Online Playground',
          to: 'https://stackblitz.com/github/kingyue737/nuxt-echarts?file=playground%2Fapp.vue',
          target: '_blank',
        },
      ],
    },
  },
})
