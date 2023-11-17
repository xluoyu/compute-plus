import { describe, expect, it } from 'vitest'
import { nextMacro } from './utils'
import { isString } from '~/utils'
import type { IQuestion, IResultOptions } from '~/common'
import { questionList, useCreateQuestion } from '~/pages/play/composables/core'
import { answerRecord } from '~/pages/play/composables/useAnswer'
import { clearGame, useGame } from '~/pages/play/composables/useGame'

describe('常规模式', () => {
  const _questionNum = 10 // 测试题目数量

  const gameResult = ref<IResultOptions>()

  const { curQuestion, goNextQuestion, allQuestionLength } = useCreateQuestion()

  const { initGame, showCurAnswer, answerIndex, handleCurAnswer } = useGame({
    query: {
      type: 'diy',
      range: 20,
      methods: ['+', '-', '*', '/'],
      successType: 'normal',
      accuracy: 70,
      questionNum: _questionNum,
    },
    submitAnswerAfter() {
      // 提交答案后的回调
      return Promise.resolve()
    },
    scrollQuestion() {
      // 进入下一题
      goNextQuestion()
    },
    gameOverAfter(a: IResultOptions) {
      // 游戏结束
      gameResult.value = a
    },
  })

  it('生成题目', () => {
    initGame()
    expect(questionList.value.length).toBe(_questionNum)
    expect(allQuestionLength.value).toBe(_questionNum)
  })

  it('题目滚动', () => {
    expect(curQuestion.value).toBe('准备开始')
    // 进入下一题
    goNextQuestion()

    expect(curQuestion.value).toEqual(questionList.value[0])
  })

  it('提交一题', async() => {
    const answer = (curQuestion.value as IQuestion).answer

    for (const index of `${answer}`) {
      handleCurAnswer(index)
    }

    expect(showCurAnswer.value).toBe(`${answer}`)

    await handleCurAnswer('Enter')

    await nextMacro()

    expect(showCurAnswer.value).toBe('')
    expect(answerRecord.value).toEqual([true])
    expect(answerIndex.value).toBe(1)
  })

  it('清空题库', async() => {
    clearGame()
    answerIndex.value = 0 // 手动清理答题记录
    await nextMacro()
    initGame()

    expect(questionList.value.length).toBe(_questionNum)
  })

  it('循环答题', async() => {
    for (let i = -1; i < _questionNum; i++) {
      await nextMacro()

      if (isString(curQuestion.value)) {
        goNextQuestion()
      } else {
        const answer = (curQuestion.value as IQuestion).answer
        for (const index of `${answer}`) {
          handleCurAnswer(index)
        }
        await nextMacro()

        await handleCurAnswer('Enter')
      }
    }

    expect(answerRecord.value.every(Boolean)).toBe(true)
    await nextMacro()
    expect(gameResult.value).toEqual({
      type: 'percentage',
      num: 100,
      result: true,
    })
  })
})

describe('无尽模式', () => {
  const gameResult = ref<IResultOptions>()

  const { curQuestion, goNextQuestion, allQuestionLength } = useCreateQuestion()

  const { initGame, handleCurAnswer } = useGame({
    query: {
      type: 'diy',
      range: 20,
      methods: ['+', '-', '*', '/'],
      successType: 'endless',
      errNumber: 3,
    },
    submitAnswerAfter() {
      // 提交答案后的回调
      return Promise.resolve()
    },
    scrollQuestion() {
      // 进入下一题
      goNextQuestion()
    },
    gameOverAfter(a: IResultOptions) {
      // 游戏结束
      gameResult.value = a
    },
  })

  it('生成题目', () => {
    initGame()

    expect(questionList.value.length).toBe(20)
    expect(allQuestionLength.value).toBe(20)
  })

  it('循环答题', async() => {
    goNextQuestion()
    await nextMacro()

    const task = async(res = 0) => {
      const answer = (curQuestion.value as IQuestion).answer + res
      for (const index of `${answer}`) {
        handleCurAnswer(index)
      }
      await nextMacro()

      await handleCurAnswer('Enter')
    }

    const score = [0, 0]

    const loop = async(): Promise<IResultOptions> => {
      const isErr = Math.random() > 0.8
      score[0] += 1
      if (!isErr) {
        score[1] += 1
      }
      await task(isErr ? 1 : 0)

      await nextMacro()
      if (gameResult.value) {
        return gameResult.value
      } else {
        return await loop()
      }
    }

    const res = await loop()
    console.log(`[无尽模式]共计答题${score[0]}道，得分${score[1]}`)
    expect(res.num).toBe(score[1])
  })
})
