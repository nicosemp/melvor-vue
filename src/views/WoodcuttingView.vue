<script setup lang="ts">
import { useWoodcuttingStore } from '@/stores/woodcutting'

import TheHeader from '@/components/layout/TheHeader.vue'
import TheMain from '@/components/layout/TheMain.vue'
import ProgressSection from '@/components/ProgressSection.vue'
import TreeItem from '@/components/woodcutting/TreeItem.vue'
import { MAX_POOL_EXP, TREE_IDS } from '@/constants/woodcutting'
import { standardNumberFormatter } from '@/utils/format'
import { getAssetUrl } from '@/utils/assets'

const woodcuttingStore = useWoodcuttingStore()
</script>

<template>
  <TheHeader title="Woodcutting" class="bg-green-600">
    <template v-slot:image>
      <img
        :src="getAssetUrl('/woodcutting/woodcutting-skill.svg')"
        alt="Woodcutting"
        class="w-16 h-16 p-2 bg-green-700 rounded-xl"
      />
    </template>
  </TheHeader>

  <TheMain>
    <ProgressSection
      class="mb-4"
      :progress-width="
        (woodcuttingStore.expOverCurrentLevel / woodcuttingStore.expToNextLevel) * 100
      "
      :chip-text="`XP ${standardNumberFormatter(woodcuttingStore.expOverCurrentLevel)}/${standardNumberFormatter(woodcuttingStore.expToNextLevel)}`"
    />

    <ProgressSection
      class="mb-4"
      :progress-width="(woodcuttingStore.masteryPoolExp / MAX_POOL_EXP) * 100"
      :chip-text="`Mastery Pool XP: ${standardNumberFormatter(Math.floor(woodcuttingStore.masteryPoolExp))}/${standardNumberFormatter(MAX_POOL_EXP)}`"
    />

    <div class="trees">
      <TreeItem v-for="treeId in TREE_IDS" :key="treeId" :tree-id="treeId" />
    </div>
  </TheMain>
</template>

<style scoped>
.trees {
  @apply flex flex-wrap gap-4;
}
</style>
