<script setup lang="ts">
import { gsap } from 'gsap'
import Trophy from './trophy.vue'
import type { IResultOptions, IScoreType } from '~/common'

const status = ref(false)

const data = reactive<{
  num: number
  type: IScoreType
  nextFn: Function | undefined
}>({
  num: 0,
  type: 'percentage',
  nextFn: undefined,
})

const open = (options: IResultOptions) => {
  status.value = true
  data.type = options.type
  data.nextFn = options.nextFn

  gsap.to(data, {
    duration: 2,
    num: options.num,
    ease: 'power1.out',
    onUpdate: () => {
      data.num = Math.round(data.num)
    },
  })
}

defineExpose({
  open,
})
</script>

<template>
  <div v-if="status" class="mask">
    <div class="flex flex-col items-center justify-around h-full mx-4">
      <div class="text-center w-4/5">
        <p class="-indent-60 text-md mb-3 text-slate-200">
          准确率
        </p>
        <h2 class="text-4xl text-[#fff5c2]">
          {{ data.num }} %
        </h2>
        <Trophy :num="data.num" class="mx-auto mt-10" />
        <p class="mt-5 text-3xl text-[#FFA400]">
          过关啦!
        </p>
      </div>

      <div class="flex justify-center gap-[10%] w-full">
        <router-link to="/" class="btn bg-gray-500">
          返回首页
        </router-link>
        <button v-if="data.nextFn" class="btn bg-[#ff7904]" @click="data.nextFn">
          进入下一关
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn{
  padding: 5px 30px;
  color: #fff;
  font-size: 18px;
  transform: skewX(-17deg);
  position: relative;
  mask-image: linear-gradient(90deg, transparent var(--left), #fff 50%,transparent var(--right));
  animation: btnshow 1s ease forwards;
  &:hover{
    opacity: .8;
  }
}

@property --left {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 40%;
}

@property --right {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 60%;
}

@keyframes btnshow {
  0%{
    --left: 40%;
    --right: 60%;
  }
  100%{
    --left: -60%;
    --right: 160%;
  }
}
</style>
