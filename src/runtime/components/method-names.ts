import type VChart from 'vue-echarts'

// Mirrors the public API exposed by vue-echarts (`src/composables/api.ts`),
// plus `setOption` (manual update) and `isDisposed`/`dispose` which vue-echarts
// adds on top of that list in its own `expose`.
export const METHOD_NAMES = [
  'setOption',
  'getWidth',
  'getHeight',
  'getDom',
  'getZr',
  'getId',
  'isSSR',
  'getDevicePixelRatio',
  'getOption',
  'resize',
  'makeActionFromEvent',
  'dispatchAction',
  'updateLabelLayout',
  'convertToPixel',
  'convertToLayout',
  'convertFromPixel',
  'containPixel',
  'getVisual',
  'renderToCanvas',
  'renderToSVGString',
  'getSvgDataURL',
  'getDataURL',
  'getConnectedDataURL',
  'appendData',
  'clear',
  'isDisposed',
  'dispose',
] as const

// If vue-echarts renames or drops one of these, this fails to typecheck
// instead of silently forwarding to `undefined` at runtime.
const _assertListedNamesExist: readonly (keyof InstanceType<typeof VChart>)[] = METHOD_NAMES
