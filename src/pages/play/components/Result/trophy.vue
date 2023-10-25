<script setup lang="ts">
const props = withDefaults(defineProps<{
  num: number
}>(), {
  num: 0,
})

const nums = computed(() => `${100 - props.num}%`)
</script>

<template>
  <div class="trophy drop-shadow-[0_5px_15px_rgba(255,243,171,0.7)]">
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
  padding: 20px;
  animation: fade .5s, shake 1s forwards;
  &::before{
    content: '';
    background: url('@/assets/jiangbei.png') no-repeat;
    filter: grayscale(100%);
    background-size: cover;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
  }
  &::before, img{
    width: 200px;
    aspect-ratio: 771/963;
    margin: 0 auto;
  }
  .show-trophy{
    mask-image: linear-gradient(to bottom, transparent var(--nums), #fff  var(--nums));
    transition: mask .3s;
  }
}

@keyframes shake {
  12.5%, 62.5%{
    rotate: -10deg;
  }
  37.5%, 87.5%{
    rotate: 10deg;
  }
}
@keyframes fade {
  0%{
    scale: .6;
  }
  100%{
    scale: 1;
  }
}

</style>
