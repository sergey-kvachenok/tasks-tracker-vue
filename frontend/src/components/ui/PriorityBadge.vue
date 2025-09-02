<template>
  <span
    :class="[
      'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap',
      priorityClasses[priority]
    ]"
  >
    {{ priorityLabels[priority] }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

const props = defineProps<Props>()

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
}

const priorityClasses = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}
</script>
