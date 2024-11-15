import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TorneoService } from '../services/torneo.service';
import { CreateTorneoDto } from '../dto/create-torneo.dto';
import { Torneo } from 'src/entity/torneo.entity';

@Resolver(() => Torneo) // Asegúrate de que el resolver está configurado para el tipo Torneo
export class TorneoResolver {
  constructor(private torneoService: TorneoService) {}

  @Query(() => [Torneo], { name: 'torneos' })
  async getTorneos() {
    return this.torneoService.findAll();
  }

  @Mutation(() => Torneo)
  async createTorneo(@Args('input') input: CreateTorneoDto) {
    return this.torneoService.create(input);
  }
}
