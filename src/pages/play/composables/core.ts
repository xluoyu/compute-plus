import { createQuestion, getMethod } from '../utils/getQuestion'
import type { ICreateQuestionOptions, IQuestion } from '~/common'
/**
 * 题目表
 */
export const questionList = ref<IQuestion[]>([])

export const allQuestionLength = computed(() => questionList.value.length)
/**
 * 当前的下标
 */
export const curQuestionIndex = ref(-1)

export const hasQuestion = computed(() => curQuestionIndex.value < allQuestionLength.value)

/**
 * 用于生成题目
 * @param range 数值范围
 * @param difficulty 题目难度
 */
export const useCreateQuestion = () => {
  /**
   * 创建 num 数量的题目
   * @param num
   */
  const generate = (options: ICreateQuestionOptions, num: number) => {
    const _questionList = []
    const baseIndex = questionList.value.length

    for (let index = 0; index < num; index++) {
      const fn = getMethod(options.methods)
      let _range = 0
      /**
       * 如果有预设的范围，按照预设
       */
      if ('range' in options) {
        _range = options.range
      } else {
        /**
         * 没有预设范围，’endless‘模式 | 'diy'模式-’endless‘条件
         *
         * +、- 为20
         * *、/ 为15
         */
        if (fn === '+' || fn === '-') {
          _range = 20
        } else {
          _range = 15
        }
      }

      const question = createQuestion[fn](_range, baseIndex + index)

      _questionList.push(question)
    }

    questionList.value.push(..._questionList)

    return _questionList
  }

  /**
   * 当前的考题
   */
  const curQuestion = computed(() => {
    if (curQuestionIndex.value === -1) {
      return '准备开始'
    } else if (curQuestionIndex.value >= allQuestionLength.value) {
      return '题目播放完毕'
    } else {
      return questionList.value[curQuestionIndex.value]
    }
  })

  /**
   * 前往下一题，仅在小于的情况下
   */
  const goNextQuestion = () => {
    if (hasQuestion.value) {
      curQuestionIndex.value += 1
    }
  }

  return {
    questionList,
    generate,
    curQuestion,
    allQuestionLength,
    goNextQuestion,
  }
}
