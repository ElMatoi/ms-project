import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:19006',
      'http://192.168.100.7:8081',
      'exp://192.168.100.7:8081',
      'http://192.168.100.7',
    ],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  
  app.setGlobalPrefix('apiMsProject/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Agrega un mensaje de registro
  console.log('Servidor NestJS en ejecución en el puerto 3001');
  
  await app.listen(3001);
}

bootstrap();
