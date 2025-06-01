import type { InjectionKey } from 'vue'
import type {
  ThemeInjection,
  InitOptionsInjection,
  UpdateOptionsInjection,
} from '../types'

export const THEME_KEY: InjectionKey<ThemeInjection> = Symbol()
export const INIT_OPTIONS_KEY: InjectionKey<InitOptionsInjection> = Symbol()
export const UPDATE_OPTIONS_KEY: InjectionKey<UpdateOptionsInjection> = Symbol()
export { LOADING_OPTIONS_KEY } from '../composables'
