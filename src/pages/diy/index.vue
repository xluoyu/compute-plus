<script setup lang="ts">
import { stringifyQuery } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import ASlider from './components/slider.vue'
import type { IDiyOptions } from '~/common'

const router = useRouter()

const options = reactive<Required<IDiyOptions>>({
  type: 'diy',
  range: 20,
  preNum: 2,
  methods: ['+', '-'],
  successType: 'normal',
  questionNum: 20,
  accuracy: 70,
  errNumber: 3,
})

const activeClass = 'bg-[#ff7904] flex-1'

const playDiy = () => {
  router.push({
    path: '/play',
    query: options,
  })
}

const { copy } = useClipboard({
  legacy: true,
})

const share = async() => {
  try {
    const query = stringifyQuery(options)
    const path = `${location.origin}?${query}`
    await copy(path)

    ElMessageBox.alert('已将分享链接复制到剪贴板中，请自行分享', '提示')
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="p-6 h-full flex flex-col">
    <Header title="自定义" />

    <el-form :model="options" label-position="top" class="flex-1">
      <el-form-item label="游戏类型">
        <div class="w-full flex justify-around gap-1">
          <div :class="'btn-skew flex-shrink-0 ' + (options.successType === 'normal' ? activeClass : 'bg-gray-400')" @click="options.successType = 'normal'">
            闯关模式
          </div>
          <div :class="'btn-skew flex-shrink-0 ' + (options.successType === 'endless' ? activeClass : 'bg-gray-400')" @click="options.successType = 'endless'">
            无尽模式
          </div>
        </div>
      </el-form-item>
      <el-form-item label="运算范围">
        <ASlider v-model="options.range" :step="5" :max="100" :min="10" />
      </el-form-item>
      <el-form-item label="运算组合">
        <el-checkbox-group v-model="options.methods" class="w-full">
          <div class="flex flex-wrap justify-evenly gap-4 w-full">
            <el-checkbox label="+" border>
              加 +
            </el-checkbox>
            <el-checkbox label="-" border>
              减 -
            </el-checkbox>
            <el-checkbox label="*" border>
              乘 ×
            </el-checkbox>
            <el-checkbox label="/" border>
              除 ÷
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="记忆数量">
        <ASlider v-model="options.preNum" :max="8" :min="1" />
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
          <ASlider v-model="options.errNumber" show-stops :max="8" :min="1" />
        </el-form-item>
      </template>
    </el-form>

    <div class="flex flex-col items-center gap-5">
      <a-btn @click="playDiy">
        自己玩
      </a-btn>
      <a-btn @click="share">
        分享链接
      </a-btn>
    </div>
  </div>
</template>

<style scoped>
.btn-skew{
  transition: flex .2s;
}

::v-deep(.el-checkbox) {
  width: 40%;
  margin-right: 0;
  height: 40px;
}
</style>
