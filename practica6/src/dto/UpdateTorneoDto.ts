import { IsOptional, IsString } from "class-validator";

export class UpdateTorneoDto {
  @IsOptional()
  @IsString()
  descripcion?: string;
}
