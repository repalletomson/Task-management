// src/tasks/tasks.gateway.ts
import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './schemas/task.schema';

@WebSocketGateway({
  cors: {
    origin: '*', // Configure this for your frontend URL
    methods: ['GET', 'POST']
  }
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private tasksService: TasksService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateStatus')
  async handleStatusUpdate(
    client: Socket, 
    payload: { taskId: string; status: TaskStatus }
  ): Promise<void> {
    try {
      const updatedTask = await this.tasksService.update(
        payload.taskId, 
        {status:payload.status}
      );
      
      // Broadcast the updated task to all connected clients
      this.server.emit('taskUpdated', updatedTask);
    } catch (error) {
      client.emit('error', { message: 'Failed to update task status' });
    }
  }
}