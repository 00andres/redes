import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { Equipo } from 'src/entity/equipo.entity';
export declare class EquipoResolver {
    private equipoService;
    constructor(equipoService: EquipoService);
    getEquipos(): Promise<Equipo[]>;
    createEquipo(input: CreateEquipoDto): Promise<Equipo>;
}
