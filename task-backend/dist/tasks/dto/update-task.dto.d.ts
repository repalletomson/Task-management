import { TaskStatus, TaskPriority } from '../schemas/task.schema';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: Date;
    assignedTo?: string[];
}
