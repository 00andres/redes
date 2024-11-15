import { Repository } from 'typeorm';
import { Torneo } from 'src/entity/torneo.entity';
import { CreateTorneoDto } from '../dto/create-torneo.dto';
export declare class TorneoService {
    private readonly torneoRepository;
    constructor(torneoRepository: Repository<Torneo>);
    findAll(): Promise<Torneo[]>;
    findOne(id: number): Promise<Torneo>;
    create(createTorneoDto: CreateTorneoDto): Promise<Torneo>;
    update(id: number, updateTorneoDto: CreateTorneoDto): Promise<Torneo>;
    delete(id: number): Promise<boolean>;
}
