<script setup lang="ts">
import { ref, onBeforeMount, watch, nextTick, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import TaskEditModal from '@/components/TaskEditModal.vue'
import TaskCard from '@/components/TaskCard.vue'
import { Button, LoadingSpinner, EmptyState, PageLayout, ErrorState, StatCard } from '@/components/ui'
import { API_URLS } from '@/config/api'
import type { Task } from '@/types/task'

const router = useRouter()
const tasks = ref<Task[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const showConfirmDialog = ref(false)
const pendingNavigation = ref<string | null>(null)
const allowNavigation = ref<boolean>(false)
const showEditModal = ref(false)
const editingTask = ref<Task | null>(null)
const showAddModal = ref(false)



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

const editTask = (task: Task): void => {
  editingTask.value = task
  showEditModal.value = true
}

const updateTask = async (taskData: Partial<Task>): Promise<void> => {
  console.log('updateTask function called with data:', taskData)
  console.log('editingTask.value:', editingTask.value)
  
  if (!editingTask.value) {
    console.error('No editing task found')
    return
  }
  
  try {
    const response = await fetch(API_URLS.TASKS.UPDATE(editingTask.value.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    })
    
    if (response.ok) {
      const updatedTask = await response.json()
      
      const index = tasks.value.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        const currentTask = tasks.value[index]
        console.log('Before update - Task progress:', currentTask?.progress)
        console.log('Updated task data:', updatedTask)
        
        // Create a completely new array with the updated task
        const newTasks = tasks.value.map((task, i) => 
          i === index ? { ...updatedTask } : { ...task }
        )
        
        console.log('New tasks array before assignment:', newTasks.map(t => ({ id: t.id, progress: t.progress })))
        
        // Replace the entire array to ensure Vue reactivity
        tasks.value = newTasks
        
        console.log('After update - Task progress:', tasks.value[index]?.progress)
        console.log('Tasks array after assignment:', tasks.value.map(t => ({ id: t.id, progress: t.progress })))
        
        // Close the modal after successful update
        showEditModal.value = false
        editingTask.value = null
      } else {
        console.error('Task not found in local state for update')
      }
    } else {
      const errorText = await response.text()
      console.error('Failed to update task:', response.status, errorText)
    }
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const addNewTask = async (taskData: Partial<Task>): Promise<void> => {
  try {
    const response = await fetch(API_URLS.TASKS.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    })
    
    if (response.ok) {
      const newTask = await response.json()
      tasks.value.push(newTask)
      showAddModal.value = false
    } else {
      console.error('Failed to create task')
    }
  } catch (error) {
    console.error('Error creating task:', error)
  }
}

const navigateToTaskDetails = (taskId: number): void => {
  router.push(`/tasks/${taskId}`)
}

// Check if there are unsaved changes
const hasUnsavedChanges = (): boolean => {
  return false // No more simple input field, all changes go through modals
}

// Route guard for unsaved changes
onBeforeRouteLeave((to, from, next) => {
  // For now, always allow navigation
  // You can add logic here to check for unsaved changes
  next()
})

const confirmNavigation = (): void => {
  allowNavigation.value = true
  if (pendingNavigation.value) {
    router.push(pendingNavigation.value)
  }
}

const cancelNavigation = (): void => {
  showConfirmDialog.value = false
  pendingNavigation.value = null
}

const retryFetchTasks = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(API_URLS.TASKS.LIST)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks (${response.status})`)
    }
    
    const data = await response.json()
    tasks.value = data
  } catch (err) {
    console.error('Error fetching tasks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
  } finally {
    loading.value = false
  }
}

// Task statistics configuration
const taskStats = computed(() => [
  {
    value: tasks.value.filter(t => t.status === 'pending').length,
    label: 'Pending',
    color: 'blue' as const
  },
  {
    value: tasks.value.filter(t => t.status === 'in_progress').length,
    label: 'In Progress',
    color: 'yellow' as const
  },
  {
    value: tasks.value.filter(t => t.status === 'completed').length,
    label: 'Completed',
    color: 'green' as const
  },
  {
    value: tasks.value.length,
    label: 'Total Tasks',
    color: 'gray' as const
  }
])

onBeforeMount(async (): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(API_URLS.TASKS.LIST)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks (${response.status})`)
    }
    
    const data = await response.json()
    tasks.value = data
  } catch (err) {
    console.error('Error fetching tasks:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
  } finally {
    loading.value = false
  }
})

// Watch for changes in tasks array for debugging
watch(tasks, (newTasks) => {
  console.log('Tasks array changed:', newTasks.map(t => ({ id: t.id, progress: t.progress })))
  console.log('Full tasks array:', newTasks)
}, { deep: true })
</script>

<template>
  <PageLayout title="Task Management">
    <template #header-actions>
      <Button
        variant="primary"
        size="lg"
        @click="showAddModal = true"
        class="flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add New Task</span>
      </Button>
    </template>

    <!-- Task Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        v-for="stat in taskStats"
        :key="stat.label"
        :value="stat.value"
        :label="stat.label"
        :color="stat.color"
      />
    </div>

    <LoadingSpinner v-if="loading" text="Loading tasks..." />

    <!-- Error State -->
    <ErrorState
      v-else-if="error"
      variant="error"
      title="Failed to Load Tasks"
      :message="error"
    >
      <template #action>
        <Button variant="primary" @click="retryFetchTasks">Try Again</Button>
      </template>
    </ErrorState>

    <div v-else>
      <div v-if="tasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TaskCard
          v-for="task in tasks"
          :key="`${task.id}-${task.progress}-${task.updatedAt}`"
          :task="task"
          @edit="editTask"
          @delete="deleteTask"
          @view="navigateToTaskDetails"
        />
      </div>
      
      <EmptyState
        v-else
        title="No tasks"
        description="Get started by creating a new task."
      >
        <template #action>
          <Button
            variant="primary"
            @click="showAddModal = true"
            class="inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </Button>
        </template>
      </EmptyState>
    </div>

    <!-- Task Edit Modal -->
    <TaskEditModal
      :is-open="showEditModal"
      :task="editingTask"
      @close="showEditModal = false"
      @save="updateTask"
    />

    <!-- Task Add Modal -->
    <TaskEditModal
      :is-open="showAddModal"
      :task="null"
      @close="showAddModal = false"
      @save="addNewTask"
    />

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
  </PageLayout>
</template>


