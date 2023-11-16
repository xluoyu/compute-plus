<script setup lang="ts">
import { gsap } from 'gsap'
import Trophy from './trophy.vue'
import type { IResultOptions } from '~/common'

const status = ref(false)

const data = reactive<IResultOptions>({
  num: 0,
  type: 'percentage',
  nextFn: undefined,
  result: false,
})

const open = (options: IResultOptions) => {
  status.value = true
  data.type = options.type
  data.nextFn = options.nextFn
  data.result = options.result
  gsap.to(data, {
    duration: 1.5,
    num: options.num,
    ease: 'power1.out',
    onUpdate: () => {
      data.num = Math.round(data.num)
    },
  })
}

const reload = () => {
  window.location.reload()
}

defineExpose({
  open,
})
</script>

<template>
  <div v-if="status" class="mask">
    <div class="flex flex-col items-center justify-around h-full mx-4">
      <div class="text-center w-4/5">
        <p class="-indent-60 text-md mb-3 text-slate-200 italic">
          {{ data.type === 'percentage' ? '准确率' : '得分' }}
        </p>
        <h2 class="text-4xl text-[#fff5c2]">
          {{ data.num + (data.type === 'percentage' ? '%' : '') }}
        </h2>
        <Trophy :num="data.type === 'percentage' ? data.num : 100" class="mx-auto mt-5" />
        <template v-if="data.type === 'percentage'">
          <p v-if="data.result" class="result-text success-text">
            过关啦!
          </p>
          <p v-else class="result-text fail-text">
            失败了!
          </p>
        </template>
      </div>

      <div class="flex justify-center gap-[10%] w-full">
        <router-link to="/" class="btn-skew bg-gray-500">
          返回首页
        </router-link>
        <button v-if="data.result && data.nextFn" class="btn-skew bg-[#ff7904]" @click="data.nextFn">
          进入下一关
        </button>
        <button v-if="!data.result" class="btn-skew bg-[#ff7904]" @click="reload">
          再来一次！
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result-text {
  @apply mt-5 text-3xl;
  background-clip: text;
  color: transparent;
  animation: resultText .6s ease;
  font-weight: 600;
  filter: drop-shadow(0 5px 15px rgba(255,243,171,0.7));
}

.success-text{
  background-image: linear-gradient(to bottom, #FEDF42, #FFA400);
}

.fail-text{
  background-image: linear-gradient(to bottom, #E7E7E7, #a3a3a3);
}

@keyframes resultText {
  0%{
    scale: 0.2
  }
  100%{
    scale: 1
  }
}
</style>
