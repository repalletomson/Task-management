import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(filters: FilterTaskDto, page: number, limit: number): Promise<{
        tasks: Task[];
        total: number;
    }>;
    findOne(id: string): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<Task>;
}
