<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="chip">
    {{ props.text }}
  </div>
</template>

<style scoped>
.chip {
  @apply inline-block px-2 py-1 bg-slate-800 text-white rounded-full text-xs;
}
</style>
