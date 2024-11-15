import { AppDataSource } from "../data-source"; 
import { Torneo } from "../entity/Torneo";
import { CreateTorneoDto } from "../dto/CreateTorneoDto";

export class TorneoService {
  // Usa AppDataSource para obtener el repositorio
  private torneoRepository = AppDataSource.getRepository(Torneo);

  async findAll() {
    return await this.torneoRepository.find();
  }

  // Cambiar el parámetro a `CreateTorneoDto`
  async create(createTorneoDto: CreateTorneoDto) {
    // Creamos una nueva instancia de Torneo
    const torneo = new Torneo();
    torneo.descripcion = createTorneoDto.descripcion;

    // Guardamos el torneo en la base de datos
    return await this.torneoRepository.save(torneo);
  }

  async update(id: number, data: Partial<Torneo>) {
    // Actualizar el torneo
    await this.torneoRepository.update(id, data);
    // Obtener el torneo actualizado
    return await this.torneoRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    // Eliminar el torneo con el id dado
    await this.torneoRepository.delete(id);
    return { deleted: true };
  }
}
