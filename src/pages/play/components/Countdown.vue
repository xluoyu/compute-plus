<script setup lang="ts">
/**
 * 全屏倒计时
 * 默认3s
 */
const emits = defineEmits<{
  (e: 'downEnd'): void
}>()

const showStatus = ref(false)
const num = ref<null | number>(null)

const timer = ref<NodeJS.Timer>()

/**
 * 开始倒计时层
 */
const beginDown = () => {
  showStatus.value = true
  num.value = 3

  timer.value = setInterval(() => {
    (num.value as number) -= 1

    if (num.value === 0) {
      clearInterval(timer.value)
      showStatus.value = false

      emits('downEnd')
    }
  }, 1000)
}

defineExpose({
  beginDown,
})
</script>

<template>
  <div v-if="showStatus" class="mask">
    <Transition name="countdown">
      <div :key="num || ''" class="absolute top-1/4 mx-auto text-3xl text-slate-200 left-0 right-0">
        {{ num }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.countdown-enter-from{
  transform: scale(2.5);
}
.countdown-enter-active {
  transition:transform 0.4s;
}
.countdown-enter-to{
  transform: scale(1);
}
</style>
