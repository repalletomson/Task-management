// src/tasks/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop()
    priority: string;

    @Prop()
    dueDate: Date;

    @Prop()
    assignedTo: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
