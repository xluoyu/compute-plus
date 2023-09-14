<script setup lang="ts">

const res = ref<string[]>([])

const resValue = computed(() => res.value.join(''))

const handle = (key: string) => {
  switch (key) {
    case 'Backspace':
      res.value.pop()
      break
    case 'Enter':
      console.log('提交', resValue.value)
      break
    default:
      res.value.push(key)
      break
  }
}

const handleClickItem = (e: MouseEvent) => {
  let target = e.target as HTMLElement

  if (target.nodeName !== 'DIV') {
    target = target.parentElement!
  }

  handle(target.dataset.content as string)
}

const KeyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Enter', 'Backspace']

const handleKeyBoard = (e: KeyboardEvent) => {
  if (KeyList.includes(e.key)) {
    handle(e.key)
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
  <p>{{ resValue }}</p>
  <div class="keyboard grid gap-2 justify-center items-center" @click="handleClickItem">
    <div class="btn" data-content="7">
      7
    </div>
    <div class="btn" data-content="8">
      8
    </div>
    <div class="btn" data-content="9">
      9
    </div>
    <div class="btn row-span-2" data-content="Backspace">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21v-2z" /></svg>
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
    <div class="btn row-span-2" data-content="Enter">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4h2Z" /></svg>
    </div>
    <div class="btn col-span-3" data-content="0">
      0
    </div>
  </div>
</template>

<style lang="scss" scoped>
.keyboard{
  grid-template-rows: repeat(4, 70px);
  grid-template-columns: repeat(4, 70px);
}
.btn{
  @apply full text-white rounded-sm flex items-center justify-center;
  /* background-image: radial-gradient(circle, #9bc7f4, #42688e); */
  background: #4a9aeb;
  border-radius: 8px;
  box-shadow: inset 0px -3px 10px 2px rgb(0 0 0 / 0.5);
  &.active, &:active{
    opacity: .7;
  }
}
</style>
