import type { init, SetOptionOpts } from 'echarts/core'

type InitType = typeof init
export type InitParameters = Parameters<InitType>
export type Theme = NonNullable<InitParameters[1]>
export type InitOptions = NonNullable<InitParameters[2]>
export type UpdateOptions = SetOptionOpts

export type EChartsType = ReturnType<InitType>

type SetOptionType = EChartsType['setOption']
export type Option = Parameters<SetOptionType>[0]
