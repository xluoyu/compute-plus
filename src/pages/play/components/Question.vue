<script setup lang="ts">
import type { IQuestion } from '~/common.d'

const props = defineProps<{
  list: IQuestion[]
}>()

const questionIndex = ref<number>(-1)

const curQuestion = computed(() => props.list[questionIndex.value])
const curQuestionIndex = computed(() => Math.min(questionIndex.value + 1, props.list.length))

/**
 * 题目开始滚动
 */
const beginRoll = () => {
  questionIndex.value += 1

  const timer = setInterval(() => {
    questionIndex.value += 1

    if (questionIndex.value >= props.list.length) {
      clearInterval(timer)
    }
  }, 1500)
}

defineExpose({
  begin: beginRoll,
  curQuestionIndex,
})

</script>

<template>
  <div class="box">
    <div class="title">
      <span>题目</span>
      <span>{{ curQuestionIndex }} / {{ list.length }}</span>
    </div>
    <div class="box-content question-area">
      <Transition name="roll">
        <div v-if="curQuestion" :key="curQuestion.i" class="grid grid-cols-5 !w-2/3 mx-auto">
          <span>{{ curQuestion.a }}</span>
          <span>{{ curQuestion.fn }}</span>
          <span>{{ curQuestion.b }}</span>
          <span> = </span>
          <span> ? </span>
        </div>
        <div v-else-if="questionIndex > 0 && curQuestionIndex === list.length">
          题目播放完毕
        </div>
        <div v-else>
          准备开始
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
