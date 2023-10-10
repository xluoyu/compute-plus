<script setup lang="ts">
import ABtn from './ABtn.vue'
import GameTitle from './Title.vue'
import CarbonLogoGithub from '~icons/carbon/logo-github'
const router = useRouter()
const handleClick = (key: string) => {
  console.log(key)
  router.push('/play')
  // switch (key) {
  //   case value:

  //     break;

  //   default:
  //     break;
  // }
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
