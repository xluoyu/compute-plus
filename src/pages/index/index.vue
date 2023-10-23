<script setup lang="ts">
import GameTitle from './Title.vue'
import CarbonLogoGithub from '~icons/carbon/logo-github'
const router = useRouter()

type BtnKeys = 'continue' | 'begin' | 'endless' | 'diy'

const curLevel = localStorage.getItem('level') || '1'

const handleClick = (key: BtnKeys) => {
  switch (key) {
    case 'begin':
      router.push('/play')
      break
    case 'continue':
      router.push(`/play?level=${curLevel}`)
      break
    case 'endless':
      router.push('/play?type=endless')
      break
    case 'diy':
      router.push('/diy')
      break
  }
}
</script>

<template>
  <div class="mx-8 flex flex-col justify-around h-full">
    <GameTitle />

    <div class="flex flex-col items-center gap-5">
      <a-btn @click="handleClick('begin')">
        开始闯关
      </a-btn>
      <a-btn @click="handleClick('continue')">
        继续
      </a-btn>
      <a-btn class="col-span-2" @click="handleClick('endless')">
        无尽模式
      </a-btn>
      <a-btn class="col-span-2" @click="handleClick('diy')">
        自定义
      </a-btn>
    </div>

    <a herf="https://github.com/xluoyu/compute-plus" class="text-xl block mx-auto">
      <CarbonLogoGithub />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.test{
  transform: perspective(5em) rotateX(-10deg);
}
</style>
