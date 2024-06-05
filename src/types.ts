import type * as echartsComponents from 'echarts/components'
import type * as echartsCharts from 'echarts/charts'
import type * as echartsFeatures from 'echarts/features'

type ComponentName = keyof typeof echartsComponents
type ChartName = keyof typeof echartsCharts
type FeaturesName = keyof typeof echartsFeatures

export interface ModuleOptions {
  /**
   * @default 'canvas'
   */
  renderer?: 'canvas' | 'svg'

  /**
   * Register the required charts globally
   */
  charts?: ChartName[]

  /**
   * Register the required components globally
   */
  components?: ComponentName[]

  /**
   * Register the required components globally
   */
  features?: FeaturesName[]

  /**
   * WIP
   *
   * @default false
   */
  ssr?: boolean
}
