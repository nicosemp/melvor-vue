<script setup lang="ts">
import TheSidebar from '@/components/layout/TheSidebar.vue'
</script>

<template>
  <div class="flex h-screen">
    <TheSidebar class="shrink-0" />

    <div class="grow">
      <RouterView />
    </div>
  </div>
</template>
