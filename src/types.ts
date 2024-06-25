import type * as echartsComponents from 'echarts/components'
import type * as echartsCharts from 'echarts/charts'
import type * as echartsFeatures from 'echarts/features'

type ComponentName = keyof typeof echartsComponents
type ChartName = keyof typeof echartsCharts
type FeaturesName = keyof typeof echartsFeatures
type RendererName = 'canvas' | 'svg'

export interface ModuleOptions {
  /**
   * Register the renderer used by `<VChart>`
   * @default 'canvas'
   */
  renderer?: RendererName | RendererName[]

  /**
   * Register the charts used by `<VChart>`
   * (imported only if `<VChart>` is used)
   */
  charts?: ChartName[]

  /**
   * Register the components used by `<VChart>`
   * (imported only if `<VChart>` is used)
   */
  components?: ComponentName[]

  /**
   * Register the features used by `<VChart>`
   * (imported only if `<VChart>` is used)
   */
  features?: FeaturesName[]

  /**
   * This option indicates if `<VChart>` should also render on server.
   * By default, it only render on client.
   *
   * @default false
   */
  ssr?: boolean
}
