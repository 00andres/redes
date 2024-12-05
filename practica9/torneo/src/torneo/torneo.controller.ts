import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { firstValueFrom } from 'rxjs';

@Controller('api/torneos') 
export class TorneoHttpController {
  constructor(private readonly torneoService: ClientProxy) {}

  @Post()
  async create(@Body() createTorneoDto: CreateTorneoDto) {
    return await firstValueFrom(this.torneoService.send('createTorneo', createTorneoDto));
  }

  @Get()
  async findAll() {
    return await firstValueFrom(this.torneoService.send('findAllTorneos', {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await firstValueFrom(this.torneoService.send('findOneTorneo', id));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTorneoDto: UpdateTorneoDto) {
    return await firstValueFrom(this.torneoService.send('updateTorneo', { id, ...updateTorneoDto }));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await firstValueFrom(this.torneoService.send('removeTorneo', id));
  }
}
