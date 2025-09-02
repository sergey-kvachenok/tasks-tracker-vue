import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    
    // Store original status to detect changes
    const originalStatus = task.status;
    
    // Update basic fields
    if (updateTaskDto.name !== undefined) task.name = updateTaskDto.name;
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description;
    if (updateTaskDto.status !== undefined) task.status = updateTaskDto.status;
    if (updateTaskDto.priority !== undefined) task.priority = updateTaskDto.priority;
    if (updateTaskDto.progress !== undefined) {
      task.progress = Math.max(0, Math.min(100, updateTaskDto.progress));
    }
    
    // Handle date fields
    if (updateTaskDto.dueDate !== undefined) {
      task.dueDate = new Date(updateTaskDto.dueDate);
    }
    if (updateTaskDto.estimatedHours !== undefined) {
      task.estimatedHours = updateTaskDto.estimatedHours;
    }
    if (updateTaskDto.timeSpent !== undefined) {
      task.timeSpent = updateTaskDto.timeSpent;
    }
    
    // Auto-manage startedAt and completedAt based on status changes
    if (updateTaskDto.status && updateTaskDto.status !== originalStatus) {
      if (updateTaskDto.status === 'in_progress' && !task.startedAt) {
        task.startedAt = new Date();
      }
      if (updateTaskDto.status === 'completed') {
        task.completedAt = new Date();
      } else {
        // Clear completedAt if status is not completed
        task.completedAt = null;
      }
    }
    
    return await this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.remove(task);
  }

  async findByStatus(status: string): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { status: status as any },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByPriority(priority: string): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { priority: priority as any },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
