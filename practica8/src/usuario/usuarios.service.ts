import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { Transaccion } from './entities/transaccion.entity';

const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 30,
    fechaNacimiento: '1991-01-01',
    direccion: 'Calle 1',
    telefono: '12345678',
    email: 'juan@example.com'
  },
  {
    id: 2,
    nombre: 'Maria',
    apellido: 'Lopez',
    edad: 25,
    fechaNacimiento: '1996-01-01',
    direccion: 'Calle 2',
    telefono: '87654321',
    email: 'maria@example.com'
  }
];

const transacciones: Transaccion[] = [];

const conexiones: Map<number, number> = new Map();  // Mapa para controlar las conexiones por usuario

@Injectable()
export class UsuariosService {
  create(usuario: Usuario) {
    usuarios.push(usuario);
    return usuario;
  }

  findAll() {
    return usuarios;
  }

  findOne(id: number) {
    return usuarios.find(usuario => usuario.id === id);
  }

  addConnection(usuarioId: number) {
    const currentConnections = conexiones.get(usuarioId) || 0;
    if (currentConnections >= 3) {
      throw new Error('El usuario ha alcanzado el máximo de 3 conexiones');
    }
    conexiones.set(usuarioId, currentConnections + 1);
  }

  removeConnection(usuarioId: number) {
    const currentConnections = conexiones.get(usuarioId) || 0;
    if (currentConnections > 0) {
      conexiones.set(usuarioId, currentConnections - 1);
    }
  }

  addTransaccion(transaccion: Transaccion) {
    transacciones.push(transaccion);
    return transaccion;
  }

  findTransaccionesActivas() {
    return transacciones.filter(trans => !trans.fechaFin); // Solo las transacciones activas
  }
}
