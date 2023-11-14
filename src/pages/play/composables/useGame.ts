import type { IDefaultLevelConfigKeys } from '../utils/config'
import { defaultLevelConfig } from '../utils/config'
import { allQuestionLength, curQuestionIndex, questionList, useCreateQuestion } from './core'
import { answerRecord, useAnswerRecord } from './useAnswer'
import type { ICreateQuestionOptions, IEndlessOptions, IMethods, INormalOptions, IResultOptions, IScoreType } from '~/common'

/**
 * 启动游戏
 *
 * 初始化游戏参数
 */
export const useGame = ({
  submitAnswerAfter,
  gameOverAfter,
  scrollQuestion,
}: {
  /**
   * 下一题
   */
  scrollQuestion: () => void
  /**
   * 提交当前答案后的回调
   * @param a 回答结果
   */
  submitAnswerAfter: (a: boolean) => void | Promise<void>
  /**
   * 游戏结束
   * @param a 得分
   * @param b 游戏初始参数
   */
  gameOverAfter: (a: IResultOptions, b: ICreateQuestionOptions) => void
}) => {
  const route = useRoute()

  /**
   * 游戏启动参数
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

  const { generate } = useCreateQuestion()

  /**
   * 生成考题列表
   * @param num
   */
  const generateQuestionList = (num: number) => {
    generate(playOptions.value, num)
  }

  const errNumber = computed(() => answerRecord.value.filter(item => !item).length)

  const isGameOver = (list: boolean[]) => {
    if (scoreType.value === 'percentage') {
      if (list.length === allQuestionLength.value) {
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
   * 计算得分
   */
  const computedScore = (list: boolean[]) => {
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

    return options
  }

  /**
   * 答题区
   */
  const { answerIndex, showCurAnswer, handleCurAnswer } = useAnswerRecord({
    getSubmitResult: async(answer, index) => {
      const curQuestion = questionList.value[index] // 当前回答的问题
      const result = curQuestion.answer === answer

      await submitAnswerAfter(result) // 提交当前答案后的回调，push到答题数组前

      return result
    },
    submitEnd: (list: boolean[]) => {
      if (isGameOver(list)) {
        gameOverAfter(computedScore(list), playOptions.value)
      } else {
        if (scoreType.value === 'score' && allQuestionLength.value - list.length < 5) {
          generateQuestionList(20)
        }

        if (answerIndex.value + 1 < allQuestionLength.value) {
          scrollQuestion() // 下一题
        }
      }
    },
  })

  /**
   * 初始化
   * 生成题目列表
   */
  const initGame = () => {
    if ('questionNum' in playOptions.value) {
      generateQuestionList(playOptions.value.questionNum)
    } else {
      /**
         * 没有预设questionNum
         *
         * 说明是无尽模式，直接生成20题
         */
      generateQuestionList(20)
    }
  }

  /**
   * 清理数据
   */
  const clearGame = () => {
    questionList.value = []
    answerRecord.value = []
    curQuestionIndex.value = -1
  }

  onUnmounted(clearGame)

  return {
    initGame,
    playOptions,
    scoreType,
    answerIndex,
    errNumber,
    showCurAnswer,
    handleCurAnswer,
  }
}
