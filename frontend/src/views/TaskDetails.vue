<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PageLayout, StatusBadge, PriorityBadge, ProgressBar, Button, ErrorState } from '@/components/ui'
import { API_URLS } from '@/config/api'
import { formatDate } from '@/utils/formatters'
import type { Task } from '@/types/task'

const route = useRoute()
const router = useRouter()
const task = ref<Task | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Function to fetch task data
const fetchTask = async (taskId: string): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    
    const url = API_URLS.TASKS.GET(parseInt(taskId))
    console.log('Fetching task from:', url)
    
    const response = await fetch(url)
    console.log('Response status:', response.status)
    
    if (!response.ok) {
      if (response.status === 404) {
        error.value = 'Task not found'
      } else {
        const errorText = await response.text()
        console.error('API Error:', response.status, errorText)
        error.value = `Failed to fetch task details (${response.status})`
      }
      return
    }
    
    const data = await response.json()
    console.log('Task data received:', data)
    task.value = data
  } catch (err) {
    console.error('Error fetching task:', err)
    error.value = 'Failed to fetch task details'
  } finally {
    loading.value = false
  }
}

// Initial fetch when component mounts
onMounted(async (): Promise<void> => {
  const taskId = route.params.id as string
  
  // Validate taskId
  if (!taskId || isNaN(parseInt(taskId))) {
    error.value = 'Invalid task ID'
    loading.value = false
    return
  }
  
  await fetchTask(taskId)
})

const goBack = (): void => {
  router.push('/tasks')
}

const editTask = (): void => {
  router.push(`/tasks/edit/${task.value?.id}`)
}
</script>

<template>
  <PageLayout title="Task Details">
    <template #header-actions>
      <div class="flex space-x-3">
        <Button variant="secondary" @click="goBack">
          ← Back to Tasks
        </Button>
        <Button variant="primary" @click="editTask">
          Edit Task
        </Button>
      </div>
    </template>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" text="Loading task details..." />

    <!-- Not Found State -->
    <ErrorState
      v-else-if="error === 'Task not found' || error === 'Invalid task ID'"
      variant="warning"
      :title="error === 'Invalid task ID' ? 'Invalid Task ID' : 'Task Not Found'"
      :message="error === 'Invalid task ID' 
        ? 'The task ID in the URL is not valid.' 
        : 'The task you\'re looking for doesn\'t exist or has been removed.'"
    >
      <template #action>
        <Button variant="secondary" @click="goBack">Go Back to Tasks</Button>
      </template>
    </ErrorState>

    <!-- Error State -->
    <ErrorState
      v-else-if="error"
      variant="error"
      title="Error Loading Task"
      :message="error"
    >
      <template #action>
        <Button variant="secondary" @click="goBack">Go Back to Tasks</Button>
      </template>
    </ErrorState>

    <!-- Task Details -->
    <div v-else-if="task" class="space-y-6">
      <!-- Task Header -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ task.name }}</h2>
        <p v-if="task.description" class="text-gray-600 mb-4">{{ task.description }}</p>
        
        <!-- Status and Priority -->
        <div class="flex items-center space-x-4 mb-4">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <StatusBadge :status="task.status" />
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">Priority:</span>
            <PriorityBadge :priority="task.priority" />
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
          <ProgressBar :value="task.progress" />
        </div>
      </div>

      <!-- Task Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-4">
          <!-- Due Date -->
          <div v-if="task.dueDate" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Due Date</h3>
            <p class="text-gray-900">{{ formatDate(task.dueDate) }}</p>
          </div>

          <!-- Time Tracking -->
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Time Tracking</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Estimated:</span>
                <span class="text-gray-900">{{ task.estimatedHours || 0 }}h</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time Spent:</span>
                <span class="text-gray-900">{{ task.timeSpent || 0 }}h</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <!-- Creation Info -->
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Created</h3>
            <p class="text-gray-900">{{ formatDate(task.createdAt) }}</p>
          </div>

          <!-- Last Updated -->
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Last Updated</h3>
            <p class="text-gray-900">{{ formatDate(task.updatedAt) }}</p>
          </div>

          <!-- Time Tracking Info -->
          <div v-if="task.startedAt || task.completedAt" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Activity Timeline</h3>
            <div class="space-y-2">
              <div v-if="task.startedAt" class="flex justify-between">
                <span class="text-gray-600">Started:</span>
                <span class="text-gray-900">{{ formatDate(task.startedAt) }}</span>
              </div>
              <div v-if="task.completedAt" class="flex justify-between">
                <span class="text-gray-600">Completed:</span>
                <span class="text-gray-900">{{ formatDate(task.completedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>