<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { PageLayout } from '@/components/ui'

interface Task {
  id: number
  title: string
  completed: boolean
  userId: number
}

const route = useRoute()
const task = ref<Task | null>(null)


// Function to fetch task data
const fetchTask = async (taskId: string): Promise<void> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
    const data = await response.json()
    task.value = data
  } catch (error) {
    console.error('Error fetching task:', error)
    task.value = null
  }
}

// Initial fetch when component mounts
onMounted(async (): Promise<void> => {
  const taskId = route.params.id as string
  await fetchTask(taskId)
})

</script>

<template>
  <PageLayout title="Task Details">
    <div v-if="task" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ task.title }}</h2>
      <div class="space-y-3">
        <p class="text-gray-600">
          <span class="font-medium">Status: </span> 
          <span :class="task.completed ? 'text-green-600' : 'text-yellow-600'">
            {{ task.completed ? 'Completed' : 'Pending' }}
          </span>
        </p>
        <p class="text-gray-600">
          <span class="font-medium">Task ID:</span> {{ task.id }}
        </p>
        <p class="text-gray-600">
          <span class="font-medium">User ID:</span> {{ task.userId }}
        </p>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Loading task details...</p>
    </div>
  </PageLayout>
</template>