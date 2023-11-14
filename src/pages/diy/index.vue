<script setup lang="ts">
import type { IDiyOptions } from '~/common'

const options = reactive<IDiyOptions>({
  type: 'diy',
  range: 20,
  methods: ['+', '-'],
  successType: 'normal',
  questionNum: 20,
  accuracy: 70,
  errNumber: 3,
})

</script>

<template>
  <div>
    <div>自定义</div>
    <el-form :model="options">
      <el-form-item label="游戏类型">
        <el-radio-group v-model="options.successType" name="radiogroup">
          <el-space>
            <el-radio label="normal">
              闯关模式
            </el-radio>
            <el-radio label="endless">
              无尽模式
            </el-radio>
          </el-space>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运算范围">
        <el-slider v-model="options.range" :step="5" :max="100" :min="10" />
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
          <el-slider v-model="options.questionNum" :step="5" :max="50" :min="10" />
        </el-form-item>
        <el-form-item label="准确率">
          <el-slider v-model="options.accuracy" :step="10" :max="100" :min="30" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="错误数量">
          <el-slider v-model="options.errNumber" show-stops :max="10" :min="1" />
        </el-form-item>
      </template>
    </el-form>
    <!-- <el-button>这是按钮{{ options.type }}</el-button> -->

    <!-- <el-slider v-model:value="value" :step="10" /> -->
  </div>
</template>

<style scoped>

</style>
