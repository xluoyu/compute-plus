<script setup lang="ts">
import { isString } from 'lodash-es'
import { useCreateQuestion } from '../composables/core'

const props = defineProps<{
  nums: number
}>()

const { curQuestion, goNextQuestion, allQuestionLength } = useCreateQuestion()

/**
 * 题目开始滚动
 */
const timer = ref<NodeJS.Timer>()
const scrolledNum = ref(0)

const lockStatus = computed(() => scrolledNum.value <= props.nums)

/**
 * 滚动问题框
 */
const scrollQuestion = () => {
  scrolledNum.value = Math.min(scrolledNum.value + 1, allQuestionLength.value)
  goNextQuestion()
}

const autoScrollQuestion = () => {
  scrollQuestion()
  if (scrolledNum.value > props.nums) {
    clearInterval(timer.value)
  }
}

const pause = () => {
  clearInterval(timer.value)
}

const againBegin = () => {
  if (scrolledNum.value <= props.nums) {
    autoScrollQuestion()
    timer.value = setInterval(autoScrollQuestion, 1300)
  }
}

const begin = () => {
  setTimeout(() => {
    autoScrollQuestion()
    timer.value = setInterval(autoScrollQuestion, 1300)
  }, 500)
}

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
})

defineExpose({
  begin,
  lockStatus,
  scrollQuestion,
  pause,
  againBegin,
})

</script>

<template>
  <div class="box">
    <div class="title">
      <span>题目</span>
      <span>{{ scrolledNum }} / {{ allQuestionLength }}</span>
    </div>
    <div class="box-content question-area">
      <Transition name="roll">
        <div v-if="isString(curQuestion)" :key="curQuestion">
          {{ curQuestion }}
        </div>
        <div v-else :key="curQuestion.i" class="grid grid-cols-5 !w-2/3 mx-auto">
          <span>{{ curQuestion.a }}</span>
          <span>{{ curQuestion.fn }}</span>
          <span>{{ curQuestion.b }}</span>
          <span> = </span>
          <span> ? </span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-area{
  >div{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    margin: 0 auto;
  }
}
.roll-leave-active {
  transition:transform 0.5s;
}
.roll-enter-from{
  transform: translateY(-100%) perspective(2em) rotateX(25deg) scale(.9);
}
.roll-enter-active {
  transition:transform 0.5s;
}
.roll-enter-to{
  transform: translateY(0) perspective(2em) rotateX(0deg) scale(1);
}
.roll-leave-to {
  transform: translateY(100%) perspective(2em) rotateX(-25deg)  scale(.9);
}
</style>
