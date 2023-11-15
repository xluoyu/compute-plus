<script setup lang="ts">
import ASlider from './components/slider.vue'
import type { IDiyOptions } from '~/common'

const options = reactive<Required<IDiyOptions>>({
  type: 'diy',
  range: 20,
  methods: ['+', '-'],
  successType: 'normal',
  questionNum: 20,
  accuracy: 70,
  errNumber: 3,
})

const activeClass = 'bg-[#ff7904] flex-1'

</script>

<template>
  <div class="p-6">
    <Header title="自定义" />

    <el-form :model="options" label-position="top">
      <el-form-item label="游戏类型">
        <div class="w-full flex justify-around gap-1">
          <div :class="'btn flex-shrink-0 ' + (options.successType === 'normal' ? activeClass : 'bg-gray-400')" @click="options.successType = 'normal'">
            闯关模式
          </div>
          <div :class="'btn flex-shrink-0 ' + (options.successType === 'endless' ? activeClass : 'bg-gray-400')" @click="options.successType = 'endless'">
            无尽模式
          </div>
        </div>
      </el-form-item>
      <el-form-item label="运算范围">
        <ASlider v-model="options.range" :step="5" :max="100" :min="10" />
      </el-form-item>
      <el-form-item label="运算组合">
        <el-checkbox-group v-model="options.methods">
          <el-space item-style="display: flex;">
            <el-checkbox value="+" label="+" border />
            <el-checkbox value="--" label="-" border />
            <el-checkbox value="*" label="×" border />
            <el-checkbox value="/" label="÷" border />
          </el-space>
        </el-checkbox-group>
      </el-form-item>
      <template v-if="options.successType === 'normal'">
        <el-form-item label="题目数量">
          <ASlider v-model="options.questionNum" :step="5" :max="50" :min="10" />
        </el-form-item>
        <el-form-item label="准确率">
          <ASlider v-model="options.accuracy" :step="10" :max="100" :min="30" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="错误数量">
          <ASlider v-model="options.errNumber" show-stops :max="10" :min="1" />
        </el-form-item>
      </template>
    </el-form>
    <!-- <el-button>这是按钮{{ options.type }}</el-button> -->

    <!-- <ASlider v-model:value="value" :step="10" /> -->
  </div>
</template>

<style scoped>
.btn{
  transition: flex .2s;
}
</style>
