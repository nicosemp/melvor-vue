<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <header class="header">
    <div class="skill-logo">
      <h1>{{ props.title }}</h1>
    </div>

    <div class="options">
      <button class="btn" @click="console.log('SAVE TO CLOUD???')">Save</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  @apply h-20 sticky p-4;
  @apply flex justify-between;
}
</style>
