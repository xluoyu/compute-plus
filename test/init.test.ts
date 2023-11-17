import { describe, expect, it } from 'vitest'
import { questionList, useGame } from '~/pages/play/composables'
import { defaultLevelConfig } from '~/pages/play/utils/config'

const commonFns = {
  submitAnswerAfter() {},
  scrollQuestion() {},
  gameOverAfter() {},
}

describe('初始化', () => {
  it('默认参数', () => {
    const { playOptions } = useGame({
      query: {},
      ...commonFns,
    })

    expect(playOptions.value).toEqual({
      type: 'normal',
      level: 1,
      ...defaultLevelConfig[1],
    })
  })

  it('第二关参数', () => {
    const { playOptions } = useGame({
      query: {
        type: 'normal',
        level: 2,
      },
      ...commonFns,
    })

    expect(playOptions.value).toEqual({
      type: 'normal',
      level: 2,
      ...defaultLevelConfig[2],
    })
  })

  it('无尽模式', () => {
    const { playOptions } = useGame({
      query: {
        type: 'endless',
      },
      ...commonFns,
    })

    expect(playOptions.value).toHaveProperty('type', 'endless')
    expect(playOptions.value).toHaveProperty('errNumber', 3)
  })

  it('diy-null', () => {
    const { playOptions } = useGame({
      query: {
        type: 'diy',
      },
      ...commonFns,
    })

    expect(playOptions.value).toEqual({
      type: 'normal',
      level: 1,
      ...defaultLevelConfig[1],
    })
  })

  it('diy-normal', () => {
    const { playOptions } = useGame({
      query: {
        type: 'diy',
        successType: 'normal',
        range: 20,
        methods: ['+', '-'],
      },
      ...commonFns,
    })

    expect(playOptions.value).toHaveProperty('successType', 'normal')
    expect(playOptions.value).toHaveProperty('range', 20)
  })

  it('diy-endless', async() => {
    const { playOptions, initGame } = useGame({
      query: {
        type: 'diy',
        range: 20,
        methods: ['+', '-', '*', '/'],
        successType: 'endless',
        errNumber: 3,
      },
      ...commonFns,
    })

    expect(playOptions.value).toHaveProperty('successType', 'endless')
    expect(playOptions.value).toHaveProperty('range', 20)

    initGame()
    await new Promise(resolve => setTimeout(resolve))
    expect(questionList.value.length).toBe(20)
  })
})
