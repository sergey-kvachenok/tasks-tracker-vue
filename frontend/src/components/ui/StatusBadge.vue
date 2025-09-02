<template>
  <span
    :class="[
      'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap',
      statusClasses[status]
    ]"
  >
    {{ statusLabels[status] }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
}

const props = defineProps<Props>()

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
}

const statusClasses = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}
</script>
