<script setup lang="ts"></script>

<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  @apply p-4 bg-slate-500 grow;
}
</style>
