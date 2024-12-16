import { Document } from 'mongoose';
export declare enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
export declare enum Status {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed"
}
export declare class Task extends Document {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
