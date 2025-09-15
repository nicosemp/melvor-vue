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

const isActive = computed(() => woodcuttingStore.activeTreeId === props.treeId)
// const animationSwitcher = computed(() => woodcuttingStore.actionsCount % 2 === 0)
</script>

<template>
  <div
    class="tree"
    :class="{ disabled: !tree.isUnlocked, active: isActive }"
    @click="tree.isUnlocked && woodcuttingStore.toggleActiveAction(props.treeId)"
  >
    <h4 class="text-center">{{ tree.isUnlocked ? TREE.name : 'Locked' }}</h4>

    <div v-if="tree.isUnlocked" class="flex justify-center gap-2">
      <ChipItem :text="`XP ${TREE.exp}`" />
      <ChipItem :text="`${TREE.interval / 1000}s`" />
    </div>

    <img
      :src="
        getAssetUrl(`/woodcutting/${tree.isUnlocked ? TREE.imageName : 'woodcutting-skill'}.svg`)
      "
      :alt="TREE.name"
      class="tree-image"
    />

    <!-- TODO: Remove this Bar and make it global, to allow multi-tree -->
    <!-- <ProgressBar
      :duration="TREE.interval"
      :animate="isActive"
      :animationSwitcher
      :isDisabled="!isUnlocked"
    /> -->

    <div v-if="!tree.isUnlocked" class="flex justify-center">
      <ChipItem
        :text="`Level ${TREE.requirements.level}`"
        type="danger"
        class="w-full text-center"
      />
    </div>

    <div v-if="tree.isUnlocked" class="tree-data">
      <div class="flex items-end gap-2">
        <img :src="getAssetUrl('/general/mastery.svg')" alt="Mastery" class="h-6" />
        <p>{{ tree.level }}</p>
      </div>
      <div class="grow text-center">
        <ChipItem
          :text="`${tree.expOverCurrentLevel} / ${tree.expToNextLevel} XP`"
          :size="'small'"
          class="mb-2"
        />
        <ProgressBar :width="(tree.expOverCurrentLevel / tree.expToNextLevel) * 100" size="small" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree {
  @apply flex flex-col gap-2;
  @apply p-4 rounded-lg w-56;
  @apply bg-slate-700 transition-all;
  &:not(.disabled) {
    @apply hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 cursor-pointer;
  }
  &.active {
    @apply bg-slate-800;
  }
  .tree-image {
    @apply w-20 mx-auto;
  }
  .tree-data {
    @apply flex justify-between gap-2 items-center;
  }
}
</style>
