import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Torneo } from 'src/entity/torneo.entity'; // Asegúrate de que la ruta sea correcta
import { CreateTorneoDto } from '../dto/create-torneo.dto'; // El DTO para la creación de Torneos

@Injectable()
export class TorneoService {
  constructor(
    @InjectRepository(Torneo)
    private readonly torneoRepository: Repository<Torneo>, // Inyección del repositorio de Torneo
  ) {}

  // Obtener todos los torneos
  async findAll(): Promise<Torneo[]> {
    return this.torneoRepository.find();  // Obtiene todos los torneos
  }

  // Obtener un torneo por su ID
  async findOne(id: number): Promise<Torneo> {
    const torneo = await this.torneoRepository.findOne({ where: { id } });
    if (!torneo) {
      throw new NotFoundException(`Torneo con ID ${id} no encontrado`); // Lanza una excepción si no se encuentra
    }
    return torneo; // Retorna el torneo encontrado
  }

  // Crear un nuevo torneo
  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const newTorneo = this.torneoRepository.create(createTorneoDto); // Crea la instancia de Torneo
    return this.torneoRepository.save(newTorneo); // Guarda el nuevo torneo
  }

  // Actualizar un torneo existente
  async update(id: number, updateTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const torneo = await this.findOne(id); // Busca el torneo para actualizar
    const updatedTorneo = Object.assign(torneo, updateTorneoDto); // Asigna los nuevos valores al torneo
    return this.torneoRepository.save(updatedTorneo); // Guarda el torneo actualizado
  }

  // Eliminar un torneo por su ID
  async delete(id: number): Promise<boolean> {
    const result = await this.torneoRepository.delete(id); // Elimina el torneo por ID
    if (result.affected === 0) {
      throw new NotFoundException(`Torneo con ID ${id} no encontrado`); // Lanza excepción si no se encuentra el torneo
    }
    return true; // Retorna true si el torneo se eliminó correctamente
  }
}
