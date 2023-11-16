<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

const isMinArea = computed(() => {
  return data.value < (props.max + props.min) / 2
})
</script>

<template>
  <div class="w-full flex justify-between gap-2 aSlider">
    <span>{{ min }}</span>
    <div :class="'value ' + (isMinArea ? 'text-slate-700' : 'text-white')">
      {{ data }}
    </div>
    <el-slider v-bind="$attrs" v-model="data" :show-tooltip="false" :max="max" :min="min" />
    <span>{{ max }}</span>
  </div>
</template>

<style lang="scss">
.aSlider .el-slider{
  --el-slider-height: 40px;
  .el-slider__button{
    opacity: 0;
  }
  .el-slider__stop{
    opacity: 0;
  }
  .el-slider__runway, .el-slider__bar{
    border-radius: 6px;
  }
}

.aSlider {
  position: relative;
  .value{
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 20;
    pointer-events: none;
  }
}
</style>
