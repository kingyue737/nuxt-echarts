import * as echarts from 'echarts'
import type { ECBasicOption } from 'echarts/types/dist/shared.js'
import type { InitOptions } from '../../../src/runtime/types'
import greenTheme from '~/assets/theme.json'

echarts.registerTheme('ovilia-green', greenTheme)

export default defineEventHandler(async (event) => {
  const { theme, initOptions, option } = await readBody(event)

  const realInitOptions: InitOptions = echarts.util.merge(
    { ssr: true, renderer: 'svg' },
    initOptions,
  )
  type MyData = [number, number, number, string, number]

  const data: MyData[][] = [
    [
      [28604, 77, 17096869, 'Australia', 1990],
      [31163, 77.4, 27662440, 'Canada', 1990],
      [1516, 68, 1154605773, 'China', 1990],
      [13670, 74.7, 10582082, 'Cuba', 1990],
      [28599, 75, 4986705, 'Finland', 1990],
      [29476, 77.1, 56943299, 'France', 1990],
      [31476, 75.4, 78958237, 'Germany', 1990],
      [28666, 78.1, 254830, 'Iceland', 1990],
      [1777, 57.7, 870601776, 'India', 1990],
      [29550, 79.1, 122249285, 'Japan', 1990],
      [2076, 67.9, 20194354, 'North Korea', 1990],
      [12087, 72, 42972254, 'South Korea', 1990],
      [24021, 75.4, 3397534, 'New Zealand', 1990],
      [43296, 76.8, 4240375, 'Norway', 1990],
      [10088, 70.8, 38195258, 'Poland', 1990],
      [19349, 69.6, 147568552, 'Russia', 1990],
      [10670, 67.3, 53994605, 'Turkey', 1990],
      [26424, 75.7, 57110117, 'United Kingdom', 1990],
      [37062, 75.4, 252847810, 'United States', 1990],
    ],
    [
      [44056, 81.8, 23968973, 'Australia', 2015],
      [43294, 81.7, 35939927, 'Canada', 2015],
      [13334, 76.9, 1376048943, 'China', 2015],
      [21291, 78.5, 11389562, 'Cuba', 2015],
      [38923, 80.8, 5503457, 'Finland', 2015],
      [37599, 81.9, 64395345, 'France', 2015],
      [44053, 81.1, 80688545, 'Germany', 2015],
      [42182, 82.8, 329425, 'Iceland', 2015],
      [5903, 66.8, 1311050527, 'India', 2015],
      [36162, 83.5, 126573481, 'Japan', 2015],
      [1390, 71.4, 25155317, 'North Korea', 2015],
      [34644, 80.7, 50293439, 'South Korea', 2015],
      [34186, 80.6, 4528526, 'New Zealand', 2015],
      [64304, 81.6, 5210967, 'Norway', 2015],
      [24787, 77.3, 38611794, 'Poland', 2015],
      [23038, 73.13, 143456918, 'Russia', 2015],
      [19360, 76.5, 78665830, 'Turkey', 2015],
      [38225, 81.4, 64715810, 'United Kingdom', 2015],
      [53354, 79.1, 321773631, 'United States', 2015],
    ],
  ]

  const defaultOption: ECBasicOption = {
    animation: false,
    title: {
      text: 'Life Expectancy vs. GDP by country',
    },
    legend: {
      right: 10,
      data: ['1990', '2015'],
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      scale: true,
    },
    series: [
      {
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize(data: MyData) {
          return Math.sqrt(data[2]) / 5e2
        },
      },
      {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize(data: MyData) {
          return Math.sqrt(data[2]) / 5e2
        },
      },
    ],
  }
  const realOption = echarts.util.merge(option, defaultOption)

  const chart = echarts.init(null, theme, realInitOptions)
  chart.setOption(realOption)
  const svgStr = chart.renderToSVGString()
  chart.dispose()
  return svgStr
})
