<script setup lang="ts">
import { defaultConfig, useAnswerRecord, useCreateQuestion } from '~/composables'
import type Question from '~/components/Question.vue'
const route = useRoute()

/**
 * 根据url的参数，获取入参
 */
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

const questionRef = ref<InstanceType<typeof Question> | null>(null)

const beginPlay = () => {
  generate(5)

  questionRef.value?.begin()
}

const { showCurAnswer, setSubmitBefore, handleCurAnswer } = useAnswerRecord()

setSubmitBefore(() => {
  console.log('准备提交答案')
})
</script>

<template>
  <div class="px-3 h-full">
    <Header title="关卡2" />

    <Countdown @begin="beginPlay" />

    <div class="flex flex-col h-[calc(100%-var(--header-h))] justify-around">
      <Question ref="questionRef" :list="questionList" />
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

<style lang="scss">
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
    margin: 16px auto;
    position: relative;
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

</style>
