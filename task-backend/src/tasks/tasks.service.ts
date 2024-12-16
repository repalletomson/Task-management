// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(filters: FilterTaskDto, page: number, limit: number): Promise<{ tasks: Task[]; total: number }> {
    const query: any = {};


    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.dueDate) query.dueDate = { $gte: new Date(filters.dueDate) };

    const tasks = await this.taskModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ dueDate: 1 })
      .exec();

    const total = await this.taskModel.countDocuments(query).exec();

    return { tasks, total };
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById({_id:id}).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
