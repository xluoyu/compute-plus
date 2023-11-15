<script setup lang="ts">
import CarbonPreviousOutline from '~icons/carbon/previous-outline'
const props = withDefaults(defineProps<{
  title: string
  rightFn?: Function
  hasBack?: boolean
}>(), {
  hasBack: true,
  rightFn: undefined,
  title: '',
})

const router = useRouter()

const navTo = () => {
  if (props.rightFn) {
    props.rightFn()
  } else {
    router.back()
  }
}

</script>

<template>
  <div class="h-[var(--header-h)] flex items-center text-xl justify-center">
    <div v-if="hasBack" class="cursor-pointer " @click="navTo">
      <slot name="right">
        <CarbonPreviousOutline />
      </slot>
    </div>
    <div v-if="title" class="flex-1 -indent-[32px]">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>

</style>
