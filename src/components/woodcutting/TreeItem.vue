<script setup lang="ts">
import { computed } from 'vue'

import ProgressBar from '@/components/ProgressBar.vue'
import ChipItem from '@/components/ui/ChipItem.vue'
import { TREES } from '@/constants/woodcutting'
import { useWoodcuttingStore } from '@/stores/woodcutting'
import type { TreeId } from '@/types/woodcutting'
import { getAssetUrl } from '@/utils/assets'

const props = defineProps<{
  treeId: TreeId
}>()

const woodcuttingStore = useWoodcuttingStore()

const TREE = TREES[props.treeId]
const tree = woodcuttingStore.trees[props.treeId]

const isUnlocked = computed(() => woodcuttingStore.level >= TREE.requirements.level)
const isActive = computed(() => woodcuttingStore.activeTreeId === props.treeId)
const animationSwitcher = computed(() => woodcuttingStore.actionsCount % 2 === 0)
</script>

<template>
  <div
    class="tree"
    :class="{ disabled: !isUnlocked, active: isActive }"
    @click="isUnlocked && woodcuttingStore.toggleActiveAction(props.treeId)"
  >
    <h4 class="mb-2 text-center">{{ isUnlocked ? TREE.name : 'Locked' }}</h4>

    <img
      :src="getAssetUrl(`/woodcutting/${isUnlocked ? TREE.imageName : 'woodcutting-skill'}.svg`)"
      :alt="TREE.name"
    />

    <div class="flex justify-center gap-2">
      <template v-if="isUnlocked">
        <ChipItem :text="`XP ${TREE.exp}`" />
        <ChipItem :text="`${TREE.interval / 1000}s`" />
      </template>

      <ChipItem v-else :text="`Level ${TREE.requirements.level}`" :type="!isUnlocked && 'danger'" />
    </div>

    <div class="pt-2"></div>

    <!-- TODO: Remove this Bar and make it global, to allow multi-tree -->
    <ProgressBar
      :duration="TREE.interval"
      :animate="isActive"
      :animationSwitcher
      :isDisabled="!isUnlocked"
    />

    <ProgressBar :width="(tree.expOverCurrentLevel / tree.expToNextLevel) * 100" size="small" />

    {{ tree.level }} - {{ tree.masteryExp }}
  </div>
</template>

<style scoped>
.tree {
  @apply p-4 rounded-lg w-56;
  @apply bg-slate-700 transition-all;
  &:not(.disabled) {
    @apply hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 cursor-pointer;
  }
  &.active {
    @apply bg-slate-800;
  }
  img {
    @apply w-20 pb-2 mx-auto;
  }
}
</style>
