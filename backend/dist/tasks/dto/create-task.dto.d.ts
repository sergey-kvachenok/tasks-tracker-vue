import { TaskStatus, TaskPriority } from '../entities/task.entity';
export declare class CreateTaskDto {
    name: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
    estimatedHours?: string;
    timeSpent?: string;
    progress?: number;
}
