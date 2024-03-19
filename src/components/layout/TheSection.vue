<script setup lang="ts"></script>

<template>
  <section>
    <div class="container">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
section {
  @apply py-8 bg-opacity-60;
}
</style>
