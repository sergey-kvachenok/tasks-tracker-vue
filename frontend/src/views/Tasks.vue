<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { API_URLS } from '@/config/api'

interface Task {
  id: number
  name: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

const router = useRouter()
const tasks = ref<Task[]>([])
const newTask = ref<string>('')
const loading = ref<boolean>(true)
const showConfirmDialog = ref(false)
const pendingNavigation = ref<string | null>(null)
const allowNavigation = ref<boolean>(false)

const addTask = async (): Promise<void> => {
  if (newTask.value.trim()) {
    try {
      const response = await fetch(API_URLS.TASKS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTask.value.trim(),
          status: 'pending',
          priority: 'medium'
        })
      })
      
      if (response.ok) {
        const newTaskData = await response.json()
        tasks.value.unshift(newTaskData) // Add to beginning of list
        newTask.value = ''
      } else {
        console.error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }
}

const deleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(API_URLS.TASKS.DELETE(id), {
      method: 'DELETE'
    })
    
    if (response.ok) {
      tasks.value = tasks.value.filter(task => task.id !== id)
    } else {
      console.error('Failed to delete task')
    }
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const navigateToTaskDetails = (id: number): void => {
  router.push(`/tasks/${id}`)
}

// Check if there are unsaved changes
const hasUnsavedChanges = (): boolean => {
  return newTask.value.trim() !== ''
}

onBeforeRouteLeave((to, from) => {
  // If we've already confirmed navigation, allow it
  if (allowNavigation.value) {
    return true
  }
  
  // Only show confirmation if there are unsaved changes
  if (hasUnsavedChanges()) {
    showConfirmDialog.value = true
    pendingNavigation.value = to.path
    
    // Return false to prevent immediate navigation
    return false
  }
  
  // No changes, allow navigation
  return true
})

const confirmNavigation = (): void => {
  showConfirmDialog.value = false
  allowNavigation.value = true
  
  if (pendingNavigation.value) {
    // Clear the input to allow navigation
    newTask.value = ''
    // Navigate to the pending route
    router.push(pendingNavigation.value)
  }
  pendingNavigation.value = null
}

const cancelNavigation = (): void => {
  showConfirmDialog.value = false
  pendingNavigation.value = null
  allowNavigation.value = false
}

onBeforeMount(async (): Promise<void> => {
  try {
    const response = await fetch(API_URLS.TASKS.LIST)
    const data = await response.json()
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <h1>Task Management</h1>
    
    <form @submit.prevent="addTask" class="mb-6">
      <label for="newTask" class="block text-sm font-medium text-gray-700 mb-2">Add New Task</label>
      <div class="flex gap-2">
        <input 
          type="text" 
          id="newTask" 
          name="newTask" 
          v-model="newTask"
          placeholder="Enter task description..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Add Task
        </button>
      </div>
    </form>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading tasks...</p>
    </div>

    <div v-else>
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
      
      <ul v-if="tasks.length > 0" class="space-y-3">
        <li v-for="task in tasks" @click="navigateToTaskDetails(task.id)" :key="task.id" class="flex gap-2 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <span class="text-gray-800">{{ task.name }}</span>
          <button 
            @click.stop="deleteTask(task.id)"
            class="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
            title="Delete task"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </li>
      </ul>
      
      <div v-else class="text-center py-8 text-gray-500">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    </div>

    <!-- Custom Confirmation Dialog -->
    <ConfirmationDialog
      :show="showConfirmDialog"
      title="Unsaved Changes"
      message="You have an unsaved task in the input field. Are you sure you want to leave this page?"
      confirm-text="Leave Page"
      cancel-text="Stay Here"
      type="warning"
      @confirm="confirmNavigation"
      @cancel="cancelNavigation"
    />
  </div>
</template>


