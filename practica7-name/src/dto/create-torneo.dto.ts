import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsDate } from 'class-validator';

@InputType() 
export class CreateTorneoDto {
  @IsString()
  @Field()
  name: string;

  @IsDate()
  @Field()
  fechaInicio: Date;

  @IsDate()
  @Field()
  fechaFin: Date;
}
