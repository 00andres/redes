import { Injectable } from '@nestjs/common';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';

const torneos = [
  {
    id: 1,
    nombre: 'Torneo Inicial',
    equipoId: 101,
    partidoId: 201,
  },
  {
    id: 2,
    nombre: 'Torneo Avanzado',
    equipoId: 102,
    partidoId: 202,
  },
];

@Injectable()
export class TorneoService {
  create(createTorneoDto: CreateTorneoDto) {
    const nuevoTorneo = {
      id: Date.now(), 
      ...createTorneoDto,
    };
    torneos.push(nuevoTorneo);
    return nuevoTorneo;
  }

  findAll() {
    return torneos;
  }

  findOne(id: number) {
    const torneo = torneos.find((torneo) => torneo.id === id);
    if (!torneo) {
      return `No se encontró el torneo con ID #${id}`;
    }
    return torneo;
  }

  update(id: number, updateTorneoDto: UpdateTorneoDto) {
    const torneoIndex = torneos.findIndex((torneo) => torneo.id === id);
    if (torneoIndex === -1) {
      return `No se encontró el torneo con ID #${id}`;
    }
    torneos[torneoIndex] = {
      ...torneos[torneoIndex],
      ...updateTorneoDto,
    };
    return torneos[torneoIndex];
  }

  remove(id: number) {
    const torneoIndex = torneos.findIndex((torneo) => torneo.id === id);
    if (torneoIndex === -1) {
      return `No se encontró el torneo con ID #${id}`;
    }
    const eliminado = torneos.splice(torneoIndex, 1);
    return { deleted: true, torneo: eliminado[0] };
  }
}
