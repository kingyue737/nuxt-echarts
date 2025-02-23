# nuxt-echarts: 在Nuxt项目中轻松集成ECharts

在Nuxt/Vue中使用ECharts需要许多额外的配置，还要注意在开启Nuxt SSR时不引入在服务端无法运行的代码。nuxt-echarts正是为了解决这些痛点而生。只需要一行命令就能完成安装，还提供了同时配置按需引入和TypeScript类型的统一设置。

[Github →](https://github.com/kingyue737/nuxt-echarts)
[文档 ->](https://echarts.nuxt.dev)

## 功能

- ⛰ **服务端渲染 (SSR):** 使用 Nuxt 服务端组件进行服务端 SVG 渲染

- ♾️ **客户端水合 (Hydration):** 按需懒加载完整的 ECharts 或轻量化的客户端运行时
- 🛠️ **可配置:** 仅导入必要的 ECharts 功能以缩小打包体积
- 🦾 **强类型支持:** 根据用户配置自动导入 ECharts 的选项类型
- 🌲 **Tree-shaking 支持:** 只有使用到的组件才会被构建打包

## 安装

```bash
npx nuxi module add echarts
```

## 进阶功能：ECharts SSR

通常即使是开启了Nuxt的SSR，我们在使用ECharts时也仅是在客户端才渲染图表，从服务端发送过来的HTML是不含图表的。
