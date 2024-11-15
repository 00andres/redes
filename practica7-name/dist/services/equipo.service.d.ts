import { Repository } from 'typeorm';
import { Equipo } from 'src/entity/equipo.entity';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
export declare class EquipoService {
    private readonly equipoRepository;
    constructor(equipoRepository: Repository<Equipo>);
    findAll(): Promise<Equipo[]>;
    findOne(id: number): Promise<Equipo>;
    create(createEquipoDto: CreateEquipoDto): Promise<Equipo>;
    update(id: number, updateEquipoDto: CreateEquipoDto): Promise<Equipo>;
    delete(id: number): Promise<boolean>;
}
