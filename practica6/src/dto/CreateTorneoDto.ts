import { IsString } from "class-validator";

export class CreateTorneoDto {
  @IsString()
  descripcion!: string;
}
