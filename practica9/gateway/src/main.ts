import { NestFactory } from '@nestjs/core';
import { AppModule } from './gateway/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './gateway/common';
import { envs } from './gateway/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Gateway');

  // Crear la aplicación
  const app = await NestFactory.create(AppModule);

  // Configuración de NATS
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_SERVERS || 'nats://nats-server:4222', 
    },
  });

 
  app.setGlobalPrefix('api');

  // Configurar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configurar filtro global para excepciones RPC
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // Iniciar el microservicio y la aplicación
  await app.startAllMicroservices();
  const port = envs.port || 3000;
  await app.listen(port);

  logger.log(`Gateway running on port ${port}`);
}

bootstrap();
