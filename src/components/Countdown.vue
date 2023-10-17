<script setup lang="ts">
/**
 * 全屏倒计时
 * 默认3s
 */
const emits = defineEmits<{
  (e: 'begin'): void
}>()

const showStatus = ref(true)
const num = ref<null | number>(null)

const timer = ref<NodeJS.Timer>()

const beginDown = () => {
  num.value = 3

  timer.value = setInterval(() => {
    (num.value as number) -= 1

    if (num.value === 0) {
      clearInterval(timer.value)
      showStatus.value = false

      emits('begin')
    }
  }, 1000)
}

onMounted(beginDown)
</script>

<template>
  <div v-if="showStatus" class="fixed top-0 left-0 bg-black bg-opacity-60 w-full h-full z-10">
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
