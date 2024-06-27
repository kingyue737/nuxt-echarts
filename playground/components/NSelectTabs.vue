<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
    options: { value: any; label: string }[]
  }>(),
  {
    disabled: false,
  },
)
const input = defineModel<any>()
</script>

<template>
  <fieldset
    class="n-select-tabs n-border-base n-bg-base flex-inline flex-wrap items-center rounded border"
  >
    <label
      v-for="(i, idx) of options"
      :key="i.label"
      :disabled="disabled"
      class="n-border-base hover:n-bg-active px-0.5em py-0.1em relative"
      :class="[
        idx ? 'n-border-base ml--1px border-l' : '',
        i.value === input ? 'n-bg-active' : '',
      ]"
      :title="i.label"
    >
      <div :class="[i.value === input ? '' : 'op35']">{{ i.label }}</div>
      <input
        v-model="input"
        type="radio"
        :disabled="disabled"
        :value="i.value"
        :title="i.label"
        class="op-0.1 absolute inset-0"
      />
    </label>
  </fieldset>
</template>
