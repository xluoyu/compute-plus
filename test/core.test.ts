import { describe, expect, it } from 'vitest'
import { useCreateQuestion } from '~/composables/core'

describe('core', () => {
  it('生成题目', () => {
    const { generate } = useCreateQuestion(10, 2)
    /**
     * 生成十条
     */
    const list = generate(5)

    expect(list.length).toContain(5)
  })
})
