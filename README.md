![nuxt-echarts](./.github/assets/social-card.png)

# Nuxt ECharts

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt Module for Apache ECharts™

> 🚧 **Work in Progress**
>
> Nuxt ECharts is currently in active development and not usable for production yet.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-echarts?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features (WIP)

<!-- Highlight some of the features your module provide here -->

- ⛰&nbsp;**SSR**: experimental server-only component, lightweight client runtime

- 🛠️&nbsp;**Configurable**: import only necessary components and charts for smaller bundle size
- 🦾&nbsp;**Type Strong**: generate ECharts option type based on your config

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-echarts
```

That's it! You can now use Nuxt ECharts in your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Format with Prettier
  pnpm run format
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>

## Credits

The Nuxt ECharts module is heavily inspired by [vue-echarts](https://github.com/ecomfe/vue-echarts), created by [@Justineo](https://github.com/Justineo).

## License

This project is licensed under the [MIT License](./LICENSE).

This project also partially contains code derived or copied from [vue-echarts(MIT)](https://github.com/ecomfe/vue-echarts/blob/main/LICENSE).

## Notice

The Apache Software Foundation [Apache ECharts, ECharts](https://echarts.apache.org/), Apache, the Apache feather, and the Apache ECharts project logo are either registered trademarks or trademarks of the [Apache Software Foundation](https://www.apache.org/).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-echarts/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-echarts
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-echarts.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-echarts
[license-src]: https://img.shields.io/npm/l/nuxt-echarts.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-echarts
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
