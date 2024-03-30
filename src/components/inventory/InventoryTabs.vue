<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['a', 'b', 'c']

const dragHoveredTab = ref<string | null>(null)
const handleOnDragEnter = (tab: string) => {
  dragHoveredTab.value = tab
}

const handleOnDrop = (event: DragEvent, tab: string) => {
  console.log('drop', tab, event)
  dragHoveredTab.value = null
}
</script>

<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="tab in tabs"
      :key="tab"
      @dragenter.prevent="(_e) => handleOnDragEnter(tab)"
      @dragleave.prevent="(_e) => (dragHoveredTab = null)"
      @dragover.prevent
      @drop="(e) => handleOnDrop(e, tab)"
      :class="{ 'drag-entered': dragHoveredTab === tab }"
    >
      {{ tab }}
    </div>
  </div>
</template>

<style scoped>
.tabs {
  @apply flex;
  @apply bg-slate-800 rounded-t-xl;
}
.tab {
  @apply h-16 w-16 p-2 rounded-lg cursor-pointer;
  @apply bg-slate-700 transition-colors;
  &:not(:last-child) {
    @apply rounded-r-none border-r-2 border-slate-800;
  }
  &:not(:first-child) {
    @apply rounded-l-none;
  }
  &.selected {
    @apply bg-slate-600;
  }
  &.drag-entered {
    @apply bg-slate-600;
  }
}
</style>
