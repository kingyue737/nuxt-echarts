import type { InjectionKey } from 'vue'
import type {
  ThemeInjection,
  InitOptionsInjection,
  UpdateOptionsInjection,
} from '../types'

export const THEME_KEY = 'ecTheme' as unknown as InjectionKey<ThemeInjection>
export const INIT_OPTIONS_KEY =
  'ecInitOptions' as unknown as InjectionKey<InitOptionsInjection>
export const UPDATE_OPTIONS_KEY =
  'ecUpdateOptions' as unknown as InjectionKey<UpdateOptionsInjection>
export { LOADING_OPTIONS_KEY } from '../composables'
