import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto): Promise<import("./schemas/task.schema").Task>;
    getTasks(filter: FilterTaskDto): Promise<{
        tasks: import("./schemas/task.schema").Task[];
        total: number;
    }>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<import("./schemas/task.schema").Task>;
    deleteTask(id: string): Promise<import("./schemas/task.schema").Task>;
}
