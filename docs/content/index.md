---
seo:
  title: Nuxt ECharts - Nuxt Module for Apache ECharts™
description: Integrate Apache ECharts™ in your Nuxt application with both
  client-side and server-side Rendering.
---

::u-page-hero
---
orientation: horizontal
---
  :::div
  ![echarts-liquid](/echarts-liquid-fill.svg){.mx-auto.my-12}
  
    ::::prose-pre{code="npx nuxi module add echarts" filename="Terminal"}
    ```bash
    npx nuxi module add echarts
    ```
    ::::
  :::

#headline
  :::u-badge
  ---
  class: relative rounded-full font-semibold gap-0.5
  size: lg
  variant: subtle
  ---
  Online Demo
  
    ::::nuxt-link
    ---
    tabindex: -1
    class: focus:outline-none
    target: _blank
    to: https://nuxt-echarts.nuxt.dev
    ---
    []{.absolute.inset-0 ariaHidden="true"}
    ::::
  
    ::::u-icon{.pointer-events-none.h-4.w-4 name="i-lucide-external-link"}
    ::::
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
    ::::u-page-card
    ---
    spotlight: true
    description: Server-side SVG Rendering with Nuxt server components.
    icon: i-simple-icons-nuxt
    title: SSR
    to: /guides/ssr
    ---
    ::::
  
    ::::u-page-card
    ---
    spotlight: true
    description: Lazy-loading full ECharts or lightweight client runtime.
    icon: i-lucide-sparkles
    title: Client Hydration
    to: /guides/ssr#client-hydration
    ---
    ::::
  
    ::::u-page-card
    ---
    spotlight: true
    description: Auto-import ECharts option type based on your config.
    icon: i-simple-icons-typescript
    title: TypeScript
    to: /guides/usage#typescript
    ---
    ::::
  :::

#title
Features
::
