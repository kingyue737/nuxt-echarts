<script setup lang="ts">
defineProps<{ id: string; title: string; desc: string }>()
</script>

<template>
  <section>
    <h3 :id="id" class="text-xl">
      <a :href="`#${id}`">
        {{ title }}
        <small class="op-70">({{ desc }})</small>
      </a>
      <NButton
        class="ml-2 px-2 text-xs"
        :to="`https://github.com/kingyue737/nuxt-echarts/tree/main/playground/components/Chart/${id[0].toUpperCase()}${id.slice(1)}.vue`"
        target="_blank"
        >Source</NButton
      >
    </h3>
    <NCard class="my-5 dark:bg-[#100c2a]">
      <slot />
    </NCard>
    <div class="w-xl text-gray mx-auto mb-4 text-sm">
      <slot name="extra" />
    </div>
  </section>
</template>
