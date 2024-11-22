import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { WebsocketsService } from './websockets.service';
import { TransactionController } from './transaction.controller'; // Importa el controlador HTTP

@Module({
  providers: [WebsocketsGateway, WebsocketsService], // Proveedores para WebSocket
  controllers: [TransactionController], // Controlador para manejar las solicitudes HTTP
})
export class WebsocketsModule {}
