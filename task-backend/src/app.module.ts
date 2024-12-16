import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
// import { ValidationModule } from '@nestjs/validation';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/CompleteTask'),
    AuthModule,
    UsersModule,
    TasksModule,
  //  ValidationModule,

  ],
})
export class AppModule {}
