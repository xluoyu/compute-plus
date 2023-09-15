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

    for (let index = 0; index < num; index++) {
      const a = getRoundNum()
      const b = getRoundNum()
      const fn = getMethod()

      const answer = compute(a, b, fn)

      _questionList.push({
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

/**
 * 答题记录
 */
export const useAnswerRecord = () => {
  const submitBefore = ref<Function>()

  const answerRecord = ref<string[]>([])

  const curAnswer = ref<string[]>([])

  const showCurAnswer = computed(() => curAnswer.value.join(''))

  const setSubmitBefore = (fn: Function) => {
    submitBefore.value = fn
  }

  const handleCurAnswer = async(key: string) => {
    switch (key) {
      case 'Backspace':
        curAnswer.value.pop()
        break
      case 'Enter':
        if (submitBefore.value) {
          await submitBefore.value(showCurAnswer.value)
        }

        answerRecord.value.push(showCurAnswer.value)

        curAnswer.value = []
        break
      default:
        curAnswer.value.push(key)
        break
    }
  }

  return {
    showCurAnswer,
    handleCurAnswer,
    answerRecord,
    setSubmitBefore,
  }
}
