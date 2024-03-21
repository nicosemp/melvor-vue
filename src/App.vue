<script setup lang="ts">
import TheSidebar from '@/components/layout/TheSidebar.vue'
</script>

<template>
  <div class="flex h-screen">
    <TheSidebar />

    <RouterView />
  </div>
</template>
