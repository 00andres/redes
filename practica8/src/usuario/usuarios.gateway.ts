import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { UsuariosService } from './usuarios.service';
import { Transaccion } from './entities/transaccion.entity';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class UsuariosGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly usuariosService: UsuariosService) {}

  handleConnection(client: any) {
    const usuarioId = client.handshake.headers['usuario-id'];

    // Temporalmente permitir la conexión para depurar
    if (!usuarioId) {
      console.warn('Usuario ID no proporcionado, permitiendo la conexión temporalmente.');
      return; // Permitir conexión sin desconectar
    }

    try {
      this.usuariosService.addConnection(usuarioId); 
      console.log(`Usuario con ID ${usuarioId} conectado.`);
    } catch (error) {
      console.log(error.message);
      client.emit('error', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    const usuarioId = client.handshake.headers['usuario-id'];
    if (usuarioId) {
      this.usuariosService.removeConnection(usuarioId); 
      console.log(`Usuario con ID ${usuarioId} desconectado.`);
    }
  }

  @SubscribeMessage('agregar-transaccion')
  agregarTransaccion(@MessageBody() transaccion: Transaccion) {
    const transaccionAgregada = this.usuariosService.addTransaccion(transaccion);
    this.wss.emit('transaccion-actualizada', transaccionAgregada); 
    return transaccionAgregada;
  }

  @SubscribeMessage('consultar-activos')
  consultarTransaccionesActivas() {
    return this.usuariosService.findTransaccionesActivas();
  }
}
