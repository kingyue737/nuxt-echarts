let registered: boolean | null = null

export const TAG_NAME = 'x-vue-echarts'

if (import.meta.server) {
  // @ts-expect-error HTMLElement is undefined on server side
  global.HTMLElement = Object
}
export class EChartsElement extends HTMLElement {
  __dispose: (() => void) | null = null

  disconnectedCallback() {
    if (this.__dispose) {
      this.__dispose()
      this.__dispose = null
    }
  }
}

export function register(): boolean {
  if (registered != null) {
    return registered
  }

  if (
    typeof HTMLElement === 'undefined' ||
    typeof customElements === 'undefined'
  ) {
    return (registered = false)
  }

  try {
    if (customElements.get(TAG_NAME) == null) {
      customElements.define(TAG_NAME, EChartsElement)
    }
  } catch (e) {
    return (registered = false)
  }

  return (registered = true)
}
