import { IsOptional, IsString } from "class-validator";

export class UpdateEquipoDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  serie?: string;
}
