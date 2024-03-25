<script setup lang="ts">
const props = defineProps<{
  /**
   * The width of the progress bar in percentage.
   * This is overriden by the `animate` prop, if true.
   * @default 0
   * @example 50
   */
  width?: number

  /**
   * Whether the progress bar should animate or not.
   * @default false
   */
  animate?: boolean

  /**
   * The duration of the progress bar animation in milliseconds.
   * @default 0
   * @example 4000
   */
  duration?: number

  /**
   * Swap between true and false to restart the animation from the beginning.
   */
  animationSwitcher?: boolean

  /**
   * Whether the progress bar should be disabled or not.
   */
  isDisabled?: boolean
}>()
</script>

<template>
  <div class="progress-bar" :class="{ disabled: props.isDisabled }">
    <div
      class="progress"
      :class="[
        { animate, 'transition-all': !animate },
        props.animationSwitcher ? 'animate-v1' : 'animate-v2'
      ]"
      :style="{ 'animation-duration': `${props.duration ?? 0}ms`, width: `${props.width ?? 0}%` }"
    ></div>
  </div>
</template>

<style scoped>
.progress-bar {
  @apply h-6 bg-green-400 rounded-lg overflow-hidden;
  &.disabled {
    @apply bg-gray-300;
  }
  .progress {
    @apply h-full bg-green-600;
    &.animate {
      animation: linear 0s 1 normal none running;
      &.animate-v1 {
        animation-name: progressBarV1;
      }
      &.animate-v2 {
        animation-name: progressBarV2;
      }
    }
  }
}

@keyframes progressBarV1 {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes progressBarV2 {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
