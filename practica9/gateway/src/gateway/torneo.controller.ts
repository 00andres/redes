import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { firstValueFrom } from 'rxjs';

@Controller('torneos')
export class TorneoController {
  constructor(private readonly torneoService: ClientProxy) {}

  @Post()
  create(@Body() createTorneoDto: CreateTorneoDto) {
    return firstValueFrom(this.torneoService.send('createTorneo', createTorneoDto));
  }

  @Get()
  findAll() {
    return firstValueFrom(this.torneoService.send('findAllTorneos', {}));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return firstValueFrom(this.torneoService.send('findOneTorneo', id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTorneoDto: UpdateTorneoDto) {
    return firstValueFrom(this.torneoService.send('updateTorneo', { id, ...updateTorneoDto }));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return firstValueFrom(this.torneoService.send('removeTorneo', id));
  }
}
