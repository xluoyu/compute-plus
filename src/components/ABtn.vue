<script setup lang="ts">
withDefaults(defineProps<{
  width: string
}>(), {
  width: '300px',
})

const emits = defineEmits<{
  (e: 'click'): void
}>()

const activeStatus = ref(false)

const handleClick = () => {
  activeStatus.value = true

  setTimeout(() => {
    emits('click')
    activeStatus.value = false
  }, 500)
}

</script>

<template>
  <div class="btn" :class="{'active': activeStatus}" @click="handleClick">
    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect class="outline" height="100%" width="100%" />
    </svg>
    <div class="text">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn{
  --w: v-bind(width);
  --h: 50px;
  --color: #ed8225;
  --a-color: #e9088a;
  width: var(--w);
  height: var(--h);
  cursor:pointer;
  display: block;
  position: relative;
  color: var(--color);
  text-decoration: none;
  overflow: hidden;
  animation: show 1s linear forwards;

  .outline {
    stroke: var(--color);
    transition: .6s;
    stroke-width: 2px;
    fill: transparent;
  }
  .text {
    position: absolute;
    top: 0px;
    line-height: var(--h);
    width: 100%;
    text-align:center;
    font-size: 24px;
    letter-spacing: 1px;
    transition: .6s;
  }
  .outline {
    stroke-dasharray: var(--h) var(--w);
    stroke-dashoffset: -675;
  }
  &:hover{
    .text {
      color: var(--a-color);
    }
  }
  &.active {
    .outline {
      stroke: var(--a-color);
      stroke-dasharray: var(--h) 100;
      stroke-dashoffset: -75;
    }
    .text {
      color: var(--a-color);
    }
  }
}

@keyframes show {
  0%{
    width: 0px;
  }

  100%{
    width: var(--w);
  }
}
</style>
