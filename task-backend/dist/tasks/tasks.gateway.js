"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const tasks_service_1 = require("./tasks.service");
let TasksGateway = class TasksGateway {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleStatusUpdate(client, payload) {
        try {
            const updatedTask = await this.tasksService.update(payload.taskId, { status: payload.status });
            this.server.emit('taskUpdated', updatedTask);
        }
        catch (error) {
            client.emit('error', { message: 'Failed to update task status' });
        }
    }
};
exports.TasksGateway = TasksGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TasksGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TasksGateway.prototype, "handleStatusUpdate", null);
exports.TasksGateway = TasksGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    }),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksGateway);
//# sourceMappingURL=tasks.gateway.js.map