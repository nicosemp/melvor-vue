<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory'
import { useWoodcuttingStore } from '@/stores/woodcutting'

import TheHeader from '@/components/layout/TheHeader.vue'
import TheMain from '@/components/layout/TheMain.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import ChipItem from '@/components/ui/ChipItem.vue'
import SkillProgress from '@/components/SkillProgress.vue'

const inventoryStore = useInventoryStore()
const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <TheHeader title="Woodcutting" class="bg-green-600 text-white" />

  <TheMain>
    <SkillProgress
      class="mb-4"
      :level="woodcuttingStore.level"
      :expOverCurrentLevel="woodcuttingStore.expOverCurrentLevel"
      :expToNextLevel="woodcuttingStore.expToNextLevel"
    />

    <div class="trees">
      <div v-for="(tree, treeId) in woodcuttingStore.trees" :key="treeId" class="tree">
        <h3 class="mb-2">{{ tree.name }}</h3>

        <ChipItem
          :text="inventoryStore.items[tree.producedItemId].quantity.toString()"
          class="mb-2"
        />

        <ProgressBar
          :duration="tree.interval"
          :animate="woodcuttingStore.activeTreeId === treeId"
          :animationSwitcher="woodcuttingStore.actionsCount % 2 === 0"
        />

        <button
          class="btn btn-green absolute top-4 right-4"
          :class="{ active: woodcuttingStore.activeTreeId === treeId }"
          @click="woodcuttingStore.toggleActiveAction(treeId)"
        >
          +
        </button>
      </div>
    </div>
  </TheMain>
</template>

<style scoped>
.trees {
  @apply flex flex-wrap gap-4;
}
.tree {
  @apply p-4 rounded-lg bg-slate-700 text-white w-56 relative;
}
</style>
