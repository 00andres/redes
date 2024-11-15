import { TorneoService } from '../services/torneo.service';
import { CreateTorneoDto } from '../dto/create-torneo.dto';
import { Torneo } from 'src/entity/torneo.entity';
export declare class TorneoResolver {
    private torneoService;
    constructor(torneoService: TorneoService);
    getTorneos(): Promise<Torneo[]>;
    createTorneo(input: CreateTorneoDto): Promise<Torneo>;
}
