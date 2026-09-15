<script setup lang="ts">
import { computed, shallowRef, useTemplateRef, watchEffect } from 'vue'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const Y_MAX = 220
const Y_MIN = 40
const CAMPAIGN_BOOST = 14
const CAMPAIGN = {
  id: 'campaign',
  dayIndex: 6,
  title: 'Campaign push',
  color: '#ff9f0a',
}

interface EventMarker {
  id: string
  dayIndex: number
  title: string
  color: string
}

const values = ref([114, 182, 146, 92, 74, 112, 128])
const markers = ref<EventMarker[]>([
  { id: 'launch', dayIndex: 1, title: 'Launch spike', color: '#34c759' },
  { id: 'incident', dayIndex: 3, title: 'Checkout dip', color: '#ff453a' },
  { id: 'recovery', dayIndex: 5, title: 'Recovery rebound', color: '#0a84ff' },
])
const focusedMarkerId = ref('launch')

function clampValue(value: number) {
  return Math.max(Y_MIN, Math.min(Y_MAX, Math.round(value)))
}

function randomInt(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

function randomizeTrend() {
  const mon = randomInt(96, 124)
  const tue = clampValue(mon + randomInt(46, 78))
  const wed = clampValue(tue - randomInt(24, 42))
  const thu = clampValue(Math.min(wed - randomInt(22, 38), randomInt(80, 98)))
  const fri = clampValue(Math.min(thu - randomInt(6, 18), randomInt(62, 84)))
  const sat = clampValue(fri + randomInt(26, 44))
  const baseSun = clampValue(sat + randomInt(6, 20))
  const campaignEnabled = markers.value.some((m) => m.id === CAMPAIGN.id)
  const sun = campaignEnabled
    ? clampValue(Math.max(baseSun + CAMPAIGN_BOOST, sat + 16))
    : baseSun
  values.value = [mon, tue, wed, thu, fri, sat, sun]
}

function rotateFocus() {
  const ids = markers.value.map((m) => m.id)
  if (!ids.length) return
  focusedMarkerId.value = ids[(ids.indexOf(focusedMarkerId.value) + 1) % ids.length]!
}

function focusMarker(id: string) {
  focusedMarkerId.value = id
}

function toggleMarker() {
  if (markers.value.some((m) => m.id === CAMPAIGN.id)) {
    markers.value = markers.value.filter((m) => m.id !== CAMPAIGN.id)
    values.value = values.value.map((value, index, data) =>
      index === CAMPAIGN.dayIndex
        ? clampValue(Math.max(data[5]! + 4, value - CAMPAIGN_BOOST))
        : value,
    )
    if (focusedMarkerId.value === CAMPAIGN.id) {
      focusedMarkerId.value = markers.value[0]?.id ?? ''
    }
    return
  }
  markers.value = [...markers.value, CAMPAIGN]
  values.value = values.value.map((value, index, data) =>
    index === CAMPAIGN.dayIndex
      ? clampValue(Math.max(value + CAMPAIGN_BOOST, data[5]! + 16))
      : value,
  )
}

const option = computed<ECOption>(() => ({
  animationDurationUpdate: 300,
  animationEasingUpdate: 'cubicOut',
  grid: { left: '8%', right: '5%', top: '18%', bottom: '12%' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', boundaryGap: false, data: DAYS },
  yAxis: {
    type: 'value',
    min: 0,
    max: Y_MAX,
    splitLine: { lineStyle: { opacity: 0.22 } },
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 3 },
      data: values.value,
    },
  ],
}))

const chartRef = useTemplateRef('chartRef')
const viewport = shallowRef({ width: 650, height: 310 })

watchEffect((onCleanup) => {
  const target = chartRef.value?.root as HTMLElement | undefined
  if (!target || typeof ResizeObserver === 'undefined') return
  const update = () => {
    const { clientWidth, clientHeight } = target
    if (clientWidth && clientHeight) {
      viewport.value = { width: clientWidth, height: clientHeight }
    }
  }
  update()
  const observer = new ResizeObserver(update)
  observer.observe(target)
  onCleanup(() => observer.disconnect())
})

const BUBBLE = { height: 26, padX: 10, minWidth: 108, maxWidth: 182 }
const GRID = { left: 8, right: 5, top: 18, bottom: 12 }

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function intersects(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y + a.height > b.y &&
    a.y < b.y + b.height
  )
}

function bubbleWidth(label: string, plotWidth: number) {
  const max = Math.max(
    BUBBLE.minWidth,
    Math.min(BUBBLE.maxWidth, Math.round(plotWidth * 0.28)),
  )
  return clamp(
    Math.round(label.length * 6.4 + BUBBLE.padX * 2),
    BUBBLE.minWidth,
    max,
  )
}

// The ECharts `graphic` tree lives outside the series coordinate system, so the
// overlay markers are positioned from the viewport and the same grid percentages,
// with simple collision avoidance so bubbles never overlap each other.
const layout = computed(() => {
  const { width: viewportWidth, height: viewportHeight } = viewport.value
  const plotLeft = (viewportWidth * GRID.left) / 100
  const plotRight = viewportWidth - (viewportWidth * GRID.right) / 100
  const plotTop = (viewportHeight * GRID.top) / 100
  const plotBottom = viewportHeight - (viewportHeight * GRID.bottom) / 100
  const plotWidth = plotRight - plotLeft
  const plotHeight = plotBottom - plotTop
  const maxBubbleY = plotBottom - BUBBLE.height - 4

  const placedRects: Rect[] = []
  const laneBySide = { left: 0, right: 0 }

  return markers.value.map((marker) => {
    const day = DAYS[marker.dayIndex]!
    const value = values.value[marker.dayIndex]!
    const label = `${marker.title} · ${day}`
    const width = bubbleWidth(label, plotWidth)

    const x = Math.round(
      plotLeft + (plotWidth * marker.dayIndex) / (DAYS.length - 1),
    )
    const y = Math.round(plotTop + plotHeight * (1 - value / Y_MAX))

    const side = x > plotLeft + plotWidth * 0.58 ? 'left' : 'right'
    const laneOffset = laneBySide[side]++ * 22

    const left = x - width - 12
    const right = x + 12
    const above = y - 36 - laneOffset
    const below = y + 7 + laneOffset

    const candidates = (
      side === 'left'
        ? [
            [left, above],
            [left, below],
            [right, above],
            [right, below],
          ]
        : [
            [right, above],
            [right, below],
            [left, above],
            [left, below],
          ]
    ).map(([rawX, rawY]) => {
      const bubbleX = clamp(rawX!, 6, Math.max(6, viewportWidth - width - 6))
      const bubbleY = clamp(rawY!, 6, maxBubbleY)
      return {
        bubbleX,
        bubbleY,
        rect: { x: bubbleX, y: bubbleY, width, height: BUBBLE.height },
      }
    })

    const picked =
      candidates.find(
        ({ rect }) => !placedRects.some((placed) => intersects(rect, placed)),
      ) ?? candidates[0]!
    placedRects.push(picked.rect)

    const bubbleCenterY = picked.bubbleY + BUBBLE.height / 2
    const anchorX =
      picked.bubbleX + width / 2 < x ? picked.bubbleX + width : picked.bubbleX
    const anchorY = clamp(y, picked.bubbleY + 4, picked.bubbleY + BUBBLE.height - 4)
    const direction = anchorX >= x ? 1 : -1

    return {
      ...marker,
      label,
      x,
      y,
      bubbleX: picked.bubbleX,
      bubbleY: picked.bubbleY,
      bubbleWidth: width,
      textX: picked.bubbleX + width / 2,
      textY: picked.bubbleY + BUBBLE.height / 2,
      anchorX,
      anchorY,
      cpx1: Math.round(x + direction * 10),
      cpy1: Math.round(y + (bubbleCenterY > y ? 7 : -7)),
      cpx2: Math.round(anchorX - direction * 14),
      cpy2: Math.round(anchorY + (bubbleCenterY > anchorY ? -2 : 2)),
    }
  })
})

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const ui = computed(() =>
  isDark.value
    ? {
        bubbleBg: 'rgba(15,23,42,.92)',
        bubbleStroke: 'rgba(71,85,105,.6)',
        bubbleText: '#cbd5e1',
        bubbleTextFocus: '#f8fafc',
        focusLine: 'rgba(226,232,240,.76)',
        lineSoft: 'rgba(148,163,184,.52)',
        dotStroke: '#0b1220',
      }
    : {
        bubbleBg: 'rgba(255,255,255,.94)',
        bubbleStroke: 'rgba(148,163,184,.48)',
        bubbleText: '#334155',
        bubbleTextFocus: '#0f172a',
        focusLine: 'rgba(15,23,42,.62)',
        lineSoft: 'rgba(100,116,139,.52)',
        dotStroke: '#ffffff',
      },
)
</script>

<template>
  <NExample
    id="graphic"
    title="Graphic Overlay"
    desc="declarative graphic elements"
  >
    <VChart
      ref="chartRef"
      :option="option"
      autoresize
      style="height: 310px; width: 650px"
    >
      <template #graphic>
        <GGroup id="overlay-root">
          <template v-for="marker in layout" :key="marker.id">
            <GBezierCurve
              :id="`marker-curve-${marker.id}`"
              :x1="marker.x"
              :y1="marker.y"
              :x2="marker.anchorX"
              :y2="marker.anchorY"
              :cpx1="marker.cpx1"
              :cpy1="marker.cpy1"
              :cpx2="marker.cpx2"
              :cpy2="marker.cpy2"
              :stroke="
                marker.id === focusedMarkerId ? ui.focusLine : ui.lineSoft
              "
              :line-width="marker.id === focusedMarkerId ? 1.6 : 1.1"
              line-cap="round"
              :z="20"
            />
            <GRect
              :id="`marker-bubble-${marker.id}`"
              :x="marker.bubbleX"
              :y="marker.bubbleY"
              :width="marker.bubbleWidth"
              :height="26"
              :r="10"
              :fill="ui.bubbleBg"
              :stroke="
                marker.id === focusedMarkerId ? marker.color : ui.bubbleStroke
              "
              :line-width="marker.id === focusedMarkerId ? 1.25 : 1"
              :z="40"
              cursor="pointer"
              @click="focusMarker(marker.id)"
            />
            <GText
              :id="`marker-label-${marker.id}`"
              :x="marker.textX"
              :y="marker.textY"
              :text="marker.label"
              font="600 10px sans-serif"
              text-align="center"
              text-vertical-align="middle"
              :fill="
                marker.id === focusedMarkerId
                  ? ui.bubbleTextFocus
                  : ui.bubbleText
              "
              :z="50"
              cursor="pointer"
              @click="focusMarker(marker.id)"
            />
            <GCircle
              :id="`marker-dot-${marker.id}`"
              :cx="marker.x"
              :cy="marker.y"
              :r="marker.id === focusedMarkerId ? 7 : 5.5"
              :fill="marker.color"
              :stroke="ui.dotStroke"
              :line-width="2"
              :z="60"
              cursor="pointer"
              @click="focusMarker(marker.id)"
            />
          </template>
        </GGroup>
      </template>
    </VChart>

    <template #extra>
      Click a marker to focus it. The overlay is built with `G*` components
      auto-imported from `vue-echarts/graphic`.
      <div class="mt-2 flex justify-center gap-2">
        <UButton size="xs" variant="soft" @click="randomizeTrend">
          Randomize trend
        </UButton>
        <UButton size="xs" variant="soft" @click="rotateFocus">
          Rotate focus
        </UButton>
        <UButton size="xs" variant="soft" @click="toggleMarker">
          Add/remove campaign
        </UButton>
      </div>
    </template>
  </NExample>
</template>
