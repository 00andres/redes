import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosGateway } from './usuarios.gateway';

@Module({
  providers: [UsuariosService, UsuariosGateway],
})
export class UsuariosModule {}
