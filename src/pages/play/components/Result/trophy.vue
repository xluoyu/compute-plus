<script setup lang="ts">
const props = withDefaults(defineProps<{
  num: number
}>(), {
  num: 0,
})

const nums = computed(() => `${100 - props.num}%`)
</script>

<template>
  <div class="w-[200px] aspect-[771/963] trophy  drop-shadow-[0_5px_15px_rgba(255,243,171,0.7)]">
    <img src="@/assets/jiangbei.png" :style="{'--nums': nums}" class="show-trophy">
  </div>
</template>

<style lang="scss" scoped>
@property --nums {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.trophy{
  position: relative;
  animation: shake 1s;
  &::before{
    content: '';
    width: 100%;
    height: 100%;
    background: url('@/assets/jiangbei.png') no-repeat;
    filter: grayscale(100%);
    background-size: cover;
  }
  &::before, img{
    position: absolute;
    top: 0;
    left: 0;
  }
  .show-trophy{
    mask-image: linear-gradient(to bottom, transparent var(--nums), #fff  var(--nums));
    transition: mask .3s;
  }
}

@keyframes shake {
  0%{
    scale: .6;
  }
  12.5%, 62.5%{
    rotate: -10deg;
  }
  50%{
    scale: 1;
  }
  37.5%, 87.5%{
    rotate: 10deg;
  }
}
</style>
