import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Servidor de WebSockets en NestJS funcionando correctamente';
  }
}
