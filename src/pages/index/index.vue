<script setup lang="ts">
import GameTitle from './Title.vue'
</script>

<template>
  <div>
    <GameTitle />
    <h3 class="test">
      选择难度
    </h3>
    <div class="flex flex-col items-center gap-3">
      <routerLink to="/play?type=1" class="btn">
        入门
      </routerLink>
      <routerLink to="/play?type=2" class="btn">
        普通
      </routerLink>
      <routerLink to="/play?type=3" class="btn">
        困难
      </routerLink>
      <routerLink to="/play?type=4" class="btn">
        地狱
      </routerLink>
      <button class="btn">
        HELP
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn{
  @apply bg-white rounded w-[80%] max-w-lg py-3 cursor-pointer hover:bg-gray-200;
}

.test{
  transform: perspective(5em) rotateX(-10deg);
}
</style>
