<script setup lang="ts">
defineProps<{ id: string; title: string; desc: string }>()
</script>

<template>
  <h3 :id="id">
    <a :href="`#${id}`">
      {{ title }}
      <small v-if="desc">{{ desc }}</small>
    </a>
  </h3>
  <section>
    <NCard>
      <slot />
    </NCard>
    <slot name="extra" />
  </section>
</template>
