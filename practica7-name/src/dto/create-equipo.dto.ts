import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType() // Decorador para indicar que es un tipo de entrada
export class CreateEquipoDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  descripcion: string;
}
