import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './torneo/config/envs';

async function bootstrap() {
  const logger = new Logger('Gateway');

  // Crear aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Establecer prefijo global para las rutas HTTP
  app.setGlobalPrefix('api');

  // Configurar microservicio con NATS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
      maxReconnectAttempts: -1,
    },
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Iniciar servidor HTTP
  const port = envs.port || 3000;
  await app.listen(port);
  logger.log(`HTTP Server is running on port: ${port}`);

  // Iniciar microservicio NATS
  await app.startAllMicroservices();
  logger.log(`Microservice is running with NATS on: ${envs.natsServers.join(', ')}`);
}

bootstrap();
