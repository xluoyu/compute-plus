<script setup lang="ts">
import { gsap } from 'gsap'
import { answerRecord } from '~/composables'

const score = computed(() => {
  return answerRecord.value.filter(Boolean).length
})

const d = reactive({
  nums: 0,
})

const v = ref(false)

const test = () => {
  // v.value = true

  gsap.to(d, {
    duration: 3,
    nums: 70,
    ease: 'power1.out',
    onUpdate: () => {
      d.nums = Math.round(d.nums)
    },
  })
}
</script>

<template>
  <div :class="{anime: v}">
    结果 {{ score }} {{ d.nums }}
  </div>

  <div @click="test">
    点击
  </div>
</template>

<style lang="scss" scoped>
.anime{
  animation: error-animation .2s 2 ease;
}
@keyframes error-animation {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  75% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
