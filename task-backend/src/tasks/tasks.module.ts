// tasks.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksController } from './tasts.controller';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers:[TasksController],
  providers: [TasksService,TasksGateway],
  exports: [TasksService],
})
export class TasksModule {}
