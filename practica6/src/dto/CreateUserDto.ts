import { IsString, IsInt, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  nombre!: string;

  @IsInt()
  @Min(0)
  edad!: number;
}
