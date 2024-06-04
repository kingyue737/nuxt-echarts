// Copied from
// https://github.com/vuejs/vue-next/blob/5a7a1b8293822219283d6e267496bec02234b0bc/packages/shared/src/index.ts#L40-L41
const onRE = /^on[^a-z]/
export const isOn = (key: string): boolean => onRE.test(key)

type Attrs = Record<string, any>
export function omitOn(attrs: Attrs): Attrs {
  const result: Attrs = {}
  for (const key in attrs) {
    if (!isOn(key)) {
      result[key] = attrs[key]
    }
  }

  return result
}
