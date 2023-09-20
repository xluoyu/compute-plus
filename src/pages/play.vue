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
  <div class="flex flex-col justify-evenly h-full">
    <div class="box">
      <div class="title">
        <span>题目</span>
        <span>2/30</span>
      </div>
      <div class="box-content">
        <div v-if="curQuestion">
          <span>{{ curQuestion.a }}</span>
          <span>{{ curQuestion.fn }}</span>
          <span>{{ curQuestion.b }}</span>
          <span> = </span>
          <span> ? </span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">
        解答
      </div>
      <div class="box-content">
        {{ showCurAnswer }}
      </div>
    </div>

    <Keyboard :handle-cur-answer="handleCurAnswer" />
  </div>
</template>

<style lang="scss" scoped>
.box{
  .title{
    display: flex;
    justify-content: space-between;
  }
  .box-content{
    height: 74px;
    box-sizing: border-box;
    border: 2px solid #febd84;
    background-color: #fcecde;
    border-radius: 6px;
    font-size: 32px;
    padding: 12px 0;
    margin: 16px auto;
  }
}
</style>
