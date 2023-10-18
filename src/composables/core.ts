import type { IQuestion } from '~/common'

export type IMethods = '+' | '-' | '*' | '/'

/**
 * 各个难度的默认配置
 */
export const defaultLevelConfig: Record<number, { range: number; methods: IMethods[] }> = {
  1: {
    range: 20,
    methods: ['+'],
  },
  2: {
    range: 20,
    methods: ['+', '-'],
  },
  3: {
    range: 20,
    methods: ['+', '-', '*', '/'],
  },
}

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
export const useCreateQuestion = ({ range, methods }: { range: number; methods: IMethods[] }) => {
  const questionList = ref<IQuestion[]>([])

  /**
   * 获取一个给定范围的计算方法
   */
  const getMethod = () => {
    return methods[Math.floor(Math.random() * methods.length)]
  }

  const generate = (num: number) => {
    const _questionList = []
    const baseIndex = questionList.value.length

    for (let index = 0; index < num; index++) {
      const fn = getMethod()
      const question = createQuestion[fn](range, baseIndex + index)

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
