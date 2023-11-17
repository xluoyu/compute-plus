import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { useCreateQuestion } from '../src/pages/play/composables/core'
import { nextMacro } from './utils'
import { useGame } from '~/pages/play/composables'
import Keyboard from '~/pages/play/components/Keyboard.vue'

const commonFns = {
  submitAnswerAfter() {},
  scrollQuestion() {},
  gameOverAfter() {},
}

describe('键盘', () => {
  test('输入', async() => {
    const { goNextQuestion } = useCreateQuestion()
    const { showCurAnswer, handleCurAnswer, initGame } = useGame({
      query: {},
      ...commonFns,
    })
    const wrapper = mount(Keyboard, {
      props: {
        handleCurAnswer,
        curAnswer: showCurAnswer.value,
        lock: false,
      },
    })
    initGame()

    goNextQuestion()

    const getBtn = (content: string) => wrapper.get(`[data-content="${content}"]`)

    getBtn('1').trigger('click')
    expect(showCurAnswer.value).toBe('1')
    getBtn('5').trigger('click')
    expect(showCurAnswer.value).toBe('15')
    getBtn('9').trigger('click')
    expect(showCurAnswer.value).toBe('159')
    getBtn('4').trigger('click')
    expect(showCurAnswer.value).toBe('159')
    getBtn('Backspace').trigger('click')
    expect(showCurAnswer.value).toBe('15')
    getBtn('Enter').trigger('click')
    await nextMacro()
    expect(showCurAnswer.value).toBe('')
  })
})
