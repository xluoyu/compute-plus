import type { IQuestion } from '~/common'

/**
 * 各个难度的默认配置
 */
export const defaultConfig = {
  1: {
    range: 10,
    methods: ['+'],
  },
  2: {
    range: 20,
    methods: ['+', '-'],
  },
  3: {
    range: 12,
    methods: ['+', '-', '*'],
  },
  4: {
    range: 20,
    methods: ['+', '-', '*', '/'],
  },
}

const Divisors = [2, 3, 5]

/**
   * 获取一个范围内的随机数
   * 向上取整
   */
const getRoundDivisor = () => {
  return Divisors[Math.ceil(Math.random() * 3)]
}

/**
 * 用于生成题目
 * @param range 数值范围
 * @param difficulty 题目难度
 */
export const useCreateQuestion = ({ range, methods }: { range: number; methods: string[] }) => {
  const questionList = ref<IQuestion[]>([])

  /**
   * 获取一个范围内的随机数
   * 向上取整
   */
  const getRoundNum = () => {
    return Math.ceil(Math.random() * range)
  }

  const compute = (a: number, b: number, fn: string) => {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${a}${fn}${b}`)()
  }

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
      let a = getRoundNum()
      let b = getRoundNum()
      const fn = getMethod()

      if (fn === '-' && a < b) {
        // 排除负数的情况
        [a, b] = [b, a]
      } else if (fn === '/') {
        /**
         * 为了除法好计算
         */
        const _b = getRoundDivisor()
        const _answer = a * _b

        _questionList.push({
          i: baseIndex + index,
          a: _answer,
          b: _b,
          fn,
          answer: a,
        })

        break
      }

      const answer = compute(a, b, fn)

      _questionList.push({
        i: baseIndex + index,
        a,
        b,
        fn,
        answer,
      })
    }

    questionList.value.push(..._questionList)
    return _questionList
  }

  return {
    questionList,
    generate,
  }
}
