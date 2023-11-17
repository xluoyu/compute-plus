<script setup lang="ts">
import CarbonArrowLeft from '~icons/carbon/arrow-left'
import CarbonLocked from '~icons/carbon/locked'

const props = defineProps<{
  handleCurAnswer: (key: string) => Promise<void>
  curAnswer: string
  lock: boolean
}>()

/**
 * 点击事件
 * @param e
 */
const handleClickItem = (e: MouseEvent | TouchEvent) => {
  if (props.lock)
    return

  const target = e.target as HTMLElement

  props.handleCurAnswer(target.dataset.content as string)
}

/**
 * 需要监听的键盘按键
 */
const KeyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Enter', 'Backspace']

const handleKeyBoard = (e: KeyboardEvent) => {
  if (props.lock)
    return

  if (KeyList.includes(e.key)) {
    props.handleCurAnswer(e.key)
    /**
     * 添加点击样式
     */
    const item = document.querySelector(`.keyboard [data-content="${e.key}"]`)!

    item.classList.add('active')

    setTimeout(() => {
      item?.classList.remove('active')
    }, 80)
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyBoard)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyBoard)
})

</script>

<template>
  <div class="relative">
    <div v-if="lock" class="lock">
      <CarbonLocked />
    </div>
    <!-- 移动端需要touchstart事件才会触发:active -->
    <div class="keyboard grid gap-2 justify-center items-center" @touchstart.stop.prevent="handleClickItem" @click="handleClickItem">
      <div class="btn" data-content="7">
        7
      </div>
      <div class="btn" data-content="8">
        8
      </div>
      <div class="btn" data-content="9">
        9
      </div>
      <div class="btn row-span-2 !bg-[#f66d66db]" data-content="Backspace">
        <CarbonArrowLeft class="pointer-events-none" />
      </div>
      <div class="btn" data-content="4">
        4
      </div>
      <div class="btn" data-content="5">
        5
      </div>
      <div class="btn" data-content="6">
        6
      </div>
      <div class="btn" data-content="1">
        1
      </div>
      <div class="btn" data-content="2">
        2
      </div>
      <div class="btn" data-content="3">
        3
      </div>
      <div class="btn row-span-2 !bg-[#69cf7a]" data-content="Enter">
        Enter
      </div>
      <div class="btn col-span-3" data-content="0">
        0
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.keyboard{
  grid-template-rows: repeat(4, 76px);
  grid-template-columns: repeat(4, 76px);
  user-select: none;
}
.btn{
  @apply w-full h-full rounded-sm flex items-center justify-center;
  /* background-image: radial-gradient(circle, #9bc7f4, #42688e); */
  background: #accbed;
  color: #333;
  border-radius: 8px;
  opacity: 1;
  box-shadow: inset 0px -3px 10px 2px rgb(0 0 0 / 0.3);
  &.active, &:active{
    opacity: .6;
  }
}

.lock{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eeeeeeaa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: #777;
}
</style>
