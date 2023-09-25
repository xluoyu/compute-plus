<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  path?: string
  hasBack?: boolean
}>(), {
  hasBack: true,
  path: '',
  title: '',
})

const router = useRouter()

const navTo = () => {
  if (props.hasBack) {
    if (props.path) {
      router.push(props.path)
    } else {
      router.back()
    }
  }
}

</script>

<template>
  <div class="h-[var(--header-h)] flex items-center justify-center">
    <div @click="navTo">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m296 352l-96-96l96-96" /></svg>
    </div>
    <div v-if="title" class="flex-1 -indent-[32px]">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>

</style>
