<script setup lang="ts">
import CarbonPreviousOutline from '~icons/carbon/previous-outline'
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
      <CarbonPreviousOutline />
    </div>
    <div v-if="title" class="flex-1 -indent-[32px]">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>

</style>
