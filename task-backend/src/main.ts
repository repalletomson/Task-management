// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin:'http://localhost:5173',
//     methods:'GET,POST,PATCH,DELETE,PUT',
//     allowedHeaders:'Content-Type,Authorization'
//   })
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific methods
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Include cookies if needed
      allowedHeaders:'Content-Type,Authorization'
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform payload to DTO instances
      whitelist: true, // Strip out non-whitelisted properties
      forbidNonWhitelisted: true, // Throw error if extra properties are present
    })
   ); await app.listen(3000);
}
bootstrap();
