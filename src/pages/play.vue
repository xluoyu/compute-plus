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

/**
 *
 * @param result
 */
const resultClassName = ref('')
const answerArea = ref<HTMLDivElement>()

const showCurResultAnime = (result: boolean): Promise<void> => {
  return new Promise((resolve) => {
    resultClassName.value = result ? 'success-anime' : 'error-anime'
    const animeEndFn = () => {
      console.log('动画结束')
      resultClassName.value = ''
      resolve()
      // answerArea.value!.removeEventListener('animationend', animeEndFn)
    }

    setTimeout(() => {
      animeEndFn()
    }, 300)

    // answerArea.value!.addEventListener('animationend', animeEndFn)
  })
}

const { showCurAnswer, handleCurAnswer } = useAnswerRecord({
  submitBefore: async(answer, index) => {
    const curQuestion = questionList.value[index]
    const result = curQuestion.answer === answer

    await showCurResultAnime(result)

    return result
  },
  submitEnd: (list) => {
    if (list.length === questionList.value.length) {
      console.log('游戏结束')
      console.log('最终得分', list.filter(Boolean).length, list)
    }
  },
},
)
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
        <div ref="answerArea" class="box-content" :class="resultClassName">
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
    line-height: 74px;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid #febd84;
    background-color: #fcecde;
    border-radius: 6px;
    font-size: 32px;
    margin: 16px auto;
    position: relative;
    transform: all .3s;
    >div{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      margin: 0 auto;
    }
  }
}

.success-anime{
  color: green
}
.error-anime{
  color: red
}
</style>
