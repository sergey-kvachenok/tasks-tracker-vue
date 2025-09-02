<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Task' : 'Add New Task' }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Task Name -->
        <FormInput
          id="name"
          label="Task Name"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter task name"
        />

        <!-- Description -->
        <FormTextarea
          id="description"
          label="Description"
          v-model="form.description"
          placeholder="Enter task description"
        />

        <!-- Status and Priority Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Status -->
          <FormSelect
            id="status"
            label="Status"
            v-model="form.status"
            :options="statusOptions"
          />

          <!-- Priority -->
          <FormSelect
            id="priority"
            label="Priority"
            v-model="form.priority"
            :options="priorityOptions"
          />
        </div>

        <!-- Due Date and Estimated Hours Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Due Date -->
          <FormInput
            id="dueDate"
            label="Due Date"
            v-model="form.dueDate"
            type="datetime-local"
          />

          <!-- Estimated Hours -->
          <FormInput
            id="estimatedHours"
            label="Estimated Hours"
            v-model="form.estimatedHours"
            type="number"
            min="0"
            step="0.5"
            placeholder="0.0"
          />
        </div>

        <!-- Time Tracking Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Time Spent -->
          <FormInput
            id="timeSpent"
            label="Time Spent (hours)"
            v-model="form.timeSpent"
            type="number"
            min="0"
            step="0.5"
            placeholder="0.0"
          />

          <!-- Progress -->
          <div>
            <label for="progress" class="block text-sm font-medium text-gray-700 mb-2">
              Progress (%)
            </label>
            <div class="flex items-center space-x-2">
              <input
                id="progress"
                v-model.number="form.progress"
                type="range"
                min="0"
                max="100"
                step="5"
                class="flex-1"
              />
              <span class="text-sm text-gray-600 w-12">{{ form.progress }}%</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            @click="closeModal"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            {{ isEditing ? 'Update Task' : 'Create Task' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { FormInput, FormSelect, FormTextarea, Button } from '@/components/ui'
import type { Task, TaskStatus, TaskPriority } from '@/types/task'

interface Props {
  isOpen: boolean
  task?: Task | null
}

interface Emits {
  (e: 'close'): void
  (e: 'save', task: Partial<Task>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = computed(() => !!props.task)

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
]

const form = ref({
  name: '',
  description: '',
  status: 'pending' as TaskStatus,
  priority: 'medium' as TaskPriority,
  dueDate: '',
  estimatedHours: 0,
  timeSpent: 0,
  progress: 0
})

// Watch for task changes to populate form
watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = {
      name: newTask.name,
      description: newTask.description || '',
      status: newTask.status,
      priority: newTask.priority,
      dueDate: newTask.dueDate ? newTask.dueDate.slice(0, 16) : '', // Format for datetime-local
      estimatedHours: newTask.estimatedHours || 0,
      timeSpent: newTask.timeSpent || 0,
      progress: newTask.progress
    }
  } else {
    // Reset form for new task
    form.value = {
      name: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      estimatedHours: 0,
      timeSpent: 0,
      progress: 0
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  console.log('TaskEditModal handleSubmit called')
  console.log('Form values:', form.value)
  
  const taskData: Partial<Task> = {
    name: form.value.name,
    description: form.value.description || undefined,
    status: form.value.status,
    priority: form.value.priority,
    dueDate: form.value.dueDate || undefined,
    estimatedHours: form.value.estimatedHours || undefined,
    timeSpent: form.value.timeSpent || undefined,
    progress: form.value.progress
  }

  console.log('Emitting save event with data:', taskData)
  emit('save', taskData)
  closeModal()
}
</script>
