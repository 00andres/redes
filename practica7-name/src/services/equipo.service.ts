import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from 'src/entity/equipo.entity';
import { CreateEquipoDto } from '../dto/create-equipo.dto';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) {}

  // Obtener todos los equipos
  async findAll(): Promise<Equipo[]> {
    return this.equipoRepository.find();
  }

  // Obtener un equipo por su ID
  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({ where: { id } });
    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    }
    return equipo;
  }

  // Crear un nuevo equipo
  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const newEquipo = this.equipoRepository.create(createEquipoDto);
    return this.equipoRepository.save(newEquipo);
  }

  // Actualizar un equipo existente
  async update(id: number, updateEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id);
    const updatedEquipo = Object.assign(equipo, updateEquipoDto);
    return this.equipoRepository.save(updatedEquipo);
  }

  // Eliminar un equipo por su ID
  async delete(id: number): Promise<boolean> {
    const result = await this.equipoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    }
    return true;
  }
}
