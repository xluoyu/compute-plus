<script setup lang="ts">
import { gsap } from 'gsap'
import Trophy from './trophy.vue'
import Aperture from './aperture.vue'

const status = ref(true)

const data = reactive({
  score: 0,
})

const open = (options: {
  score: number
  total: number
}) => {
  // data.score = options.score

  gsap.to(data, {
    duration: 3,
    score: options.score,
    ease: 'power1.out',
    onUpdate: () => {
      data.score = Math.round(data.score)
    },
  })

  setTimeout(() => {
    console.log(data.score)
  }, 3000)
}

open({
  score: 60,
  total: 10,
})

</script>

<template>
  <div v-if="status" class="mask">
    <div class="flex flex-col items-center justify-evenly h-full mx-4">
      <div>
        <h2 class="text-2xl text-white">
          {{ data.score }}
        </h2>
        <Trophy :num="data.score" />
      </div>
      <div class="flex justify-center gap-[10%] w-full">
        <button class="btn bg-gray-500">
          返回首页
        </button>
        <button class="btn bg-[#ff7904]">
          进入下一关
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn{
  padding: 5px 40px;
  color: #fff;
  font-size: 24px;
  transform: skewX(-17deg);
  position: relative;
  &:hover{
    opacity: .8;
  }
}
</style>
