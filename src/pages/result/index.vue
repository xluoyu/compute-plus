<script setup lang="ts">
import { gsap } from 'gsap'
import Trophy from './trophy.vue'
import { answerRecord } from '~/composables'

const score = computed(() => {
  return answerRecord.value.filter(Boolean).length
})

const d = reactive({
  nums: 0,
})

const v = ref(false)

const test = () => {
  v.value = true

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
  <div>
    结果 {{ score }} {{ d.nums }}
  </div>
  <trophy :num="d.nums" />
  <div @click="test">
    点击
  </div>
</template>

<style lang="scss" scoped>

</style>
