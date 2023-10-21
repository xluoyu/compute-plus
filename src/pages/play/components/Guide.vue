<script setup lang="ts">
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const emits = defineEmits(['close'])

const driverObj = driver({
  steps: [
    { element: '.question-area', popover: { title: '题目栏', description: '这里会滚动出现题目，一定要记得每一题的答案哦' } },
    { element: '.keyboard', popover: { title: '答题区', description: '在问题出现的一段时间后才会解锁答题区，要根据题目顺序回答哦' } },
    { popover: { title: '提示', description: '靠要你记忆力的时候到了，加油！' } },
  ],
  allowClose: false, // 点击遮罩关闭引导层
  showButtons: ['close'],
  popoverClass: 'guide-popover', // 自定义className
  onPopoverRender(popover, { state }) {
    const p = document.createElement('p')
    p.innerText = state.activeIndex === 2 ? '点击开始游戏' : '点击前往下一个'
    p.className = `guide-tip ${state.activeIndex === 2 ? 'last-popiver' : ''}`
    popover.wrapper.appendChild(p)

    popover.wrapper.addEventListener('click', () => {
      driverObj.moveNext()
    }, false)
  },
  /**
   * 结束事件
   */
  onDestroyed() {
    localStorage.setItem('isFirstPlay', 'true')
    emits('close')
  },
})

onMounted(() => {
  const isFirstPlay = localStorage.getItem('isFirstPlay')

  if (!isFirstPlay) {
    driverObj.drive()
  } else {
    emits('close')
  }
})
</script>

<style lang="scss">
.guide-popover{
  --bg-color: #FCECDE;
  background: var(--bg-color);
  cursor: pointer;
  .driver-popover-arrow{
    border-bottom-color: var(--bg-color);
  }
  .guide-tip{
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    color: #8c8b8a;
  }
  .last-popiver{
    animation: colorAnimation infinite 3s;

  }
}

@keyframes colorAnimation {
  0% {
    color: #8c8b8a;
  }
  10%, 60%{
    color: #66C567;
  }
  20%, 70%{
    color: #488BF3;
  }
  30%, 80%{
    color: #FFDC2F;
  }
  40%, 90%{
    color: #F75B40;
  }
}
</style>
