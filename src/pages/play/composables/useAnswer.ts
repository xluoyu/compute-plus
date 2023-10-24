/**
 * 用户的答案成绩记录
 */
export const answerRecord = ref<boolean[]>([])

/**
  * 答题记录
  */
export const useAnswerRecord = ({ getSubmitResult, submitEnd }: {
  getSubmitResult: (answer: number, index: number) => boolean | Promise<boolean> // 提交之前，须在外侧判断结果正确性
  submitEnd: (list: boolean[]) => void // 提交之后，可以根据不同条件，结束游戏
}) => {
  answerRecord.value = []

  /**
    * 当前的答案
    */
  const curAnswer = ref<string[]>([])

  /**
    * 答案对应的题目下标
    */
  const answerIndex = ref(0)

  const showCurAnswer = computed(() => curAnswer.value.join(''))

  /**
    * 按钮操作
    * @param key
    */
  const handleCurAnswer = async(key: string) => {
    /**
   * 最大输入为3位数
   */
    if (curAnswer.value.length > 2 && key !== 'Enter' && key !== 'Backspace')
      return

    if ((key === 'Enter' || key === 'Backspace') && curAnswer.value.length === 0) {
      return
    }

    /**
      * 提交当前答案
      */
    const submitCurAnswer = async() => {
      const result = await getSubmitResult(Number(showCurAnswer.value), answerIndex.value)

      answerRecord.value.push(result)
      answerIndex.value += 1
      curAnswer.value = []

      submitEnd(answerRecord.value)
    }

    switch (key) {
      case 'Backspace':
        curAnswer.value.pop()
        break
      case 'Enter':
        submitCurAnswer()
        break
      default:
        curAnswer.value.push(key)
        break
    }
  }

  return {
    answerRecord,
    showCurAnswer,
    answerIndex,
    handleCurAnswer,
  }
}
