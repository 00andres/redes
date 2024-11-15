import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType() 
export class CreateEquipoDto {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  descripcion: string;
}
