import {
  toValue,
  inject,
  computed,
  watchEffect,
  type Ref,
  type InjectionKey,
  type PropType,
} from 'vue'
import type { EChartsType, LoadingOptions } from '../types'

export const LOADING_OPTIONS_KEY =
  'ecLoadingOptions' as unknown as InjectionKey<
    LoadingOptions | Ref<LoadingOptions>
  >

export function useLoading(
  chart: Ref<EChartsType | undefined>,
  loading: Ref<boolean>,
  loadingOptions: Ref<LoadingOptions | undefined>,
): void {
  const defaultLoadingOptions = inject(LOADING_OPTIONS_KEY, {})
  const realLoadingOptions = computed(() => ({
    ...(toValue(defaultLoadingOptions) || {}),
    ...loadingOptions?.value,
  }))

  watchEffect(() => {
    const instance = chart.value
    if (!instance) {
      return
    }

    if (loading.value) {
      instance.showLoading(realLoadingOptions.value)
    } else {
      instance.hideLoading()
    }
  })
}

export const loadingProps = {
  loading: Boolean,
  loadingOptions: Object as PropType<LoadingOptions>,
}
