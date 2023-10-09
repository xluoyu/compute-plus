<script setup lang="ts">
import GameTitle from './Title.vue'
import CarbonLogoGithub from '~icons/carbon/logo-github'
</script>

<template>
  <div class="mx-8 flex flex-col justify-around h-full">
    <GameTitle />

    <div class="grid grid-cols-2 gap-3">
      <button class="btn">
        开始闯关
      </button>
      <button class="btn">
        继续
      </button>
      <button class="btn col-span-2">
        无尽模式
      </button>
      <button class="btn col-span-2">
        自定义
      </button>
    </div>

    <a herf="https://github.com/xluoyu/compute-plus" class="text-xl block mx-auto">
      <CarbonLogoGithub />
    </a>
  </div>
</template>

<style scoped>
.btn{
  @apply bg-white rounded w-full py-3 cursor-pointer hover:bg-gray-200;
}

.test{
  transform: perspective(5em) rotateX(-10deg);
}
</style>
