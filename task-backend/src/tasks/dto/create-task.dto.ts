import { IsString, IsEnum } from 'class-validator';
import { Priority, Status } from '../models/task.model';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: String;

  @IsString()
  priority: String;
  @IsString()
  dueDate:string
}