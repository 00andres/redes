import { IsOptional, IsString, IsInt, Min } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  edad?: number;
}
