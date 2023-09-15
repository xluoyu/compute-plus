<script setup lang="ts">
import { defaultConfig, useCreateQuestion } from '~/composables'
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

onMounted(() => {
  generate(5)
  console.log(questionList.value)
})
</script>

<template>
  <div>
    <div>题目</div>
    <div>解答</div>
    <Keyboard />
  </div>
</template>

<style scoped>

</style>
