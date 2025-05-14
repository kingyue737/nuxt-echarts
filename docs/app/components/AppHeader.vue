<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<ContentNavigationItem[]>('navigation')

const { header } = useAppConfig()
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }">
    <UContentSearchButton
      v-if="header?.search"
      label="Search..."
      variant="outline"
      class="w-full"
    >
      <template #trailing>
        <div class="ms-auto flex items-center gap-0.5">
          <UKbd value="meta" />
          <UKbd value="k" />
        </div>
      </template>
    </UContentSearchButton>

    <template #title>
      <template v-if="header?.logo?.dark || header?.logo?.light">
        <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      </template>
      <template v-else>
        <UIcon
          name="i-simple-icons-apacheecharts"
          class="text-primary size-7"
        />
        Nuxt ECharts
        <UBadge label="Docs" variant="subtle" class="mb-0.5" />
      </template>
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
