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
        class="text-xs ml-2 px-2"
        :to="`https://github.com/kingyue737/nuxt-echarts/tree/main/playground/components/Chart/${id[0].toUpperCase()}${id.slice(1)}.vue`"
        target="_blank"
        >Source</NButton
      >
    </h3>
    <NCard class="dark:bg-[#100c2a] my-5">
      <slot />
    </NCard>
    <div class="mb-4 w-xl mx-auto text-gray text-sm">
      <slot name="extra" />
    </div>
  </section>
</template>
