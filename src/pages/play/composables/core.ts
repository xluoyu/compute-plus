import type { ICreateQuestionOptions, IMethods, IQuestion } from '~/common'

/**
 * 各个难度的默认配置
 */
export const defaultLevelConfig: Record<number, {
  range: number
  methods: IMethods[]
  accuracy: number
  questionNum: number
}> = {
  1: {
    range: 10,
    methods: ['+'],
    questionNum: 10,
    accuracy: 70,
  },
  2: {
    range: 20,
    methods: ['+', '-'],
    questionNum: 15,
    accuracy: 80,
  },
  3: {
    range: 20,
    methods: ['+', '-', '*', '/'],
    questionNum: 20,
    accuracy: 85,
  },
}

export type IDefaultLevelConfigKeys = keyof typeof defaultLevelConfig

/**
 * 获取一个范围内的随机数
 * 向上取整
 */
const getRoundNum = (maxNum: number) => {
  return Math.ceil(Math.random() * maxNum)
}

/**
 * 创建题目
 */
const createQuestion: Record<IMethods, (range: number, i: number) => IQuestion> = {
  '+': (range, i) => {
    const a = getRoundNum(range - 1)
    const b = getRoundNum(range - a)

    const answer = a + b

    return { a, b, fn: '+', answer, i }
  },
  '-': (range, i) => {
    let a = getRoundNum(range)
    let b = getRoundNum(range)

    /**
     * 如果a小于b，交换位置
     * 保证答案为正数
     */
    if (a < b) {
      [a, b] = [b, a]
    }

    const answer = a - b

    return { a, b, fn: '-', answer, i }
  },
  '*': (_, i) => {
    const a = getRoundNum(9)
    const b = getRoundNum(9)
    const answer = a * b

    return { a, b, fn: '*', answer, i }
  },
  '/': (_, i) => {
    const b = getRoundNum(9)
    const answer = getRoundNum(9)
    const a = answer * b

    return { a, b, fn: '/', answer, i }
  },
}

/**
 * 用于生成题目
 * @param range 数值范围
 * @param difficulty 题目难度
 */
export const useCreateQuestion = (options: ICreateQuestionOptions) => {
  const questionList = ref<IQuestion[]>([])

  /**
   * 获取一个给定范围的计算方法
   */
  const getMethod = () => {
    return options.methods[Math.floor(Math.random() * options.methods.length)]
  }

  /**
   * 创建 num 数量的题目
   * @param num
   */
  const generate = (num: number) => {
    const _questionList = []
    const baseIndex = questionList.value.length

    for (let index = 0; index < num; index++) {
      const fn = getMethod()
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

  return {
    questionList,
    generate,
  }
}
