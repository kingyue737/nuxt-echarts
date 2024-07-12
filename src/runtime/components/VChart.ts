import {
  defineComponent,
  shallowRef,
  toRefs,
  ref,
  unref,
  watch,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  h,
  nextTick,
  watchEffect,
  type PropType,
} from 'vue'
import { init as initChart } from 'echarts/core'
import type {
  EChartsType,
  EventTarget,
  Option,
  Theme,
  InitOptions,
  UpdateOptions,
  Emits,
} from '../types'
import {
  usePublicAPI,
  useAutoresize,
  autoresizeProps,
  useLoading,
  loadingProps,
} from '../composables'
import { isOn, omitOn } from '../utils/on'
import { register, TAG_NAME, type EChartsElement } from '../utils/wc'
import '#build/echarts.mjs'

import {
  THEME_KEY,
  INIT_OPTIONS_KEY,
  UPDATE_OPTIONS_KEY,
} from '../utils/injection'

const wcRegistered = register()

export default defineComponent({
  props: {
    option: Object as PropType<Option>,
    theme: {
      type: [Object, String] as PropType<Theme>,
    },
    initOptions: Object as PropType<InitOptions>,
    updateOptions: Object as PropType<UpdateOptions>,
    group: String,
    manualUpdate: Boolean,
    ...autoresizeProps,
    ...loadingProps,
  },
  emits: {} as unknown as Emits,
  inheritAttrs: false,
  setup(props, { attrs }) {
    const root = shallowRef<EChartsElement>()
    const inner = shallowRef<HTMLElement>()
    const chart = shallowRef<EChartsType>()
    const manualOption = shallowRef<Option>()
    const defaultTheme = inject(THEME_KEY, null)
    const defaultInitOptions = inject(INIT_OPTIONS_KEY, null)
    const defaultUpdateOptions = inject(UPDATE_OPTIONS_KEY, null)

    const { autoresize, manualUpdate, loading, loadingOptions } = toRefs(props)

    const realOption = computed(
      () => manualOption.value || props.option || null,
    )
    const realTheme = computed(() => props.theme || unref(defaultTheme) || {})
    const realInitOptions = computed(
      // @ts-expect-error unknown computed type error
      () => props.initOptions || unref(defaultInitOptions) || {},
    )
    const realUpdateOptions = computed(
      // @ts-expect-error unknown computed type error
      () => props.updateOptions || unref(defaultUpdateOptions) || {},
    )
    const nativeListeners = ref<Record<string, unknown>>({})
    const realAttrs = computed(() => ({
      ...omitOn(attrs),
      ...nativeListeners.value,
    }))
    const realListeners: Record<string, any> = {}

    function init(option?: Option) {
      // We are converting all `on<Event>` props to event listeners and collect them  into
      // `realListeners` so that we can bind them to the chart instance later in the same way.
      // For `onNative:<event>` props, we just strip the `Native:` part and collect them into
      // `nativeListeners` so that we can bind them to the root element directly.
      Object.keys(attrs)
        .filter((key) => isOn(key))
        .forEach((key) => {
          // onClick    -> c + lick
          // onZr:click -> z + r:click
          let event = key.charAt(2).toLowerCase() + key.slice(3)

          // Collect native DOM events
          if (event.indexOf('native:') === 0) {
            // native:click -> onClick
            const nativeKey = `on${event.charAt(7).toUpperCase()}${event.slice(
              8,
            )}`

            nativeListeners.value[nativeKey] = attrs[key]
            return
          }

          // clickOnce    -> ~click
          // zr:clickOnce -> ~zr:click
          if (event.substring(event.length - 4) === 'Once') {
            event = `~${event.substring(0, event.length - 4)}`
          }

          realListeners[event] = attrs[key]
        })

      if (!inner.value) {
        return
      }

      const instance = (chart.value = initChart(
        inner.value,
        realTheme.value,
        realInitOptions.value,
      ))

      if (props.group) {
        instance.group = props.group
      }

      Object.keys(realListeners).forEach((key) => {
        let handler = realListeners[key]

        if (!handler) {
          return
        }

        let event = key.toLowerCase()
        if (event.charAt(0) === '~') {
          event = event.substring(1)
          handler.__once__ = true
        }

        let target: EventTarget = instance
        if (event.indexOf('zr:') === 0) {
          target = instance.getZr()
          event = event.substring(3)
        }

        if (handler.__once__) {
          delete handler.__once__

          const raw = handler

          handler = (...args: any[]) => {
            raw(...args)
            target.off(event, handler)
          }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore EChartsType["on"] is not compatible with ZRenderType["on"]
        // but it's okay here
        target.on(event, handler)
      })

      function resize() {
        if (instance && !instance.isDisposed()) {
          instance.resize()
        }
      }

      function commit() {
        const opt = option || realOption.value
        if (opt) {
          instance.setOption(opt, realUpdateOptions.value)
        }
      }

      if (autoresize.value) {
        // Try to make chart fit to container in case container size
        // is changed synchronously or in already queued microtasks
        nextTick(() => {
          resize()
          commit()
        })
      } else {
        commit()
      }
    }

    function setOption(option: Option, updateOptions?: UpdateOptions) {
      if (props.manualUpdate) {
        manualOption.value = option
      }

      if (!chart.value) {
        init(option)
      } else {
        chart.value.setOption(option, updateOptions || {})
      }
    }

    function cleanup() {
      if (chart.value) {
        chart.value.dispose()
        chart.value = undefined
      }
    }

    let unwatchOption: (() => void) | null = null
    watch(
      manualUpdate,
      (manualUpdate) => {
        if (typeof unwatchOption === 'function') {
          unwatchOption()
          unwatchOption = null
        }

        if (!manualUpdate) {
          unwatchOption = watch(
            () => props.option,
            (option, oldOption) => {
              if (!option) {
                return
              }
              if (!chart.value) {
                init()
              } else {
                chart.value.setOption(option, {
                  // mutating `option` will lead to `notMerge: false` and
                  // replacing it with new reference will lead to `notMerge: true`
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value,
                })
              }
            },
            { deep: true },
          )
        }
      },
      {
        immediate: true,
      },
    )

    watch(
      [realTheme, realInitOptions],
      () => {
        cleanup()
        init()
      },
      {
        deep: true,
      },
    )

    watchEffect(() => {
      if (props.group && chart.value) {
        chart.value.group = props.group
      }
    })

    const publicApi = usePublicAPI(chart)

    useLoading(chart, loading, loadingOptions)

    useAutoresize(chart, autoresize, inner)

    onMounted(async () => {
      // `.client` components are rendered only after being mounted
      if (!root.value) await nextTick()
      init()
    })

    onBeforeUnmount(() => {
      if (wcRegistered && root.value) {
        // For registered web component, we can leverage the
        // `disconnectedCallback` to dispose the chart instance
        // so that we can delay the cleanup after exsiting leaving
        // transition.
        root.value.__dispose = cleanup
      } else {
        cleanup()
      }
    })

    return {
      chart,
      root,
      inner,
      setOption,
      realAttrs,
      nativeListeners,
      ...publicApi,
    }
  },
  render() {
    const attrs = this.realAttrs
    attrs.ref = 'root'
    attrs.class = attrs.class ? ['echarts'].concat(attrs.class) : 'echarts'
    return h(TAG_NAME, attrs, [
      h('div', { ref: 'inner', class: 'vue-echarts-inner' }),
    ])
  },
})