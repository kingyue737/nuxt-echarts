<script setup lang="ts">
defineProps<{ id: string; title: string; desc: string }>()
</script>

<template>
  <section>
    <h3 class="text-xl" :id="id">
      <a :href="`#${id}`">
        {{ title }}
        <small class="op-70">({{ desc }})</small>
      </a>
    </h3>
    <NCard class="dark:bg-[#100c2a] my-5">
      <slot />
    </NCard>
    <div class="mb-4 w-2xl text-gray text-sm">
      <slot name="extra" />
    </div>
  </section>
</template>
