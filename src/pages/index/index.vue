<script setup lang="ts">
import GameTitle from './Title.vue'
</script>

<template>
  <div class="mx-8">
    <GameTitle />

    <div class="grid grid-cols-2 gap-3">
      <button class="btn">
        开始
      </button>
      <button class="btn">
        继续
      </button>
      <button class="btn col-span-2">
        自定义
      </button>
    </div>
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
