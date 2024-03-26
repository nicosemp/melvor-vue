<script setup lang="ts">
import { computed } from 'vue'

import ProgressBar from '@/components/ProgressBar.vue'
import ChipItem from '@/components/ui/ChipItem.vue'
import { TREES } from '@/constants/woodcutting'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import type { TreeId } from '@/types/woodcutting'

const props = defineProps<{
  treeId: TreeId
}>()

const tree = TREES[props.treeId]

const woodcuttingStore = useWoodcuttingStore()

const isUnlocked = computed(() => woodcuttingStore.level >= tree.requirements.level)
const isActive = computed(() => woodcuttingStore.activeTreeId === props.treeId)
const animationSwitcher = computed(() => woodcuttingStore.actionsCount % 2 === 0)
</script>

<template>
  <div
    class="tree"
    :class="{ disabled: !isUnlocked }"
    @click="isUnlocked && woodcuttingStore.toggleActiveAction(props.treeId)"
  >
    <h4 class="mb-2 text-center">{{ isUnlocked ? tree.name : 'Locked' }}</h4>

    <div class="flex justify-center gap-2">
      <ChipItem v-if="isUnlocked" :text="`XP: ${tree.exp}`" />
      <ChipItem v-else :text="`Level ${tree.requirements.level}`" :type="!isUnlocked && 'danger'" />
    </div>

    <div class="pt-2"></div>

    <ProgressBar
      :duration="tree.interval"
      :animate="isActive"
      :animationSwitcher
      :isDisabled="!isUnlocked"
    />
  </div>
</template>

<style scoped>
.tree {
  @apply p-4 rounded-lg w-56;
  @apply bg-slate-700 text-white transition-all;
  &:not(.disabled) {
    @apply hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 cursor-pointer;
  }
}
</style>
