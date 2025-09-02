export interface Task {
  id: number
  name: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  estimatedHours?: number
  timeSpent?: number
  startedAt?: string
  completedAt?: string
  progress: number
  createdAt: string
  updatedAt: string
}

export type TaskStatus = Task['status']
export type TaskPriority = Task['priority']

export interface CreateTaskDto {
  name: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  estimatedHours?: number
  timeSpent?: number
  progress: number
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
