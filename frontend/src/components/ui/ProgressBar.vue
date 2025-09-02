<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-700">{{ label || 'Progress' }}</span>
      <span class="text-sm text-gray-600">{{ value }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        :class="[
          'h-2 rounded-full transition-all duration-300',
          progressClasses
        ]"
        :style="{ width: `${value}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  label?: string
}

const props = defineProps<Props>()

const progressClasses = computed(() => {
  const progress = props.value
  
  if (progress < 25) return 'bg-red-500'
  if (progress < 50) return 'bg-orange-500'
  if (progress < 75) return 'bg-yellow-500'
  return 'bg-green-500'
})
</script>
