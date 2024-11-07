import { IsString } from "class-validator";

export class CreateEquipoDto {
  @IsString()
  descripcion!: string;

  @IsString()
  serie!: string;
}
