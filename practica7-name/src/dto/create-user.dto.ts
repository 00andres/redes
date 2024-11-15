import { IsString, IsInt, Min } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType() 
export class CreateUserDto {
  @IsString()
  @Field() 
  name: string;

  @IsInt()
  @Min(0)
  @Field(type => Int) 
  edad: number;
}
