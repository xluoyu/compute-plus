import type { IMethods, IQuestion } from '~/common.d'
import { getRoundNum } from '~/utils'

/**
 * 创建题目
 */
export const createQuestion: Record<IMethods, (range: number, i: number) => IQuestion> = {
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
  /**
   * *  / 不受运算范围的限制
   * @param _
   * @param i
   */
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
   * 获取一个给定范围的计算方法
   */
export const getMethod = (methods: IMethods[]) => {
  return methods[Math.floor(Math.random() * methods.length)]
}
