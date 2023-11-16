<script setup lang="ts">
import CarbonCloseFilled from '~icons/carbon/close-filled'

defineProps<{
  errNum: number
  allNum: number
}>()
</script>

<template>
  <div class="flex gap-1">
    <span v-for="item in allNum" :key="item" :class="item <= errNum ? 'text-red-600': 'text-gray-300'">
      <CarbonCloseFilled />
    </span>
  </div>
</template>

<style scoped>

</style>
