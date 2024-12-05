import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateTorneoDto {
  @IsString()
  public nombre: string;

  @IsNumber()
  @IsPositive()
  public equipoId: number;

  @IsNumber()
  @IsPositive()
  public partidoId: number;
}
