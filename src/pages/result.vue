<script setup lang="ts">
import { gsap } from 'gsap'
import { answerRecord } from '~/composables'

const score = computed(() => {
  return answerRecord.value.filter(Boolean).length
})

const d = reactive({
  nums: 0,
})

const v = ref(false)

const test = () => {
  // v.value = true

  gsap.to(d, {
    duration: 3,
    nums: 70,
    ease: 'power1.out',
    onUpdate: () => {
      d.nums = Math.round(d.nums)
    },
  })
}
</script>

<template>
  <div :class="{anime: v}">
    结果 {{ score }} {{ d.nums }}
  </div>
  <div class="text-[48px] ">
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16">

      <!-- 定义线性渐变 -->
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(45)">
          <stop offset="0%" style="stop-color:#fbde5d" />
          <stop offset="100%" style="stop-color:#e9ad07" />
        </linearGradient>

        <!-- 定义遮罩 -->
        <mask id="mask" x="0" y="0" width="100%" height="100%">
          <rect x="0" :y="`-${d.nums}%`" width="100%" height="100%" fill="#eee" />
        </mask>
      </defs>

      <!-- 使用渐变填充路径 -->
      <path fill="url(#gradient)" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
      <path fill="#ccc" mask="url(#mask)" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
    </svg>
  </div>
  <div @click="test">
    点击
  </div>
</template>

<style lang="scss" scoped>
.anime{
  animation: error-animation .2s 2 ease;
  color: #e9ad07;
}
@keyframes error-animation {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-15px);
  }
  75% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0);
  }
}

.trophy {
  transition:.3s;
  // filter: drop-shadow(red 0px 0px);
  // transform: translate(0px, 0px);
  // path {
  //   fill: linear-gradient(to bottom, red, yellow, green);
  // }
}
</style>
