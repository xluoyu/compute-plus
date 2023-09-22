<script setup lang="ts">
import { defaultConfig, useAnswerRecord, useCreateQuestion } from '~/composables'
const route = useRoute()

const playOptions = computed(() => {
  if (route.query.type) {
    return defaultConfig[route.query.type as unknown as keyof typeof defaultConfig]
  } else if (route.query.range || route.query.methods) {
    return {
      range: route.query.range ? Number(route.query.range) : 10,
      methods: route.query.methods ? (route.query.methods as string).split(',') : defaultConfig[1].methods,
    }
  } else {
    return defaultConfig[1]
  }
})

const { questionList, generate } = useCreateQuestion(playOptions.value)

const questionIndex = ref<number>(-1)

const curQuestion = computed(() => questionList.value[questionIndex.value])
const curQuestionIndex = computed(() => Math.min(questionIndex.value + 1, questionList.value.length))

const beginRoll = () => {
  const timer = setInterval(() => {
    (questionIndex.value as number) += 1

    console.log(questionIndex.value)
    if (questionIndex.value >= questionList.value.length) {
      clearInterval(timer)
    }
  }, 1500)
}

onMounted(() => {
  generate(5)

  // beginRoll()
})

const { showCurAnswer, setSubmitBefore, handleCurAnswer } = useAnswerRecord()

setSubmitBefore(() => {
  console.log('准备提交答案')
})
</script>

<template>
  <div class="px-3 h-full">
    <Header title="关卡2" />

    <div class="flex flex-col h-[calc(100%-var(--header-h))] justify-around">
      <div class="box">
        <div class="title">
          <span>题目</span>
          <span>{{ curQuestionIndex }} / {{ questionList.length }}</span>
        </div>
        <div class="box-content">
          <Transition name="roll">
            <div v-if="curQuestion" :key="curQuestion.i" class="grid grid-cols-5 !w-2/3 mx-auto">
              <span>{{ curQuestion.a }}</span>
              <span>{{ curQuestion.fn }}</span>
              <span>{{ curQuestion.b }}</span>
              <span> = </span>
              <span> ? </span>
            </div>
            <div v-else-if="questionIndex > 0 && curQuestionIndex === questionList.length">
              题目播放完毕
            </div>
            <div v-else>
              准备开始
            </div>
          </Transition>
        </div>
      </div>
      <div class="box">
        <div class="title">
          解答
        </div>
        <div class="box-content">
          {{ showCurAnswer }}
        </div>
      </div>

      <Keyboard :handle-cur-answer="handleCurAnswer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box{
  .title{
    display: flex;
    justify-content: space-between;
    color: #777;
  }
  .box-content{
    height: 74px;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid #febd84;
    background-color: #fcecde;
    border-radius: 6px;
    font-size: 32px;
    // padding: 12px 0;
    margin: 16px auto;
    position: relative;
    // display: flex;
    // flex-direction: column-reverse;
    // justify-content: center;
    >div{
      position: absolute;
      left: 0;
      right: 0;
      top: 12px;
      width: 100%;
      margin: 0 auto;
    }
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
