import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksService } from './tasks.service';
import { TaskStatus } from './schemas/task.schema';
export declare class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private tasksService;
    server: Server;
    constructor(tasksService: TasksService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleStatusUpdate(client: Socket, payload: {
        taskId: string;
        status: TaskStatus;
    }): Promise<void>;
}
