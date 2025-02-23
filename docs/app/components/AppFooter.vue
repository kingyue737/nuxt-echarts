<script setup lang="ts">
const { footer } = useAppConfig()

const items = [
  {
    label: 'Documentation',
    to: '/getting-started',
  },
  {
    label: 'Playground',
    to: 'https://stackblitz.com/github/kingyue737/nuxt-echarts?file=playground%2Fapp.vue',
    target: '_blank',
  },
  {
    label: 'Releases',
    to: 'https://github.com/kingyue737/nuxt-echarts/releases',
    target: '_blank',
  },
]
</script>

<template>
  <UFooter>
    <template #left>
      <span v-if="footer.credits"> {{ footer.credits }} </span>
      <span v-else class="text-sm">
        Published under
        <NuxtLink
          to="https://github.com/kingyue737/nuxt-echarts/blob/main/LICENSE"
          target="_blank"
          class="underline"
          >MIT License</NuxtLink
        >
      </span>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
