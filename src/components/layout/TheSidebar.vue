<script setup lang="ts">
// import { RouterView } from 'vue-router'
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <h1>Melvue</h1>
    </div>

    <nav>
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <RouterLink to="/woodcutting">Woodcutting</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-40 h-full bg-slate-600 text-white;
}
.logo {
  @apply p-4;
}
nav a {
  @apply inline-block w-full p-2;
}
</style>
