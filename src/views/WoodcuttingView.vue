<script setup lang="ts">
import { useWoodcuttingStore } from '@/stores/woodcutting'

import TheHeader from '@/components/layout/TheHeader.vue'
import TheMain from '@/components/layout/TheMain.vue'
import SkillProgress from '@/components/SkillProgress.vue'
import TreeItem from '@/components/woodcutting/TreeItem.vue'
import { TREES } from '@/constants/woodcutting'

const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <TheHeader title="Woodcutting" class="bg-green-600">
    <template v-slot:image>
      <img
        src="/src/assets/woodcutting/woodcutting-skill.svg"
        alt="Woodcutting"
        class="w-16 h-16 p-2 bg-green-700 rounded-xl"
      />
    </template>
  </TheHeader>

  <TheMain>
    <SkillProgress
      class="mb-4"
      :expOverCurrentLevel="woodcuttingStore.expOverCurrentLevel"
      :expToNextLevel="woodcuttingStore.expToNextLevel"
    />

    <div class="trees">
      <TreeItem v-for="(_tree, treeId) in TREES" :key="treeId" :tree-id="treeId" />
    </div>
  </TheMain>
</template>

<style scoped>
.trees {
  @apply flex flex-wrap gap-4;
}
</style>
