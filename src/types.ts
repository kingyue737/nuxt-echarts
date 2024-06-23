import type * as echartsComponents from 'echarts/components'
import type * as echartsCharts from 'echarts/charts'
import type * as echartsFeatures from 'echarts/features'

type ComponentName = keyof typeof echartsComponents
type ChartName = keyof typeof echartsCharts
type FeaturesName = keyof typeof echartsFeatures
type RendererName = 'canvas' | 'svg'

export interface ModuleOptions {
  /**
   * @default 'canvas'
   */
  renderer?: RendererName | RendererName[]

  /**
   * Register the required charts on client side
   * (imported only if `VChart` is used)
   */
  charts?: ChartName[]

  /**
   * Register the required components on client side
   * (imported only if `VChart` is used)
   */
  components?: ComponentName[]

  /**
   * Register the required components on client side
   * (imported only if `VChart` is used)
   */
  features?: FeaturesName[]

  /**
   * This options indicates if `VChart` should also render on server.
   * By default, it only render on client.
   *
   * @default false
   */
  ssr?: boolean
}
