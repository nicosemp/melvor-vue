<script setup lang="ts">
const props = defineProps<{
  text: string
  size?: 'small' | 'medium'
  type?: 'default' | 'danger'
}>()
</script>

<template>
  <div class="chip" :class="[size, type]">
    {{ props.text }}
  </div>
</template>

<style scoped>
.chip {
  @apply inline-block px-2 py-1 bg-sky-500 text-black rounded-full text-xs font-bold;
  &.small {
    @apply py-0;
  }
  &.danger {
    @apply bg-red-400 text-white;
  }
}
</style>
