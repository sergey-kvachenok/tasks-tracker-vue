<template>
  <div 
    @click="handleCardClick"
    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 flex flex-col h-full"
  >
    <!-- Task Header -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ task.name }}</h3>
      <p v-if="task.description" class="text-gray-600 text-sm mb-3 line-clamp-3">
        {{ task.description }}
      </p>
    </div>

    <!-- Task Details -->
    <div class="space-y-3 mb-4">
      <!-- Status and Priority Row -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Status:</span>
          <StatusBadge :status="task.status" />
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Priority:</span>
          <PriorityBadge :priority="task.priority" />
        </div>
      </div>

      <!-- Due Date (on its own line) -->
      <div v-if="task.dueDate" class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700">Due:</span>
        <span class="text-sm text-gray-600">
          {{ formatDate(task.dueDate) }}
        </span>
      </div>

      <!-- Time Tracking Row -->
      <div v-if="task.estimatedHours || task.timeSpent" class="flex items-center space-x-4">
        <div v-if="task.estimatedHours" class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Est:</span>
          <span class="text-sm text-gray-600">{{ task.estimatedHours }}h</span>
        </div>
        <div v-if="task.timeSpent" class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700">Spent:</span>
          <span class="text-sm text-gray-600">{{ task.timeSpent }}h</span>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <ProgressBar :value="task.progress" />
    </div>

    <!-- Time Tracking Info -->
    <div v-if="task.startedAt || task.completedAt" class="mb-4 text-xs text-gray-500">
      <div v-if="task.startedAt" class="mb-1">
        Started: {{ formatDate(task.startedAt) }}
      </div>
      <div v-if="task.completedAt">
        Completed: {{ formatDate(task.completedAt) }}
      </div>
    </div>

    <!-- Spacer to push buttons to bottom -->
    <div class="flex-grow"></div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-2 mt-auto pt-4">
      <Button
        variant="primary"
        size="sm"
        @click.stop="$emit('edit', task)"
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        @click.stop="$emit('delete', task.id)"
      >
        Delete
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StatusBadge, PriorityBadge, ProgressBar, Button } from '@/components/ui'
import { formatDate } from '@/utils/formatters'
import type { Task } from '@/types/task'

interface Props {
  task: Task
}

interface Emits {
  (e: 'edit', task: Task): void
  (e: 'delete', id: number): void
  (e: 'view', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCardClick = () => {
  emit('view', props.task.id)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
