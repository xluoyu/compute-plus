<script setup lang="ts">

</script>

<template>
  <div class="keyboard grid gap-2 justify-center items-center" style="">
    <div class="btn">
      7
    </div>
    <div class="btn">
      8
    </div>
    <div class="btn">
      9
    </div>
    <div class="btn row-span-2">
      backspace
    </div>
    <div class="btn">
      4
    </div>
    <div class="btn">
      5
    </div>
    <div class="btn">
      6
    </div>
    <div class="btn">
      1
    </div>
    <div class="btn">
      2
    </div>
    <div class="btn">
      3
    </div>
    <div class="btn row-span-2">
      enter
    </div>
    <div class="btn col-span-3">
      0
    </div>
  </div>
</template>

<style scoped>
.keyboard{
  grid-template-rows: repeat(4, 60px);
  grid-template-columns: repeat(auto-fill, 60px);
}
.btn{
  @apply bg-sky-300 full items-center text-white rounded-sm;
}

</style>
