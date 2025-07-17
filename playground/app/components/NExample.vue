<script setup lang="ts">
defineProps<{ id: string; title: string; desc: string }>()
</script>

<template>
  <section>
    <h3 :id="id" class="text-xl">
      <a :href="`#${id}`">
        {{ title }}
        <small class="opacity-70">({{ desc }})</small>
      </a>
      <UButton
        class="ml-2"
        variant="outline"
        color="neutral"
        size="xs"
        :to="`https://github.com/kingyue737/nuxt-echarts/blob/main/playground/components/Chart/${id[0]!.toUpperCase()}${id.slice(1)}.vue`"
        target="_blank"
        >Source</UButton
      >
    </h3>
    <UCard class="my-5 dark:bg-[#100c2a]">
      <slot />
    </UCard>
    <div class="text-muted mx-auto mb-4 w-xl text-sm">
      <slot name="extra" />
    </div>
  </section>
</template>
