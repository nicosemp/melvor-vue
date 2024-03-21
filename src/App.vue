<script setup lang="ts">
import TheSidebar from '@/components/layout/TheSidebar.vue'
</script>

<template>
  <div class="flex h-screen">
    <TheSidebar />

    <div class="grow">
      <RouterView />
    </div>
  </div>
</template>
