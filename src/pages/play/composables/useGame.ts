import type { IDefaultLevelConfigKeys } from '../utils/config'
import { defaultLevelConfig } from '../utils/config'
import { allQuestionLength, curQuestionIndex, hasQuestion, questionList, useCreateQuestion } from './core'
import { answerRecord, useAnswerRecord } from './useAnswer'
import type { ICreateQuestionOptions, IEndlessOptions, IMethods, INormalOptions, IResultOptions, IScoreType } from '~/common'

/**
   * 清理数据
   */
export const clearGame = () => {
  questionList.value = []
  answerRecord.value = []
  curQuestionIndex.value = -1
}

/**
 * 启动游戏
 *
 * 初始化游戏参数
 */
export const useGame = ({
  query,
  submitAnswerAfter,
  gameOverAfter,
  scrollQuestion,
}: {
  query: any
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
  /**
   * 游戏启动参数
   */
  const playOptions = computed<Required<ICreateQuestionOptions>>(() => {
    switch (query.type) {
      case 'endless':
        return {
          type: 'endless',
          errNumber: 3,
          preNum: 3,
          methods: defaultLevelConfig[3].methods,
        }
      case 'diy':
        if (!(query.range && query.methods && query.successType)) {
          return { type: 'normal', level: 1, ...defaultLevelConfig[1] }
        }
        return {
          type: 'diy',
          range: Number(query.range),
          preNum: Number(query.preNum),
          methods: query.methods as IMethods[],
          successType: query.successType as ('normal' | 'endless'),
          accuracy: Number(query.accuracy),
          questionNum: Number(query.questionNum) || 0,
          errNumber: Number(query.errNumber),
        }
      default:
        /**
         * 记录当前的关卡
         */
        localStorage.setItem('level', (query.level || '1') as string)

        if (query.level) {
          return { type: 'normal', level: Number(query.level), ...defaultLevelConfig[query.level as unknown as IDefaultLevelConfigKeys] }
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

  /**
   * 判断游戏是否结束
   */
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

    const options: IResultOptions = {
      type: scoreType.value,
      num: 0,
      result: false,
    }

    if (scoreType.value === 'percentage') {
      /**
     * 闯关模式
     * 计算分数，是否通过
     */
      const num = Math.floor(trueNum / allNum * 100)

      options.result = num >= (playOptions.value as INormalOptions).accuracy
      options.num = num
    } else {
      /**
       * 无尽模式
       * 给出分数即可
       */
      options.num = trueNum
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

        /**
         * 还有题目
         */
        if (hasQuestion.value) {
          scrollQuestion() // 下一题
        }
      }
    },
  })

  /**
   * 初始化
   * 生成题目列表
   */
  const initGame = async() => {
    /**
     * 初始化一下
     */
    clearGame()
    if ('questionNum' in playOptions.value && playOptions.value.questionNum > 0) {
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
