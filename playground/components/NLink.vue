<script setup lang="ts">
const props = defineProps<{
  to?: string
  href?: string
  target?: string
  underline?: boolean
}>()

const link = computed(() => props.href || props.to)
</script>

<template>
  <NuxtLink
    v-bind="
      link
        ? {
            to: link,
            target,
            rel: target === '_blank' ? 'noopener noreferrer' : null,
          }
        : {}
    "
    :class="{
      'n-link n-transition hover:n-link-hover n-link-base': link || underline,
    }"
  >
    <slot />
  </NuxtLink>
</template>
