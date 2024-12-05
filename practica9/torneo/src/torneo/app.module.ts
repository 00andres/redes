import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TorneoHttpController } from './torneo.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'TORNEO_SERVICE', transport: Transport.NATS, options: { servers: ['nats://localhost:4222'] } },
    ]),
  ],
  controllers: [TorneoHttpController], // Agrega el controlador HTTP
})
export class AppModule {}
