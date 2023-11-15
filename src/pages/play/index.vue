<script setup lang="ts">
import Countdown from './components/Countdown.vue'
import Keyboard from './components/Keyboard.vue'
import Question from './components/Question.vue'
import Guide from './components/Guide.vue'
import Result from './components/Result/index.vue'
import type { CountdownInstance, QuestionInstance, ResultInstance } from './components/index'
import { useGame } from './composables/useGame'
import { allQuestionLength } from './composables'
import CarbonCheckmarkOutline from '~icons/carbon/checkmark-outline'
import CarbonCloseOutline from '~icons/carbon/close-outline'
import { IEndlessOptions } from '~/common'

const route = useRoute()
const router = useRouter()

watch(() => route.query, () => {
  window.location.reload()
})

// 倒计时
const countDownRef = ref<CountdownInstance>()
// 问题区
const questionRef = ref<QuestionInstance>()
// 结果弹框
const resultRef = ref<ResultInstance>()
/**
 * 根据题目结果，展示不用动画
 * @param result
 */
const curAnswerResult = ref(0)
const answerArea = ref<HTMLDivElement>()

const {
  initGame,
  playOptions,
  scoreType,
  answerIndex,
  errNumber,
  showCurAnswer,
  handleCurAnswer,
} = useGame({
  scrollQuestion() {
    questionRef.value!.scrollQuestion()
  },
  submitAnswerAfter(result) {
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
  },
  gameOverAfter: (options, playOptions) => {
    /**
     * 闯关模式时，需要跳到下一关
     */
    if (playOptions.type === 'normal' && playOptions.level < 3) {
      const curLevel = playOptions.level
      options.nextFn = () => {
        router.replace(`/play?level=${curLevel + 1}`)
      }
    }

    resultRef.value!.open(options)
  },
})
/**
 * ---- 开始游戏 ----
 */
/**
 * 结束引导层，进入倒计时
 */
const ready = () => {
  countDownRef.value!.beginDown()
}

/**
 * 倒计时结束，生成题目，开始滚动
 */
const beginPlay = () => {
  questionRef.value!.begin()
}

const lockStatus = computed(() => {
  return questionRef.value ? questionRef.value.lockStatus : true
})

const pageTitle = computed(() => {
  switch (playOptions.value.type) {
    case 'normal':
      return `关卡${playOptions.value.level}`
    case 'endless':
      return '无尽模式'
    case 'diy':
      return `自定义 - ${playOptions.value.successType === 'normal' ? '闯关模式' : '无尽模式'}`
  }
})

const pause = () => {
  console.log('暂停')
}

onMounted(() => {
  initGame()
})
</script>

<template>
  <div class="px-3 h-full">
    <Header :title="pageTitle" :right-fn="pause">
      <template #right>
        <span class="text-lg text-slate-500">暂停</span>
      </template>
    </Header>
    <div class="flex flex-col h-[calc(100%-var(--header-h))] justify-around">
      <Question ref="questionRef" :nums="1" />
      <div class="box">
        <div class="title flex justify-between">
          <span>答题</span>
          <div v-if="scoreType === 'percentage' && answerIndex + 1 <= allQuestionLength">
            第{{ answerIndex + 1 }}题
          </div>
          <div v-if="scoreType === 'score'">
            {{ errNumber }} 错误{{ (playOptions as IEndlessOptions).errNumber }}
          </div>
        </div>
        <div class="box-content">
          <div ref="answerArea" class="answerArea" :class="curAnswerResult === 1 ? 'answer-success' : curAnswerResult === 2 ? 'answer-error' : ''">
            {{ showCurAnswer }}
            <CarbonCheckmarkOutline v-show="curAnswerResult === 1" />
            <CarbonCloseOutline v-show="curAnswerResult === 2" />
          </div>
        </div>
      </div>

      <Keyboard :handle-cur-answer="handleCurAnswer" :cur-answer="showCurAnswer" :lock="lockStatus" />
    </div>

    <Guide @close="ready" />
    <Countdown ref="countDownRef" @down-end="beginPlay" />
    <Result ref="resultRef" />
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
    border: 2px solid #fcd1ab;
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
