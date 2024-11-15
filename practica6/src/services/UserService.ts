import { AppDataSource } from "../data-source"; 
import { User } from "../entity/User";
import { CreateUserDto } from "../dto/CreateUserDto";

export class UserService {
  // Usa AppDataSource para obtener el repositorio
  private userRepository = AppDataSource.getRepository(User);

  async findAll() {
    return await this.userRepository.find();
  }

  // Cambiar el tipo de parámetro a CreateUserDto
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.nombre = createUserDto.nombre; 
    user.edad = createUserDto.edad;

    // Guardamos el nuevo usuario en la base de datos
    return await this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>) {
    // Actualizar el usuario
    await this.userRepository.update(id, data);
    // Obtener el usuario actualizado utilizando un objeto con 'where'
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    // Eliminar el usuario con el id dado
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
