---
seo:
  title: Nuxt ECharts - Nuxt Module for Apache ECharts™
description: Integrate Apache ECharts™ in your Nuxt application with both client-side and server-side Rendering.
---

::u-page-hero
---
orientation: horizontal
---
  ::div
  ![echarts-liquid](/echarts-liquid-fill.svg){.mx-auto .my-12}

    :::prose-pre{filename="Terminal" code="npx nuxi module add echarts"}
    ```bash
    npx nuxi module add echarts
    ```
    :::
  ::

#headline
  :::u-badge
  ---
  variant: subtle
  size: lg
  class: relative rounded-full font-semibold gap-0.5
  ---
  Online Demo

    :::nuxt-link
    ---
    to: https://nuxt-echarts.nuxt.dev
    target: _blank
    class: 'focus:outline-none'
    tabindex: -1
    ---
    []{.absolute .inset-0 aria-hidden="true"}

    :::

    :::u-icon
    ---
    name: i-lucide-external-link
    class: pointer-events-none h-4 w-4
    ---

    :::
  :::

#title
Client / Server Side Rendering [ECharts in Nuxt]{.text-primary}

#description
Nuxt ECharts cannot only integrate Apache ECharts™ in the browser but also render on server side via Nuxt Server Component.

#links
  :::u-button
  ---
  size: lg
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: lg
  target: _blank
  to: https://github.com/kingyue737/nuxt-echarts
  variant: subtle
  ---
  Open in GitHub
  :::
::

::u-page-section

  :::u-page-grid

    :::u-page-card
    ---
    icon: i-simple-icons-nuxt
    title: SSR
    description: Server-side SVG Rendering with Nuxt server components.
    to: /guides/ssr
    spotlight: true
    ---

    :::

    :::u-page-card
    ---
    icon: i-lucide-sparkles
    title: Client Hydration
    description: Lazy-loading full ECharts or lightweight client runtime.
    to: /guides/ssr#client-hydration
    spotlight: true
    ---

    :::

    :::u-page-card
    ---
    icon: i-simple-icons-typescript
    title: TypeScript
    description: Auto-import ECharts option type based on your config.
    to: /guides/usage#typescript
    spotlight: true
    ---

    :::

  :::

#title
Features

::
