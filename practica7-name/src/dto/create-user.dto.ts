import { IsString, IsInt, Min } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType() // Marca esta clase como un tipo de entrada en GraphQL
export class CreateUserDto {
  @IsString()
  @Field() // Exponer el campo 'name' a GraphQL
  name: string;

  @IsInt()
  @Min(0)
  @Field(type => Int) // Exponer el campo 'edad' a GraphQL con tipo Int
  edad: number;
}
