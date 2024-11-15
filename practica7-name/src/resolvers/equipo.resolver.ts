import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EquipoService } from '../services/equipo.service';
import { CreateEquipoDto } from '../dto/create-equipo.dto';
import { Equipo } from 'src/entity/equipo.entity';

@Resolver(() => Equipo) 
export class EquipoResolver {
  constructor(private equipoService: EquipoService) {}

  @Query(() => [Equipo], { name: 'equipos' })
  async getEquipos() {
    return this.equipoService.findAll();
  }

  @Mutation(() => Equipo)
  async createEquipo(@Args('input') input: CreateEquipoDto) {
    return this.equipoService.create(input);
  }
}
