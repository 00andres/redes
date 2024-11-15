import { AppDataSource } from "../data-source";
import { Equipo } from "../entity/Equipo";
import { CreateEquipoDto } from "../dto/CreateEquipoDto";

export class EquipoService {
  
  private equipoRepository = AppDataSource.getRepository(Equipo);

  async findAll() {
    return await this.equipoRepository.find();
  }

 
  async create(createEquipoDto: CreateEquipoDto) {
    // Creamos una nueva instancia de Equipo
    const equipo = new Equipo();
    equipo.descripcion = createEquipoDto.descripcion;
    equipo.serie = createEquipoDto.serie;

    // Luego guardamos el objeto en la base de datos
    return await this.equipoRepository.save(equipo);
  }

  async update(id: number, data: Partial<Equipo>) {
    // Actualizar el equipo
    await this.equipoRepository.update(id, data);
    // Obtener el equipo actualizado
    return await this.equipoRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    // Eliminar el equipo con el id dado
    await this.equipoRepository.delete(id);
    return { deleted: true };
  }
}
