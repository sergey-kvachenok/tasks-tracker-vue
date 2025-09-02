export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Task {
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    estimatedHours: number;
    timeSpent: number;
    startedAt: Date;
    completedAt: Date | null;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
}
