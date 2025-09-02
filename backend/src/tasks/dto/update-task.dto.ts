import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // This will make all properties from CreateTaskDto optional
  // dueDate?: string;
  // name?: string;
  // description?: string;
  // status?: string;
  // priority?: string;
}
