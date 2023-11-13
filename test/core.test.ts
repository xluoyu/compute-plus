import { describe, expect, it } from 'vitest'
import { useCreateQuestion } from '~/pages/play/composables/core'

describe('core', () => {
  it('生成题目', () => {
    const { generate } = useCreateQuestion({
      type: 'normal',
      level: 1,
      range: 10,
      methods: ['+'],
      questionNum: 10,
      accuracy: 70,
    })
    /**
     * 生成十条
     */
    const list = generate(5)
    expect(list.length).toBe(5)
  })
})
