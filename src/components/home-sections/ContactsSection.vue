<script setup lang="ts">
import { ref } from 'vue'

import TheSection from '@/components/layout/TheSection.vue'
import BrevoForm from '@/components/BrevoForm.vue'

const isButtonFlipped = ref(false)
</script>

<template>
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection>
    <div class="flip-container" :class="{ flipped: isButtonFlipped }">
      <div class="flipper">
        <div class="front" @click="isButtonFlipped = true">Hello</div>
        <div class="back">
          <p @click="isButtonFlipped = false">Close</p>
          <BrevoForm />
        </div>
      </div>
    </div>
  </TheSection>
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
  <TheSection />
</template>

<style scoped>
.flip-container {
  perspective: 1000px;
  @apply h-12 w-full;
}

.flipper {
  @apply h-16 w-32 absolute top-0 left-0;
  transition: 0.4s;
  transform-style: preserve-3d;
}

.flip-container.flipped .flipper {
  @apply top-1/2 left-1/2;
  transform: rotateY(180deg) translate(50%, -50%);
  width: calc(600px + 2rem);
  height: 850px;
}

.front,
.back {
  @apply p-4 h-full w-full absolute top-0 left-0 rounded-lg;
  backface-visibility: hidden;
}

.front {
  @apply bg-blue-500 flex justify-center items-center;
  transform: rotateY(0deg);
}

.back {
  @apply bg-blue-700 overflow-scroll;
  transform: rotateY(180deg);
}
</style>
