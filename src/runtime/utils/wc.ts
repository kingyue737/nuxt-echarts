let registered: boolean | null = null

export const TAG_NAME = 'x-vue-echarts'

if (typeof HTMLElement === 'undefined') {
  // @ts-expect-error HTMLElement is undefined on server side
  globalThis.HTMLElement = Object
  registered = false
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

  try {
    if (customElements.get(TAG_NAME) == null) {
      customElements.define(TAG_NAME, EChartsElement)
    }
  } catch {
    return (registered = false)
  }

  return (registered = true)
}
