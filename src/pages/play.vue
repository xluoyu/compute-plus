<script setup lang="ts">
import { defaultConfig, useAnswerRecord, useCreateQuestion } from '~/composables'
const route = useRoute()

const playOptions = computed(() => {
  if (route.query.type) {
    return defaultConfig[route.query.type as unknown as keyof typeof defaultConfig]
  } else if (route.query.range || route.query.methods) {
    return {
      range: route.query.range ? Number(route.query.range) : 10,
      methods: route.query.methods ? (route.query.methods as string).split(',') : defaultConfig[1].methods,
    }
  } else {
    return defaultConfig[1]
  }
})

const { questionList, generate } = useCreateQuestion(playOptions.value)

const questionIndex = ref(0)

const curQuestion = computed(() => questionList.value[questionIndex.value])

onMounted(() => {
  generate(5)

  console.log(curQuestion.value)
})

const { showCurAnswer, setSubmitBefore, handleCurAnswer } = useAnswerRecord()

setSubmitBefore(() => {
  console.log('准备提交答案')
})
</script>

<template>
  <div>
    <div>
      <div>题目</div>
      <div v-if="curQuestion">
        <span>{{ curQuestion.a }}</span>
        <span>{{ curQuestion.fn }}</span>
        <span>{{ curQuestion.b }}</span>
        <span> = </span>
        <span> {{ curQuestion.answer }} </span>
      </div>
    </div>
    <div>解答</div>
    <div>{{ showCurAnswer }}</div>
    <Keyboard :handle-cur-answer="handleCurAnswer" />
  </div>
</template>

<style scoped>

</style>
