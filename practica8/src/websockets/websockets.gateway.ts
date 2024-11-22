import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketsService } from './websockets.service';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './dto/transaction.interface';

@WebSocketGateway({ cors: true })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: Map<string, Socket[]> = new Map();

  constructor(private readonly websocketsService: WebsocketsService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (!userId) {
      client.disconnect();
      return;
    }

    // Validar máximo de 3 conexiones por usuario
    const connections = this.users.get(userId) || [];
    if (connections.length >= 3) {
      client.emit('error', 'Máximo de 3 conexiones alcanzado');
      client.disconnect();
      return;
    }

    connections.push(client);
    this.users.set(userId, connections);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const connections = this.users.get(userId) || [];
    this.users.set(userId, connections.filter(conn => conn.id !== client.id));
  }

  @SubscribeMessage('agregar-transaccion')
  async agregarTransaccion(@MessageBody() transactionDto: TransactionDto): Promise<Transaction> {
    const newTransaction = await this.websocketsService.createTransaction(transactionDto);
    this.server.emit('nueva-transaccion', newTransaction);
    return newTransaction;
  }

  @SubscribeMessage('consultar-activos')
  async consultarActivos() {
    const activeTransactions = await this.websocketsService.getActiveTransactions();
    return activeTransactions;
  }
}
