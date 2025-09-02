<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div class="text-2xl font-bold" :class="colorClasses[color]">{{ value }}</div>
    <div class="text-sm text-gray-600">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number | string
  label: string
  color?: 'blue' | 'yellow' | 'green' | 'gray' | 'red' | 'orange'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray'
})

// Direct object mapping for color classes
const colorClasses = {
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  green: 'text-green-600',
  gray: 'text-gray-600',
  red: 'text-red-600',
  orange: 'text-orange-600'
}
</script>
