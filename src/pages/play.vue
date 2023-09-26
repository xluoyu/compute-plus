<script setup lang="ts">
import { defaultConfig, useAnswerRecord, useCreateQuestion } from '~/composables'
import type Question from '~/components/Question.vue'
import CarbonCheckmarkOutline from '~icons/carbon/checkmark-outline'
import CarbonCloseOutline from '~icons/carbon/close-outline'

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
const curAnswerResult = ref(0)
const answerArea = ref<HTMLDivElement>()

const showCurResultAnime = (result: boolean): Promise<void> => {
  return new Promise((resolve) => {
    /**
     * 动画结束
     */
    const animeEndFn = () => {
      curAnswerResult.value = 0
      resolve()
      answerArea.value!.removeEventListener('animationend', animeEndFn)
    }

    answerArea.value!.addEventListener('animationend', animeEndFn, false)

    curAnswerResult.value = result ? 1 : 2
  })
}

const router = useRouter()

const { showCurAnswer, handleCurAnswer } = useAnswerRecord({
  submitBefore: async(answer, index) => {
    const curQuestion = questionList.value[index]
    const result = curQuestion.answer === answer

    await showCurResultAnime(result)

    return result
  },
  submitEnd: (list) => {
    console.log('游戏提交', list)

    if (list.length === questionList.value.length) {
      console.log('最终得分', list.filter(Boolean).length, list)

      router.push('/result')
    }
  },
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
          <div ref="answerArea" class="answerArea" :class="curAnswerResult === 1 ? 'answer-success' : curAnswerResult === 2 ? 'answer-error' : ''">
            {{ showCurAnswer }}
            <CarbonCheckmarkOutline v-show="curAnswerResult === 1" />
            <CarbonCloseOutline v-show="curAnswerResult === 2" />
          </div>
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
  }

  .answerArea{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}

.answer-success{
  animation: success-animation .3s ease;

}
.answer-error{
  color: rgb(218, 6, 6);
  animation: error-animation .3s ease;
}
@keyframes success-animation {
  0% {
    color: inherit;
  }
  100% {
    color: #59cb0c;
  }
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
</style>
