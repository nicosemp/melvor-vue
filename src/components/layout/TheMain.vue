<script setup lang="ts"></script>

<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  /* TODO: I don't like this height calculation */
  @apply p-4 bg-slate-500 h-[calc(100vh-5rem)];
}
</style>
