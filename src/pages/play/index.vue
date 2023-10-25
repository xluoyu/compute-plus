<script setup lang="ts">
import Countdown from './components/Countdown.vue'
import Header from './components/Header.vue'
import Keyboard from './components/Keyboard.vue'
import Question from './components/Question.vue'
import Guide from './components/Guide.vue'
import Result from './components/Result/index.vue'
import type { CountdownInstance, QuestionInstance, ResultInstance } from './components/index'
import type { IDefaultLevelConfigKeys } from './composables'
import { defaultLevelConfig, useAnswerRecord, useCreateQuestion } from './composables'
import type { ICreateQuestionOptions, IEndlessOptions, IMethods, INormalOptions, IResultOptions, IScoreType } from '~/common'
import CarbonCheckmarkOutline from '~icons/carbon/checkmark-outline'
import CarbonCloseOutline from '~icons/carbon/close-outline'

const route = useRoute()
const router = useRouter()

watch(() => route.query, () => {
  window.location.reload()
})

/**
 * 根据url的参数，获取入参
 *
 * 返回创建题目所需的参数
 */
const playOptions = computed<ICreateQuestionOptions>(() => {
  switch (route.query.type) {
    case 'endless':
      return {
        type: 'endless',
        errNumber: 3,
        methods: defaultLevelConfig[3].methods,
      }
    case 'diy':
      if (!(route.query.range && route.query.methods && route.query.successType)) {
        return { type: 'normal', level: 1, ...defaultLevelConfig[1] }
      }
      return {
        type: 'diy',
        range: Number(route.query.range),
        methods: (route.query.methods as string).split(',') as IMethods[],
        successType: route.query.successType as ('normal' | 'endless'),
        accuracy: Number(route.query.accuracy),
        questionNum: Number(route.query.questionNum),
        errNumber: Number(route.query.errNumber),
      }
    default:
      /**
       * 记录当前的关卡
       */
      localStorage.setItem('level', (route.query.level || '1') as string)

      if (route.query.level) {
        return { type: 'normal', level: Number(route.query.level), ...defaultLevelConfig[route.query.level as unknown as IDefaultLevelConfigKeys] }
      } else {
        return { type: 'normal', level: 1, ...defaultLevelConfig[1] }
      }
  }
})

/**
 * 计分方式
 */
const scoreType = computed<IScoreType>(() => {
  switch (playOptions.value.type) {
    case 'normal':
      return 'percentage'
    case 'endless':
      return 'score'
    case 'diy':
      if (playOptions.value.successType === 'normal') {
        return 'percentage'
      } else {
        return 'score'
      }
  }
})

const countDownRef = ref<CountdownInstance>()
const questionRef = ref<QuestionInstance>()
const resultRef = ref<ResultInstance>()

/**
 * 建立题目创建功能
 *
 * 返回：题目列表
 */
const { questionList } = useCreateQuestion(playOptions.value)

/**
 * 根据题目结果，展示不用动画
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

/**
 * 实例化答题栏目
 */
const { showCurAnswer, handleCurAnswer, answerRecord, answerIndex } = useAnswerRecord({
  getSubmitResult: async(answer, index) => {
    const curQuestion = questionList.value[index]
    const result = curQuestion.answer === answer

    await showCurResultAnime(result)

    return result
  },
  submitEnd: (list: boolean[]) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (!isGameOver(list)) {
      return
    }

    const trueNum = list.filter(Boolean).length
    const allNum = list.length
    const falseNum = allNum - trueNum

    const options: IResultOptions = {
      type: scoreType.value,
      num: 0,
      result: false,
    }

    /**
   * 计算分数，是否通过
   */
    if (scoreType.value === 'percentage') {
      const num = Math.floor(trueNum / allNum * 100)

      options.result = num >= (playOptions.value as INormalOptions).accuracy
      options.num = num
    } else {
      options.num = trueNum
      options.result = falseNum <= (playOptions.value as IEndlessOptions).errNumber
    }

    /**
     * 闯关模式时，需要跳到下一关
     */
    if (playOptions.value.type === 'normal' && playOptions.value.level < 3) {
      const curLevel = playOptions.value.level
      options.nextFn = () => {
        router.replace(`/play?level=${curLevel + 1}`)
      }
    }

    resultRef.value!.open(options)
  },
})

/**
 * 错题数量
 */
const errNumber = computed(() => answerRecord.value.filter(item => !item).length)

/**
 * 判断游戏是否结束
 *
 * 百分比模式， 需要打完所有题
 *
 * 记分模式，判断错题是否达到标准
 *
 * @param list 答题记录列表
 */
const isGameOver = (list: boolean[]) => {
  if (scoreType.value === 'percentage') {
    if (list.length === questionList.value.length) {
      return true
    }
  } else {
    if (errNumber.value > (playOptions.value as IEndlessOptions).errNumber) {
      return true
    }
  }

  return false
}

/**
 * ---- 开始游戏 ----
 */
/**
 * 进入倒计时
 */
const ready = () => {
  countDownRef.value!.beginDown()
}

/**
 * 生成题目，开始滚动
 */
const beginPlay = () => {
  questionRef.value!.begin()
}

/**
 * 当前滚动到的考题下标
 */
const curIndex = computed(() => questionRef.value?.curQuestionIndex || 0)

const lockStatus = computed(() => curIndex.value < 3)

</script>

<template>
  <div class="px-3 h-full">
    <Header title="关卡2" />
    <div class="flex flex-col h-[calc(100%-var(--header-h))] justify-around">
      <Question ref="questionRef" :list="questionList" />
      <div class="box">
        <div class="title flex justify-between">
          <span>答题</span>
          <div v-if="scoreType === 'percentage'">
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
